import { ethers } from 'ethers';
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';
import { Contract } from '@ethersproject/contracts';
import abis from '../contracts';
import treeData from '../constants/treeData.json';
import { governanceContracts } from '../constants';

export async function testTokenClaim(network, w3provider, address) {
    console.log("network is %s", network);

    const userWallet  = await w3provider.getSigner();
    userWallet.address = address;
    let temporaryWallet = await generateSigner();
    
    const { awardedAddresses } = treeData
    let { tree, userIds } = await generateMerkleTree([...awardedAddresses, temporaryWallet.address])
    let merkleRoot = tree.getHexRoot();
    alert(merkleRoot)
    console.log('merkle root', merkleRoot)

    let Distributor = new Contract(governanceContracts[network].tokenDistributor, abis.TokenDistributor.abi, w3provider);
    let distributor = await Distributor.connect(userWallet);
    console.log('Connected to TokenDistributor at:', distributor.address);
    
    await claim(userWallet, temporaryWallet, tree, userIds, distributor.address, w3provider);

    let userId = userIds.get(temporaryWallet.address);
    const isClaimed = await distributor.isClaimed(userId);
    console.log(`isClaimed for ${userId}: ${isClaimed}`);

    console.log(`\n\nAttempt to claim the second time.`)
    try {
      await claim(userWallet, temporaryWallet, tree, userIds, distributor.address, w3provider);
    } catch (e) {
      console.error('Double claim failed:', e.message);
    }
}

async function claim(userWallet, temporaryWallet, merkleTree, userIds, distributorAddress, w3provider) {
    const Distributor = new Contract(distributorAddress, abis.TokenDistributor.abi, w3provider);
    const distributor = await Distributor.connect(userWallet);

  let userId = userIds.get('0x4701188a456406C860C85Ae3e42d0aF0689a243A');
  console.log('Claiming for userId', userId);

  let leaf = await hashedLeaf(userId, '0x4701188a456406C860C85Ae3e42d0aF0689a243A');
  let merkleProof = merkleTree.getHexProof(leaf);
  console.log('merkle proof', merkleProof);
  let signature = await signWithSigner(temporaryWallet, leaf);

    alert('claiming tx with: ' + userWallet.address)

  let claimTx = await distributor.claimTokens(
    userId,
    userWallet.address,
    merkleProof,
    leaf,
    '0x4701188a456406C860C85Ae3e42d0aF0689a243A',
    signature,
  );
  
  let events = (await claimTx.wait()).events;
  let claimed = events.find(e => e.event == 'Claimed');
  console.log(`Claimed: ${claimed.args.amount} tokens to ${claimed.args.account}`)
}

async function generateSigner() {
  let wallet = await ethers.Wallet.createRandom();

  return wallet;
}

async function signWithSigner(signer, leaf) {
  if (!ethers.utils.isBytesLike(leaf) || ethers.utils.hexDataLength(leaf) !== 32) {
    throw 'ERROR: leaf must be a bytes32 value. Length was ' + ethers.utils.hexDataLength(leaf);
  }

  let signature = await signer.signMessage(leaf);

  return signature;
}

/**
 * @param {[string]} addresses 
 * @returns {{
 *  enumerated: [{ userId: number, address: string }], 
 *  tree: MerkleTree,
 *  userIds: { [string]: number }
 * }}
 */
export async function generateMerkleTree(addresses) {
  // shuffle to make sure we don't accidentaly reveal GitHub usernames via userId enumeration
  let shuffled = addresses
    .map(address => ({ address, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort);
  
  let enumerated = shuffled
    .map((e, userId) => ({ userId, address: e.address }));
  
  let hashed = await Promise.all(enumerated
    .map(async (e) => await hashedLeaf(e.userId, e.address)));

  // TODO: why sortPairs: true? https://github.com/OpenZeppelin/workshops/blob/master/06-nft-merkle-drop/test/4-ERC721MerkleDrop.test.js#L20
  let tree = new MerkleTree(hashed, keccak256, { hashLeaves: false, sortPairs: true });

  let userIds = enumerated.reduce((acc, next) => acc.set(next.address, next.userId), new Map());

  return ({ enumerated, tree, userIds })
}

/**
 * 
 * @param {number} userId 
 * @param {string} address 
 * @returns {Buffer}
 */
export async function hashedLeaf(userId, address) {
  let leafData = await ethers.utils.defaultAbiCoder.encode(["uint32", "address"], [userId, address]);
  let leaf = keccak256(leafData);

  return leaf;
}
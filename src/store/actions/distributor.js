import { governanceContracts } from "../../constants"
import { infuraUrlFactory } from "../../utils"
import { FETCH_MERKLE_ROOT } from "./types"
import Web3 from 'web3'
import abis from "../../contracts"

export const setMerkleRoot = (merkleRoot) => ({
    type: FETCH_MERKLE_ROOT,
    payload: merkleRoot
})

export const fetchMerkleRoot = (network) => {
    const web3 = new Web3(infuraUrlFactory('kovan'))
    const contract = new web3.eth.Contract(abis.TokenDistributor.abi, governanceContracts.kovan.tokenDistributor)

    return async dispatch => {
        try {
            const merkleRoot = await contract.methods.merkleRoot().call()
            dispatch(setMerkleRoot(merkleRoot))
        } catch (error) {
            //
            alert(error)
        }
    }
}
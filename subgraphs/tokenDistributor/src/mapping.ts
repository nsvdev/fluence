import { BigInt } from "@graphprotocol/graph-ts"
import {
  TokenDistributor,
  Claimed,
  TransferUnclaimed
} from "../generated/TokenDistributor/TokenDistributor"
import {
  TokenDistributor as TokenDistributorEntity,
  Account
} from "../generated/schema"
import { distributorAddress, merkleRoot } from '../utils/helpers'


export function handleClaimed(event: Claimed): void {
  let distributor = TokenDistributorEntity.load(distributorAddress)

  if (distributor == null) {
    distributor = new TokenDistributorEntity(distributorAddress)
    distributor.merkleRoot = merkleRoot
    distributor.claimers = BigInt.fromI32(0)
  }

  distributor.claimers = distributor.claimers + BigInt.fromI32(1)
  distributor.save()

  let account = Account.load(event.transaction.from.toHex())
  if (account == null) {
    account = new Account(event.transaction.from.toHex())
    account.amount = BigInt.fromI32(0)
  }

  account.user_id = event.params.user_id
  account.amount = event.params.amount
  account.save()
}

export function handleTransferUnclaimed(event: TransferUnclaimed): void {}

import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import abis from "../../contracts";
import { governanceContracts } from "../../constants";

import {
    DELEGATE_STATUS,
    SET_DELEGATEE,
    SET_PROPOSAL_COUNT,
    SET_ERROR,
    CLAIM_STATUS
} from "./types"

import {
    FAIL,
    MINED,
    MINING,
    PENDING,
    REJECTED
} from '../../constants'


export const delegateStatus = (status) => ({
    type: DELEGATE_STATUS,
    payload: status
})

export const claimStatus = (status) => ({
    type: CLAIM_STATUS,
    payload: status
})

export const setDelegatee = (address) => ({
    type: SET_DELEGATEE,
    payload: address
})

export const setError = (error) => ({
    type: SET_ERROR,
    payload: error
})

export const claim = (w3provider, proof, network) => {
    return async dispatch => {
        let signer = w3provider.getSigner();
        let contract = new Contract(governanceContracts[network].mock, abis.Mock.abi, w3provider);
        let signed = await contract.connect(signer);
        try {
            const tx = await signed.claim(proof);
            dispatch(claimStatus(MINING))
            try {
                await tx.wait()
                dispatch(claimStatus(MINED))
            } catch (error) {
                dispatch(claimStatus(FAIL))
                dispatch(setError(error.message))
            }
        } catch (error) {
            dispatch(claimStatus(REJECTED))
            dispatch(setError(error.message))
        }
    }
}

export const delegate = (w3provider, delegatee, network) => {
    return async dispatch => {
        dispatch(delegateStatus(PENDING))
        let signer = w3provider.getSigner();
        let contract = new Contract(governanceContracts[network].token, abis.Comp.abi, w3provider);
        let signed = await contract.connect(signer);
        try {
            const tx = await signed.delegate(delegatee);
            dispatch(delegateStatus(MINING))
            try {
                await tx.wait()
                dispatch(delegateStatus(MINED))
                dispatch(setDelegatee(delegatee))
            } catch (error) {
                dispatch(delegateStatus(FAIL))
                dispatch(setError(error.message))
            }
        } catch (error) {
            dispatch(delegateStatus(REJECTED))
            dispatch(setError(error.message))
        }
    }
}

export const setProposalCount = (count) => ({
    type: SET_PROPOSAL_COUNT,
    payload: count
})

export const getProposalCount = (w3provider, network) => {
    return async dispatch => {
        let contract = new Contract(governanceContracts[network].alpha, abis.GovernorAlpha.abi, w3provider);
        try {
          const count = await contract.proposalCount();
          dispatch(setProposalCount(count))
        } catch (error) {
          dispatch(setProposalCount(0))
          dispatch(setError(error.message))
        }
    }
}

/*
 *
 *  DAO token contract functions
 *
 */

export const daoTokenBalanceOf = (w3provider, account, network) => {
    return async dispatch => {
        let contract = new Contract(governanceContracts[network].token, abis.Comp.abi, w3provider);
        let balance;
        try {
          let fetchedBalance = await contract.balanceOf(account);
          let decimals = BigNumber.from("1000000000000000000");
          balance = fetchedBalance.div(decimals).toNumber();
        } catch (error) {
          balance = error.message;
        }
        return balance;
    }
}
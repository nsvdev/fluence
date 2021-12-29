import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import abis from "../../contracts";
import { governanceContracts } from "../../constants";

import {
    DELEGATE_STATUS,
    SET_DELEGATEE,
    SET_PROPOSAL_COUNT,
    SET_ERROR,
    CLAIM_STATUS,
    SET_ALEGIBILITY,
    SET_LOCAL_PROOF,
    SET_OWNERSHIP,
    SET_CLAIM_STATUS,
    STORE_DELEGATEE,
    STORE_PROOF
} from "./types"

import {
    FAIL,
    MINED,
    MINING,
    PENDING,
    REJECTED
} from '../../constants'

export const setLocalProof = (proof) => ({
    type: SET_LOCAL_PROOF,
    payload: proof
})

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

export const claimV2 = (w3provider, proof, key, delegatee, network) => {
    return async dispatch => {
        dispatch(setError(null))
        let signer = w3provider.getSigner();
        let contract = new Contract(governanceContracts[network].mock, abis.Mock.abi, w3provider);
        let signed = await contract.connect(signer);
        try {
            const tx = await signed.claimV2(proof, key, delegatee);
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

export const claim = (
    userId, 
    delegateTo,
    merkleProof,
    leaf,
    temporaryAddress,
    leafSignatureHex,
    w3provider,
    network
    ) => {
    return async dispatch => {
        let signer = w3provider.getSigner();
        let contract = new Contract(governanceContracts[network].tokenDistributor, abis.TokenDistributor.abi, w3provider);
        let signed = await contract.connect(signer);
        try {
            const tx = await signed.claimTokens(
                userId, 
                delegateTo,
                merkleProof,
                leaf,
                temporaryAddress,
                leafSignatureHex
            );
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
            dispatch(setError(error?.data?.message || error.message))
        }
    }
}

export const setAlegibility = (alegible) => ({
    type: SET_ALEGIBILITY,
    payload: {
        isAlegible: alegible,
        checked: true
    }
})

export const checkGithubKey = (w3provider, key, network) => {
    return async dispatch => {
        let signer = w3provider.getSigner();
        let contract = new Contract(governanceContracts[network].mock, abis.Mock.abi, w3provider);
        let signed = await contract.connect(signer);
        try {
            const alegible = await signed.checkKey(key);
            dispatch(setAlegibility(alegible))
        } catch (error) {
            dispatch(setAlegibility({
                isAlegible: false,
                checked: true
            }))
            dispatch(setError(error.message))
        }
    }
}

export const setHasClaimed = (hasClaimed) => ({
    type: SET_CLAIM_STATUS,
    payload: hasClaimed
})

export const checkHasClaimed = (w3provider, network) => {
    return async dispatch => {
        let signer = w3provider.getSigner();
        let contract = new Contract(governanceContracts[network].mock, abis.Mock.abi, w3provider);
        let signed = await contract.connect(signer);
        try {
            const hasClaimed = await signed.checkInteraction();
            dispatch(setHasClaimed(hasClaimed))
        } catch (error) {
            dispatch(setError(error.message))
            dispatch(setHasClaimed(false))
        }
    }
}

export const storeProof = (proof) => ({
    type: STORE_PROOF,
    payload: proof
})

export const setGithubOwnership = (owner) => ({
    type: SET_OWNERSHIP,
    payload: {
        isOwner: owner,
        checked: true
    }
})

export const checkGithubOwnership = (w3provider, proof, network) => {
    return async dispatch => {
        let signer = w3provider.getSigner();
        let contract = new Contract(governanceContracts[network].mock, abis.Mock.abi, w3provider);
        let signed = await contract.connect(signer);
        try {
            const owner = await signed.checkProof(proof);
            dispatch(setGithubOwnership(owner))
        } catch (error) {
            dispatch(setGithubOwnership({
                isOwner: false,
                checked: true
            }))
            dispatch(setError(error.message))
        }
    }
}

export const storeDelegatee = (delegatee) => ({
    type: STORE_DELEGATEE,
    payload: delegatee
})

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
          dispatch(setProposalCount(count.toNumber()))
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
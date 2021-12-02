import {
    DELEGATE_STATUS,
    SET_DELEGATEE
} from "./types"
import {
    SUCCESS,
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

export const setDelegatee = (address) => ({
    type: SET_DELEGATEE,
    payload: address
})

export const delegate = (contract, from, to, delegatee) => {
    return async dispatch => {
        console.log('sending: ' + from)
        console.log('to: ' + to)

        try {
            dispatch(delegateStatus(PENDING))
            const res = await contract.methods.delegate(delegatee).send({ from: from })

            console.log(res)
            dispatch(delegateStatus(MINING))
            dispatch(setDelegatee(delegatee))
        } catch (error) {
            console.log(error)
            dispatch(delegateStatus(REJECTED))
        }

    }
}
import {
    DELEGATE_STATUS
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

export const delegate = (contract, from, to, delegatee) => {
    return async dispatch => {
        console.log('sending: ' + from)
        console.log('to: ' + to)

        try {
            dispatch(delegateStatus(PENDING))
            const res = await contract.methods.delegate(delegatee).send({ from: from })

            console.log(res)
            dispatch(delegateStatus(MINING))
        } catch (error) {
            console.log(error)
            dispatch(delegateStatus(REJECTED))
        }

    }
}
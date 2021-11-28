import {
    DELEGATE_SUCCESS,
    DELEGATE_FAIL
} from "./types"
import { defaultGas } from "../../constants"

export const delegateSuccess = () => ({
    type: DELEGATE_SUCCESS
})

export const delegateFail = () => ({
    type: DELEGATE_FAIL
})

export const delegateTo = (sendTransaction, contract, from, to, callee) => {
    return async dispatch => {
        console.log('sending: ' + from)
        console.log('to: ' + to)

        try {
            const res = await sendTransaction({
                from: from,
                to: to,
                data: callee || null
            })

            console.log(res)
            dispatch(delegateSuccess())
        } catch (error) {
            dispatch(delegateFail())
        }

    }
}
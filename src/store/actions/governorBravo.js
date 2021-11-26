import { DELEGATE_TO } from "./types"
import { defaultGas } from "../../constants"

export const delegateCreator = () => ({
    type: DELEGATE_TO
})

export const delegateTo = (sendTransaction, contract, from, to, callee) => {
    return async dispatch => {
        console.log('sending: ' + from)
        console.log('to: ' + to)

        const res = await sendTransaction({
            from: from,
            to: to,
            data: callee || null
        })

        console.log(res)
        dispatch(delegateCreator())
    }
}
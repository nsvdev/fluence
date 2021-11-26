import { DELEGATE_TO } from "./types"
import { defaultGas } from "../../constants"

export const delegateCreator = () => ({
    type: DELEGATE_TO
})

export const delegateTo = (sendTransaction, contract, sendingAccount, callee) => {
    return async dispatch => {
        console.log('sending: ' + sendingAccount)
        console.log('to: ' + contract._address)

        const res = await sendTransaction({
            from: sendingAccount,
            to: contract._address,
            data: callee || null,
            gas: defaultGas,
            gasLimit: defaultGas
        })

        console.log(res)
        dispatch(delegateCreator())
    }
}
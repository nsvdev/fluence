import { RESET_WEB3_PROVIDER, SET_ADDRESS, SET_CHAIN_ID, SET_WEB3_PROVIDER } from "../actions/types"

const initialState = {
    provider: null,
    web3Provider: null,
    address: null,
    chainId: null,
}

export function walletReducer(state = initialState, action) {
    console.log(action)

    switch (action.type) {
        case SET_WEB3_PROVIDER:
            return {
                ...state,
                ...action.payload
            }
        case SET_ADDRESS:
            return {
                ...state,
                address: action.payload.address,
            }
        case SET_CHAIN_ID:
            return {
                ...state,
                chainId: action.payload,
            }
        case RESET_WEB3_PROVIDER:
            return initialState
        default:
            return state
    }
}
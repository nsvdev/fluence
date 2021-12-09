import {
    RESET_WEB3_PROVIDER,
    SET_ADDRESS,
    SET_CHAIN_ID,
    SET_WEB3_PROVIDER,
    SET_NETWORK_NAME
} from "../actions/types"

const initialState = {
    provider: null,
    web3Provider: null,
    address: null,
    chainId: null,
    networkName: null
}

export function walletReducer(state = initialState, action) {
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

        case SET_NETWORK_NAME:
            return {
                ...state,
                networkName: action.payload
            }

        default:
            return state
    }
}
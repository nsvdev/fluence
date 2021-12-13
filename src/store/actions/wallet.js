import { getNetworkName as networkNameGetter } from "../../utils/contractFuncs";
import {
    RESET_WEB3_PROVIDER,
    SET_ADDRESS,
    SET_WEB3_PROVIDER,
    SET_NETWORK_NAME
} from "./types";

export const setWeb3Provider = (provider, web3Provider, address, network) => ({
    type: SET_WEB3_PROVIDER,
    payload: {
        provider,
        web3Provider,
        address,
        chainId: network.chainId
    }
})

export const resetWeb3Provider = () => ({
    type: RESET_WEB3_PROVIDER
})

export const setAddress = (accounts) => ({
    type: SET_ADDRESS,
    payload: {
        address: accounts[0]
    }
})

export const setNetworkName = (networkName) => ({
    type: SET_NETWORK_NAME,
    payload: networkName
})

export const getNetworkName = (w3provider) => {
    return async dispatch => {
        try {
            const networkName = await networkNameGetter(w3provider)
            dispatch(setNetworkName(networkName))
        } catch (error) {
            // wallet error dispatch
        }
    }
}
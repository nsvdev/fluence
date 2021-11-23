import { RESET_WEB3_PROVIDER, SET_ADDRESS, SET_WEB3_PROVIDER } from "./types";

export const setWeb3Provider = (provider, web3Provider, address, network) => ({
    type: SET_WEB3_PROVIDER,
    payload: {
        provider,
        web3Provider,
        address,
        chainId: network.chainId
    }
})

export const resetWeb3Provider = () => ({ type: RESET_WEB3_PROVIDER })

export const setAddress = (accounts) => ({
    type: SET_ADDRESS,
    payload: {
        address: accounts[0]
    }
})
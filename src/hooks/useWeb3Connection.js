import WalletConnectProvider from '@walletconnect/web3-provider'
import { providers } from 'ethers'
import { useCallback, useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Web3Modal from 'web3modal'
import { resetWeb3Provider, setAddress, setWeb3Provider } from '../store/actions/wallet'

const { REACT_APP_INFURA_KEY: INFURA_ID } = process.env

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
            infuraId: INFURA_ID, // required
        }
    }
}

let web3Modal
if  (typeof window !== 'undefined') {
        web3Modal = new Web3Modal({
            network: 'mainnet', // optional
            cacheProvider: true,
            providerOptions, // required
    })
}

export const useWeb3Connection = () => {
    const state = useSelector(state => state.wallet)
    const dispatch = useDispatch()
    const { provider, web3Provider, address, chainId } = state

    const connect = useCallback(async () => {
        const provider = await web3Modal.connect()
        const web3Provider = new providers.Web3Provider(provider)
        const signer = web3Provider.getSigner()
        const address = await signer.getAddress()
        const network = await web3Provider.getNetwork()

        dispatch(setWeb3Provider(provider, web3Provider, address, network))
    }, [])

    const disconnect = useCallback(
        async function () {
            await web3Modal.clearCachedProvider()
            if (provider?.disconnect && typeof provider.disconnect === 'function') {
                await provider.disconnect()
            }
            dispatch(resetWeb3Provider())
        },
        [provider]
    )

    useEffect(() => {
        if (web3Modal.cachedProvider) {
            connect()
        }
    }, [connect])

    useEffect(() => {
        if (provider?.on) {
        const handleAccountsChanged = (accounts) => {
            // console.log('accountsChanged', accounts)
            dispatch(setAddress(accounts))
        }
        const handleChainChanged = (_hexChainId) => {
            window.location.reload()
        }

        const handleDisconnect = (error) => {
            console.log('disconnect', error)
            disconnect()
        }

        provider.on('accountsChanged', handleAccountsChanged)
        provider.on('chainChanged', handleChainChanged)
        provider.on('disconnect', handleDisconnect)

        // Subscription Cleanup
        return () => {
            if (provider.removeListener) {
                provider.removeListener('accountsChanged', handleAccountsChanged)
                provider.removeListener('chainChanged', handleChainChanged)
                provider.removeListener('disconnect', handleDisconnect)
            }
        }
    }
    }, [provider, disconnect])

    return {
        connect,
        disconnect,
        provider,
        web3Provider,
        address,
        chainId,
        web3Provider
    }
}
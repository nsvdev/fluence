import WalletConnectProvider from '@walletconnect/web3-provider'
import { providers } from 'ethers'
import { useCallback, useEffect, useReducer } from 'react'
import Web3Modal from 'web3modal'
import { ellipseAddress, getChainData } from '../../utils'

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

const initialState = {
    provider: null,
    web3Provider: null,
    address: null,
    chainId: null,
}

function reducer(state, action) {
    switch (action.type) {
        case 'SET_WEB3_PROVIDER':
        return {
            ...state,
            provider: action.provider,
            web3Provider: action.web3Provider,
            address: action.address,
            chainId: action.chainId,
        }
        case 'SET_ADDRESS':
            return {
                ...state,
                address: action.address,
            }
        case 'SET_CHAIN_ID':
            return {
                ...state,
                chainId: action.chainId,
            }
        case 'RESET_WEB3_PROVIDER':
            return initialState
        default:
            throw new Error()
    }
}

export const Home = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { provider, web3Provider, address, chainId } = state

    const connect = useCallback(async () => {
        const provider = await web3Modal.connect()
        const web3Provider = new providers.Web3Provider(provider)
        const signer = web3Provider.getSigner()
        const address = await signer.getAddress()
        const network = await web3Provider.getNetwork()

        dispatch({
            type: 'SET_WEB3_PROVIDER',
            provider,
            web3Provider,
            address,
            chainId: network.chainId,
        })
    }, [])

    const disconnect = useCallback(
        async function () {
            await web3Modal.clearCachedProvider()
            if (provider?.disconnect && typeof provider.disconnect === 'function') {
                await provider.disconnect()
            }
            dispatch({
                type: 'RESET_WEB3_PROVIDER',
            })
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
            dispatch({
                type: 'SET_ADDRESS',
                address: accounts[0]
            })
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

  const chainData = getChainData(chainId)

  return (
    <>
        <div>
            {address && (
                <div className="grid">
                    <div>
                        <p className="mb-1">Network:</p>
                        <p>{chainData?.name}</p>
                    </div>
                    <div>
                        <p className="mb-1">Address:</p>
                        <p>{ellipseAddress(address)}</p>
                    </div>
                </div>
            )}
        </div>

        <main>
            {web3Provider ? (
                <button className="button" type="button" onClick={disconnect}>
                    Disconnect
                </button>
            ) : (
                <button className="button" type="button" onClick={connect}>
                    Connect
                </button>
            )}
        </main>

    </>
  )
}

export default Home
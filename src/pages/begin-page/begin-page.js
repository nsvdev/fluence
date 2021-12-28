import React from 'react';

import Header from '../../components/Header/Header';
import Title from '../../components/Title/Title';
import Text from '../../components/Text/Text';
import Button from '../../components/Button/Button';
import Url from '../../components/Url/Url';
import Dashboard from '../../components/Dashboard/Dashboard'
import DefinitionList from '../../components/DefinitionList/DefinitionList';
import Footer from '../../components/Footer/Footer'

import styles from './begin-page.module.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import { web2Logout } from '../../store/actions/user';
import { checkGithubKey } from '../../store/actions/governance';
import { useWeb3Connection } from '../../hooks/useWeb3Connection';

const PageBegin = () => {
    const navigate = useNavigate()
    const { loginWithRedirect, isAuthenticated, isLoading, logout } = useAuth0()
    const { isAlegible, checked } = useSelector(state => state.governance.alegibility)
    const { networkName, web3Provider } = useSelector(state => state.wallet)
    const {name, key} = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if(name && web3Provider) {
            dispatch(checkGithubKey(web3Provider, key, networkName))
        }
    }, [name, web3Provider])

    useEffect(() => {
        if(checked) {
            if(isAlegible) {
                navigate('/proof')
            } else {
                navigate('/not-found')
            }
        }
    }, [checked, isAlegible])

    const logOut = () => {
        dispatch(web2Logout())
        logout()
    }
    
    return (
        <div className={styles.background}>
            <Header />
            <div className={`container ${styles.container}`}>
                <main className={`main ${styles.main}`}>

                    <div className={styles.title}>
                        <Title type="h1" size="large" text="Claim your FLT reward"  />
                    </div>
                    <div className={styles.dashboard}>
                        <Dashboard>
                            <div className={styles["flex-container"]}>
                                <div className={styles["flex-container__part-left"]}>
                                    <ul className={styles.texts}>
                                        <li className={styles.text}>
                                            <Text type="large" color="black" >
                                                10% of the FLT supply is distributed to ~10,000 selected Web3 developers and contributors. Public keys of selected Github accounts were added into a smart contract on Ethereum. Claim your allocation and help us build the decentralized internet together!
                                            </Text>
                                        </li>
                                        <li className={styles.text}>
                                            <Text type="mid" color="black">
                                                Authenticate via Github, to check if you are eligible and proceed with claiming.
                                            </Text>
                                        </li>
                                    </ul>
                                    <ul className={styles.buttons}>
                                        <li className={styles.button}>
                                            {
                                                isLoading? 
                                                    <Button 
                                                        type="large"
                                                        icon="git"
                                                        text="Loading..."
                                                        disabled
                                                    />
                                                :
                                                isAuthenticated ?
                                                    <Button 
                                                        type="large"
                                                        icon="git"
                                                        text="Logout"
                                                        callback={() => logOut()}
                                                    />
                                                    :
                                                    <Button
                                                        type="large"
                                                        icon="git"
                                                        text="Check if I’m eligible"
                                                        callback={() => loginWithRedirect()}
                                                    /> 

                                            }
                                        </li>
                                        <li className={styles.button}>
                                            <span className={styles.span}>or</span>
                                            <Url text="Get FLT on Uniswap" color="black" />
                                        </li>
                                    </ul>
                                </div>
                                <div className={styles["flex-container__part-right"]}>
                                    <ul className={styles.definitions}>
                                        <li className={styles.definition}>
                                            <DefinitionList dd="500 FLT" dt="Current reward" colorD="orange" colorT="black" />
                                        </li>
                                        <li className={styles.definition}>
                                            <DefinitionList dd="65d 23h 19m 29s" dt="Time until reducing amount" colorT="black" colorD="black" />
                                        </li>
                                    </ul>
                                    <div className={styles.url}>
                                        <Url text="Details about the reward" color="black" />
                                    </div>
                                    
                                </div>
                            </div>
                        </Dashboard>
                    </div>
                    
                    
                </main>
            </div>
            <Footer />
        </div>
    )
}

export default PageBegin;
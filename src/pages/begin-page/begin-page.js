import React from 'react';

import Header from '../../components/Header/Header';
import Progress from '../../components/Progress/Progress';
import Title from '../../components/Title/Title';
import Text from '../../components/Text/Text';
import Button from '../../components/Button/Button';
import Url from '../../components/Url/Url';
import DefinitionList from '../../components/DefinitionList/DefinitionList';
import Footer from '../../components/Footer/Footer'

import styles from './begin-page.module.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PageBegin = () => {
    const navigate = useNavigate()
    const { loginWithRedirect, isAuthenticated, isLoading, logout } = useAuth0()

    const toWallet = () => {
        setTimeout(() => {
            navigate('/wallet')
        }, 600);
    }
    
    return (
        <div className={styles.background}>
            <Header />
            <div className="container">
                <main className="main">

                    <div className={styles.title}>
                        <Title type="h1" size="large" text="Claim your FLT reward"  />
                    </div>
                    <div className={styles["flex-container"]}>
                        <div className={styles["flex-container__part-left"]}>
                            <ul className={styles.texts}>
                                <li className={styles.text}>
                                    <Text type="large" >
                                        10% of the FLT supply is distributed to ~10,000 selected Web3 developers and contributors. Public keys of selected Github accounts were added into a smart contract on Ethereum. Claim your allocation and help us build the decentralized internet together!
                                    </Text>
                                </li>
                                <li className={styles.text}>
                                    <Text type="mid" >
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
                                                callback={() => logout()}
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
                                    <Url text="Get FLT on Uniswap" />
                                </li>
                            </ul>
                        </div>
                        <div className={styles["flex-container__part-right"]}>
                            <ul className={styles.definitions}>
                                <li className={styles.definition}>
                                    <DefinitionList dd="500 FLT" dt="Current reward" />
                                </li>
                                <li className={styles.definition}>
                                    <DefinitionList dd="65d 23h 19m 29s" dt="Time until reducing amount" />
                                </li>
                            </ul>
                            <div className={styles.url}>
                                <Url text="Details about the reward" />
                            </div>
                            
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    )
}

export default PageBegin;
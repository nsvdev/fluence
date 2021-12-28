import React, { useState, useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../components/Header/Header';
import Title from '../../components/Title/Title';
import Text from '../../components/Text/Text';
import Button from '../../components/Button/Button';
import Url from '../../components/Url/Url';
import Dashboard from '../../components/Dashboard/Dashboard'
import DefinitionList from '../../components/DefinitionList/DefinitionList';
import Footer from '../../components/Footer/Footer'

import styles from './begin-page.module.css';
import { fetchKeyFromGithub, setUsername, storeKey } from '../../store/actions/user';
import { ROUTE_WALLET } from '../../constants/routes';
import { claim } from '../../store/actions/governance';
import { testTokenClaim } from '../../utils/award';

const PageBegin = memo(() => {
    const navigate = useNavigate()
    const { web3Provider, networkName, address } = useSelector(state => state.wallet)
    const { username, key } = useSelector(state => state.user)
    const [name, setName] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        key && dispatch(storeKey(key))
    }, [web3Provider, key])

    useEffect(() => {
        username && dispatch(fetchKeyFromGithub(username))
    }, [username])

    useEffect(() => {
        if (typeof key === 'string') {
            navigate(ROUTE_WALLET)
        }
    }, [key])
    
    return (
        <div className={styles.background}>
            <Header />
            <div className={`container ${styles.container}`}>
                <main className={`main ${styles.main}`}>

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

                            <input type='text' onChange={(e) => { setName(e.target.value)} }/>

                            <ul className={styles.buttons}>
                                <li className={styles.button}>
                                    {
                                        <Button
                                            type="large"
                                            icon="git"
                                            text="Check if I’m eligible"
                                            callback={() => dispatch(setUsername(name))}
                                            // callback={() => dispatch(claim(
                                            //         12, 
                                            //         '0x307c5177d9629E10fbA001dB308dD8de817D4D73',
                                            //         ['0000000000000000000000000000000000000000000000000000006d6168616d'],
                                            //         'leaf',
                                            //         '0xa54d3c09E34aC96807c1CC397404bF2B98DC4eFb',
                                            //         'hex',
                                            //         web3Provider,
                                            //         networkName
                                            //     )
                                            // )}
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
                        </Dashboard>
                    </div>
                    
                    
                </main>
            </div>
            <Footer />
        </div>
    )
})

export default PageBegin;
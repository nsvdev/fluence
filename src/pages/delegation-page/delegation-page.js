import React, { useState } from 'react';

import Header from '../../components/Header/Header';
import Progress from '../../components/Progress/Progress';
import Title from '../../components/Title/Title';
import Dashboard from '../../components/Dashboard/Dashboard';
import WalletInfo from '../../components/WalletInfo/WalletInfo';
import UserCard from '../../components/UserCard/UserCard';
import Footer from '../../components/Footer/Footer';

import { users } from '../../mocks/UserCardMocks'
import styles from './delegation-page.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useWeb3Connection } from '../../hooks/useWeb3Connection';
import { hideString } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { delegate } from '../../store/actions/governance';

const DelegationPage = () => {
    const { address, web3, sendTransaction, web3Provider } = useWeb3Connection()
    const delegateState = useSelector(state => state.governance)
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const delegateAction = async () => {
        dispatch(delegate(web3Provider, address, 'kovan'))
    }

    const acc = hideString(address)

    useEffect(() => {
        if (delegateState.delegatee) {
            navigate('/done')
        }
    }, [delegateState.delegatee])

    return (
        <div className={styles.background}>
            <Header />
            <div className="container">
                <main className="main">
                    <div className={styles.progress}>
                        <Progress />
                    </div>
                    <div className={styles.wallet}>
                        <WalletInfo wallet="wallet" account={acc} />
                    </div>
                    <div className={styles.title}>
                        <Title type="h2" size="large" text="Confirmed! Delegate FLT to complete the claim"  />
                    </div>
                    <div className={styles.dashboard}>
                        <Dashboard>
                            <p className={styles.dashboard__text}>
                                Fluence DAO is based on the Compound governance model and requires delegation in order to vote. Delegated tokens stay in your wallet and can be undelegated at any time.
                            </p>
                            <p className={styles.dashboard__caption}>
                                0.001 ETH (~$15) gas fee will be involved for delegation transaction
                            </p>
                            
                            <ul className={styles.dashboard__list}>
                                {users.map(user => (
                                    <li className={styles.dashboard__item}
                                        key={user.id}>
                                            <UserCard card={user} delegateAction={delegateAction}/>
                                    </li>
                                    
                                ))}
                                <li className={styles.dashboard__item}>
                                    <UserCard delegateAction={delegateAction} self/>
                                </li>
                            </ul>

                        </Dashboard>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    )
}

export default DelegationPage;
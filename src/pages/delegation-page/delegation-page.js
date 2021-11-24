import React from 'react';

import Header from '../../components/Header/Header';
import Progress from '../../components/Progress/Progress';
import Title from '../../components/Title/Title';
import Dashboard from '../../components/Dashboard/Dashboard';
import WalletInfo from '../../components/WalletInfo/WalletInfo';
import UserCard from '../../components/UserCard/UserCard'

import { users } from '../../mocks/UserCardMocks'
import styles from './delegation-page.module.css';

const DelegationPage = () => {
    return (
        <div className={styles.background}>
            <Header />
            <div className="container">
                <main className="main">
                    <div className={styles.progress}>
                        <Progress />
                    </div>
                    <div className={styles.wallet}>
                        <WalletInfo wallet="wallet" account="0x24343242..534" />
                    </div>
                    <div className={styles.title}>
                        <Title type="large" text="Confirmed! Delegate FLT to complete the claim"  />
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
                                            <UserCard card={user}/>
                                    </li>
                                    
                                ))}
                                <li className={styles.dashboard__item}>
                                    <UserCard self/>
                                </li>
                            </ul>

                        </Dashboard>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default DelegationPage;
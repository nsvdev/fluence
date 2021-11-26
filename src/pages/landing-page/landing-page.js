import React from 'react';
import { Link } from 'react-router-dom';
import WalletInfo from '../../components/WalletInfo/WalletInfo';
import TextArea from '../../components/TextArea/TextArea';

import Header from '../../components/Header/Header';
import Progress from '../../components/Progress/Progress';
import Title from '../../components/Title/Title';
import Text from '../../components/Text/Text';
import Button from '../../components/Button/Button';
import DefinitionList from '../../components/DefinitionList/DefinitionList';
import Dashboard from '../../components/Dashboard/Dashboard';
import Footer from '../../components/Footer/Footer';
import RatingRange from '../../components/RatingRange/RatingRange';
import Proposal from '../../components/Proposal/Proposal';


import styles from './landing-page.module.css';

const card = {
    id: 12344,
    status: 'failed',
    nice: 300,
    bad: 1500,
    number: '034',
    date: 'Jun 24rd, 2021'
}

const card1 = {
    id: 12344,
    status: 'executed',
    nice: 4000,
    bad: 500,
    number: '034',
    date: 'Jun 24rd, 2021'
}

const card2 = {
    id: 12344,
    status: 'in voting',
    nice: 2200,
    bad: 1500,
    number: '034',
    date: 'Jun 24rd, 2021'
}

const LandingPage = () => {

    return (
        <div className={styles.overflow}>
            <Header button />
            <div className="container">
                <main className="main">
                    <section className={styles.promo}>
                        <div className={styles.promo__title}>
                            <Title type="h1" size="large" text="Fluence DAO" />
                        </div>
                        <Proposal card={card} />
                        <Proposal card={card1} />
                        <Proposal card={card2} />
                        <p className={styles.promo__text}>
                            Fluence is managed via a digital, global, and decentralised organization which everyone can take part of
                        </p>
                        <ul className={styles.promo__buttons}>
                            <li className={styles.promo__button}>
                                <Button type="large" text="Claim your token" />
                            </li>
                            <li className={styles.promo__button}>
                                <Button 
                                    type="large" 
                                    opacity={true} 
                                    text="Active proposals" 
                                />
                            </li>
                        </ul>
                    </section>
                    
                    <div className={styles.dashboard}>
                        <Dashboard>
                            <div className={styles["dashboard__flex-container"]}>
                                <div className={styles.dashboard__logo}/>
                                <DefinitionList dd="500 FLT" dt="ready to be claimed" colorD="orange" colorT="black"/>
                            </div>
                            <div className={styles.dashboard__text}>
                                <Text color="black" type="large">
                                    Claiming will require an Ethereum wallet and performing basic tasks with terminal on your computer. :name_badge:
                                </Text>
                            </div>
                            <ol className={styles.dashboard__list}>
                                <li className={styles.dashboard__item}>
                                    Connect an Ethereum wallet
                                </li>
                                <li className={styles.dashboard__item}>
                                    Generate proof of Github account ownership
                                </li>
                                <li className={styles.dashboard__item}>
                                    Delegate or self-delegate DAO voting power
                                </li>
                                <li className={styles.dashboard__item}>
                                    Receive the tokens
                                </li>
                            </ol>
                            <div className={styles.dashboard__caption}>
                                <Text color="grey" type="small">
                                    Two Ethereum transactions of 0.001 ETH & 0.002 ETH gas fees will be involved on steps 3 & 4
                                </Text>
                            </div>
                            <div className={styles.dashboard__button}>
                                <Button type="large" text="Connect a wallet"/>
                            </div>
                            <p className={styles.dashboard__paragraph}>
                                If you are an advanced Ethereum user, you can claim directly from the smart contract.  
                            </p>
                        </Dashboard>
                    </div>
                </main>
            </div>
            <main className="main">
                    <div className={styles.progress}>
                        <Progress />
                    </div>
                    <div className={styles.wallet}>
                        <WalletInfo wallet="wallet" account="0x24343242..534" />
                    </div>
                    <div className={styles.title}>
                        <Title type="large" text="Submit the proof of Github account ownership"  />
                    </div>
                    <div className={styles.dashboard}>
                        <Dashboard>
                            <form>
                            <ul className={styles.dashboard__list}>
                                <li className={styles.dashboard__item}>
                                    <p className={`${styles.dashboard__text} ${styles.dashboard__text_size_large}`}><span className={styles.dashboard__span}>Step 1: </span>Get the bash script</p>
                                    <p className={`${styles.dashboard__text} ${styles.dashboard__text_size_mid}`}><Link to='/' className={styles.dashboard__link}>Download </Link>the proof generation bash script to your local machine from Github and run it with the following command.</p>
                                    <p className={`${styles.dashboard__paragraph} ${styles.dashboard__paragraph_pl_27}`}>
                                        
                                    This script will read your private key, so we highly recommend inspecting the source code first
                            </p>
                                </li>

                                <li className={styles.dashboard__item}>
                                    <p className={`${styles.dashboard__text} ${styles.dashboard__text_size_large}`}><span className={styles.dashboard__span}>Step 2: </span>Generate a proof</p>
                                    <p className={`${styles.dashboard__text} ${styles.dashboard__text_size_mid}`}>Run the script in your machine terminal. Make sure keys that are uploaded to Github are also stored on this machine.</p>
                                    <p className={`${styles.dashboard__text} ${styles.dashboard__text_size_mid}`}>If everything went well, you should see a base64-encoded string in your terminal — that’s your proof.</p>
                                    <div className={styles.dashboard__textarea}>
                                        <TextArea text='./flt-proof.sh' disabled />
                                    </div>
                                </li>

                                <li className={styles.dashboard__item}>
                                    <p className={`${styles.dashboard__text} ${styles.dashboard__text_size_large}`}><span className={styles.dashboard__span}>Step 3: </span>Enter your proof</p> 
                                    <p className={`${styles.dashboard__text} ${styles.dashboard__text_size_mid}`}>Copy the base64-encoded proof from your terminal into the box below. The proof will be sent to the smart contract to unlock your tokens.</p>
                                    
                                    <div className={styles.dashboard__textarea}>
                                        <TextArea rows="4" />
                                    </div>
                                </li>
                            </ul>

                            <div className={styles.dashboard__button}>
                                <Button type="large" text="Submit proof"/>
                            </div>
                            <p className={styles.dashboard__paragraph}>
                                If you are an advanced Ethereum user, you can claim directly from the smart contract.  <Link to='/' className={styles.dashboard__link}>Learn how to do it</Link>
                            </p></form>
                        </Dashboard>
                    </div>
                </main>
            <Footer />
        </div>
    )
}

export default LandingPage;
import React from 'react';

import Header from '../../components/Header/Header';
import Progress from '../../components/Progress/Progress';
import Title from '../../components/Title/Title';
import WalletInfo from '../../components/WalletInfo/WalletInfo';
import Button from '../../components/Button/Button';
import Footer from '../../components/Footer/Footer';

import styles from './done-page.module.css';

const DonePage = () => {
    return (
        <div className={styles.background}>
            <Header />
            <div className="container">
                <main className="main">
                    <div className={styles.progress}>
                        <Progress />
                    </div>
                    <ul className={styles.wallets}>
                        <li className={styles.wallet}>
                            <WalletInfo wallet="wallet" account="0x24343242..534" />
                        </li>
                        <li className={styles.wallet}>
                            <WalletInfo wallet="delegate" account="0xD69B...1fE4" />
                        </li>
                    </ul>
                    
                    <div className={styles.title}>
                        <Title type="h1" size="large" text="Almost done! You can claim your reward now"  />
                    </div>

                    <p className={styles.caption}>
                        0.002 ETH (~$30) gas fee will be involved for claiming transaction
                    </p>
                    
                    <div className={styles.button}>
                        <Button text='Claim 500 FLT' />
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    )
}

export default DonePage;
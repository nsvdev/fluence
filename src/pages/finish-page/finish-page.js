import React from 'react';

import Header from '../../components/Header/Header';
import Progress from '../../components/Progress/Progress';
import Title from '../../components/Title/Title';
import WalletInfo from '../../components/WalletInfo/WalletInfo';
import Button from '../../components/Button/Button';
import Footer from '../../components/Footer/Footer';
import ProposalsList from '../../components/ProposalsList/ProposalsList';
import Url from '../../components/Url/Url';

import styles from './finish-page.module.css';

const cards = [
    {
        id: 12344,
        status: 'failed',
        nice: 300,
        bad: 1500,
        number: '034',
        date: 'Jun 24rd, 2021'
    },
    {
        id: 1234004,
        status: 'executed',
        nice: 4000,
        bad: 500,
        number: '034',
        date: 'Jun 24rd, 2021'
    },
    {
        id: 1234,
        status: 'in voting',
        nice: 2200,
        bad: 1500,
        number: '034',
        date: 'Jun 24rd, 2021'
    }
]

const FinishPage = () => {
    return (
        <div className={styles.background}>
            <div className={styles.background__image}>
                
            </div>
            <div class={styles.header}>
                <Header button />
            </div>
            
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
                        <Title type="h1" size="large" text="500 FLT claimed 🔥"  />
                    </div>

                    <p className={styles.caption}>
                        0.002 ETH (~$30) gas fee will be involved for claiming transaction
                    </p>
                    <ul className={styles.buttons}>
                        <li className={styles.button}>
                            <Button type="large" text="Claim 500 FLT" />
                        </li>
                        <li className={styles.button}>
                            <Button type="large" icon="twitter" text="Share on Twitter" />
                        </li>
                        <li className={styles.button}>
                            <Url text="Get more FLT on Uniswap" />
                        </li>
                    </ul>
                    
                    <section className={styles.involved}>
                        <div className={styles.involved__title}>
                            <Title type="h3" size="medium" text="Get involved with the DAO" />
                        </div>
                        <div className={styles.involved__list}>
                            <ProposalsList cards={cards} />
                        </div>
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    )
}

export default FinishPage;
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../components/Header/Header';
import Progress from '../../components/Progress/Progress';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import Dashboard from '../../components/Dashboard/Dashboard';
import WalletInfo from '../../components/WalletInfo/WalletInfo';
import TextArea from '../../components/TextArea/TextArea';
import Footer from '../../components/Footer/Footer';

import danger from '../../images/danger.svg';
import styles from './proof-page.module.css';
import { hideString } from '../../utils';
import { checkGithubOwnership, setLocalProof } from '../../store/actions/governance';

const ProofPage = () => {
    const { address, web3Provider, networkName } = useSelector(state => state.wallet)
    const { checked, isOwner } = useSelector(state => state.governance.githubOwnership)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ proofValue, setProofValue ] = useState('')

    const handleForm = (e) => {
        e.preventDefault()
        dispatch(setLocalProof(proofValue))
        dispatch(checkGithubOwnership(web3Provider, proofValue, networkName))
    }

    useEffect(() => {
        if (checked) {
            if(isOwner) {
                navigate('/delegation')
            } else {
                navigate('/not-found')
            }
        }
    }, [checked, isOwner])

    return (
        <div className={styles.background}>
            <Header />
            <div className="container">
                <main className="main">
                    <div className={styles.progress}>
                        <Progress />
                    </div>
                    <div className={styles.wallet}>
                        <WalletInfo wallet="wallet" account={address ? hideString(address) : ''} />
                    </div>
                    <div className={styles.title}>
                        <Title type="h1" size="large" text="Submit the proof of Github account ownership"  />
                    </div>
                    <div className={styles.dashboard}>
                        <Dashboard>
                            <form
                                onSubmit={handleForm}
                            >
                            <ul className={styles.dashboard__list}>
                                <li className={styles.dashboard__item}>
                                    <p className={`${styles.dashboard__text} ${styles.dashboard__text_size_large}`}><span className={styles.dashboard__span}>Step 1: </span>Get the bash script</p>
                                    <p className={`${styles.dashboard__text} ${styles.dashboard__text_size_mid}`}><Link to='/' className={styles.dashboard__link}>Download </Link>the proof generation bash script to your local machine from Github and run it with the following command.</p>
                                    <p className={`${styles.dashboard__paragraph} ${styles.dashboard__paragraph_pl_27}`}>
                                        <img src={danger} className={styles.dashboard__danger} alt="danger-icon"/>
                                    This script will read your private key, so we highly recommend inspecting the source code first
                            </p>
                                </li>

                                <li className={styles.dashboard__item}>
                                    <p className={`${styles.dashboard__text} ${styles.dashboard__text_size_large}`}><span className={styles.dashboard__span}>Step 2: </span>Generate a proof</p>
                                    <p className={`${styles.dashboard__text} ${styles.dashboard__text_size_mid}`}>Run the script in your machine terminal. Make sure keys that are uploaded to Github are also stored on this machine.</p>
                                    <p className={`${styles.dashboard__text} ${styles.dashboard__text_size_mid}`}>If everything went well, you should see a base64-encoded string in your terminal — that’s your proof.</p>
                                    <div className={styles.dashboard__textarea}>
                                        <p className={styles.paragraph}>./flt-proof.sh</p>
                                    </div>
                                </li>

                                <li className={styles.dashboard__item}>
                                    <p className={`${styles.dashboard__text} ${styles.dashboard__text_size_large}`}><span className={styles.dashboard__span}>Step 3: </span>Enter your proof</p> 
                                    <p className={`${styles.dashboard__text} ${styles.dashboard__text_size_mid}`}>Copy the base64-encoded proof from your terminal into the box below. The proof will be sent to the smart contract to unlock your tokens.</p>
                                    
                                    <div className={styles.dashboard__textarea}>
                                        <TextArea onChange={(e) => setProofValue(e.target.value)} name="token" rows="4" />
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
            </div>
            <Footer />
        </div>
    )
}

export default ProofPage;
import React from 'react';

import Header from '../../components/Header/Header';
import Progress from '../../components/Progress/Progress';
import Title from '../../components/Title/Title';
import Text from '../../components/Text/Text';
import Button from '../../components/Button/Button';
import Url from '../../components/Url/Url';
import DefinitionList from '../../components/DefinitionList/DefinitionList';
import Dashboard from '../../components/Dashboard/Dashboard';

import styles from './begin-page.module.css';

const FirstStepPage = () => {
    return (
        <div className={styles.background}>
            <Header />
            <div className="container">
                <main className="main">
                    <div className={styles.progress}>
                        <Progress />
                    </div>
                    <div className={styles.title}>
                        <Title type="large" text="Claim your FLT reward"  />
                    </div>
                    <div className={styles["flex-container"]}>
                        <Dashboard>
                            
                        </Dashboard>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default FirstStepPage;
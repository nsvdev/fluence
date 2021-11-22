import React from 'react';

import MainNavigation from '../MainNavigation/MainNavigation';
import Button from '../Button/Button'

import logo from '../../images/logo.svg'
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles['header__flex-container']}>
                <img src={logo} alt="fluence logotype" className={styles.header__logo} />
                <MainNavigation />
            </div>
            <Button type='default' text='Start building' />
        </header>
    )
}

export default Header;
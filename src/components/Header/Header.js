import React, { useState, useEffect } from 'react';

import MainNavigation from '../MainNavigation/MainNavigation';
import Button from '../Button/Button'

import logo from '../../images/logo.svg'
import styles from './Header.module.css';

const Header = ({ button=false }) => {

    const [currentWidthWindow, setCurrentWidthWindow] = useState(window.innerWidth);


    useEffect(() => {
        const resizeCurrentWidth = () => {
            setCurrentWidthWindow(window.innerWidth)
        }

        window.addEventListener('resize', resizeCurrentWidth);

        return () => {
            window.removeEventListener('resize', resizeCurrentWidth);
        }
        
    }, [window.innerWidth])
    return (
        <header className={styles.header}>
            <div className={styles['header__flex-container']}>
                <img src={logo} alt="fluence logotype" className={styles.header__logo} />
                <MainNavigation width={currentWidthWindow} />
            </div>
            {button && currentWidthWindow > 700 && <Button type='default' text='Start building' />}
        </header>
    )
}

export default Header;
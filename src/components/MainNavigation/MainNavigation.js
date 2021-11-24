import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './MainNavigation.module.css';

const MainNavigation = ({ width }) => {
    const [active, setActive] = useState('dao');
    

    // eslint-disable-next-line no-lone-blocks
    return (<>
        {width < 511
            ?
                <nav>
                    <button className={styles.burger} />
                </nav>
            :
                <nav className={styles.nav} >
                    <ul className={styles.nav__list}>
                        <li className={styles.nav__item}>
                            <NavLink to="#" className={`${styles.nav__link} ${active === 'tech' && styles.nav__link_active}` } onClick={() => setActive('tech')}>Technology</NavLink>
                        </li>
                        <li className={styles.nav__item}>
                            <NavLink to="#" className={`${styles.nav__link} ${active === 'dao' && styles.nav__link_active}` } onClick={() => setActive('dao')}>DAO</NavLink>
                        </li>
                        <li className={styles.nav__item}>
                            <NavLink to="#" className={`${styles.nav__link} ${active === 'faq' && styles.nav__link_active}` } onClick={() => setActive('faq')}>FAQ</NavLink>
                        </li>
                        <li className={styles.nav__item}>
                            <NavLink to="#" className={`${styles.nav__link} ${active === 'docs' && styles.nav__link_active}` } onClick={() => setActive('docs')}>Docs</NavLink>
                        </li>
                    </ul>
                </nav>
        }
    </>)
    

    
}

export default MainNavigation;
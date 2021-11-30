import React from 'react';

import Title from '../Title/Title';
import Text from '../Text/Text';
import List from '../List/List';

import { useFormWithValidation } from '../../hooks/useForm';


import styles from './Footer.module.css';

const Footer = () => {

    const { values, handleChange, isValid } = useFormWithValidation();

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__container}>
                <div className={styles.footer_row_top}>
                    <div className={styles[`footer__flex-container`]}>
                        <Title size="medium" type="h2" text="Stay up to date" />
                        <div className={styles.footer__text}>
                            <Text type='default' color='grey'>
                                Fluence Labs sends regular updates about the project. Subscribe via email to get notified.
                            </Text>
                        </div>
                    </div>
                    <form className={styles.footer__form} onSubmit={handleSubmit}>
                        <input 
                            className={`${styles.footer__input} ${!isValid && styles.footer__input_type_error}`}
                            type='email'
                            placeholder='Enter email'
                            name='email'
                            required
                            value={values.email || ''}
                            onChange={handleChange}
                        />
                        <span className={`${styles.footer__error} ${!isValid && styles.footer__error_show}`}>That doesn’t look like a valid email</span>
                        <button type='submit' className={styles.footer__submit}>
                            {/* <img src={arrow} alt="button submit" className={styles.footer__span} /> */}
                        </button>
                    </form>
                </div>
                <div className={styles.footer_row_bottom}>
                    <div className={styles.footer_column_left}>
                        <List title='Learn' >
                            <li className={styles.footer__item}>
                                Technology
                            </li>
                            <li className={styles.footer__item}>
                                FAQ
                            </li>
                            <li className={`${styles.footer__item} ${styles.footer__item_list_arrow}`}>
                                Videos
                            </li>
                        </List>
                        <List title='Build' >
                            <li className={styles.footer__item}>
                            Quick start 
                            </li>
                            <li className={styles.footer__item}>
                                Tutorials
                            </li>
                            <li className={`${styles.footer__item}`}>
                                Docs
                            </li>
                        </List>
                    </div>
                    <div className={styles.footer_column_right}>
                        <div style={{display: "flex"}}>
                            <List title='Get involved' >
                                <li className={styles.footer__item}>
                                    DAO 
                                </li>
                                <li className={styles.footer__item}>
                                    Events
                                </li>
                            </List>
                            <List>
                                <li className={`${styles.footer__item} ${styles.footer__item_list_arrow}`}>
                                    Telegram
                                </li>
                                <li className={`${styles.footer__item} ${styles.footer__item_list_arrow}`}>
                                    Discord
                                </li>
                                <li className={`${styles.footer__item} ${styles.footer__item_list_arrow}`}>
                                    Forum <span>soon</span>
                                </li>
                            </List>
                        </div>
                        
                        <List social>
                            
                        </List>
                    </div>
                </div>
            </div>
            <div className={styles.footer__corner} />
            
            
        </footer>
    )
}

export default Footer;
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
            <div className={styles.footer_row_top}>
                <div className={styles[`footer__flex-container`]}>
                    <Title type='medium' text='Stay up to date' />
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
                        value={values.email || ''}
                        onChange={handleChange}
                    />
                    <span className={`${styles.footer__error} ${!isValid && styles.footer__error_show}`}>That doesn’t look like a valid email</span>
                    <button type='submit' className={styles.footer__submit} />
                </form>
            </div>
            <div className={styles.footer_row_bottom}>
                <div className={styles.footer_column_left}>
                    <List title='Learn' >

                    </List>
                    <List title='Build' >
                        
                    </List>
                </div>
                <div className={styles.footer_column_right}>
                    <List title='Get involved' >
                        
                    </List>
                    <List>
                        
                    </List>
                    <List social>
                        
                    </List>
                </div>
            </div>
            
        </footer>
    )
}
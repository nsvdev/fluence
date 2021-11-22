import React from 'react';

import styles from './Button.module.css';

const Button = ({ type = 'default', text, icon = null }) => {
    if (type === 'default') return <button className={`${styles.button} ${styles.button_height_default}`}>{text}</button>
    if (type === 'large' && icon === 'git') return <button className={`${styles.button} ${styles.button_height_large} ${styles.button_icon} ${styles.button_icon_git}`}>{text}</button>
}

export default Button;
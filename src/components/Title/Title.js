import React from 'react';

import styles from './Title.module.css';

const Title = ({ text, type }) => {

    const styleType = type === 'large' ? styles.title_type_large : type === 'medium' ? styles.title_type_medium : type === 'small' ? styles.title_type_small : ''
    return (
        <h1 className={`${styles.title} ${styleType}`} >{text}</h1>
    )
}

export default Title;

import React from 'react';

import styles from './Title.module.css';

const Title = ({ text, type, color='' }) => {

    const styleType = type === 'large' ? styles.title_type_large : type === 'medium' ? styles.title_type_medium : type === 'small' ? styles.title_type_small : '';

    const styleColor = color === 'black' ? styles.title_color_black : '';


    return (
        <h1 className={`${styles.title} ${styleType} ${styleColor}`} >{text}</h1>
    )
}

export default Title;

import React from 'react';
import styles from './TextArea.module.css';

const TextArea = ({ text='', rows = "1", disabled=false }) => {
    return (
        <textarea className={styles.area} rows={rows} value={text} disabled={disabled}/>
    )
}

export default TextArea;
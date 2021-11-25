import React from 'react';
import styles from './TextArea.module.css';
import { useFormWithValidation } from '../../hooks/useForm'

const TextArea = ({ text='', rows = "1", disabled=false }) => {
    return (
        <textarea className={styles.area} rows={rows} value={text} disabled={disabled}/>
    )
}

export default TextArea;
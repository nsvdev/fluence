import React from 'react';
import styles from './TextArea.module.css';
import { useFormWithValidation } from '../../hooks/useForm'

const TextArea = ({ name, rows = "1", value, handleChange, disabled=false }) => {

    



    return (
        <textarea className={styles.area} name={name} onChange={handleChange} rows={rows} value={value || ''} disabled={disabled}/>
    )
}

export default TextArea;
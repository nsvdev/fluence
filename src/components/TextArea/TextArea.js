import React from 'react';
import styles from './TextArea.module.css';
import { useFormWithValidation } from '../../hooks/useForm'

const TextArea = ({ name, rows = "1", disabled=false }) => {

    const { values, handleChange } = useFormWithValidation();



    return (
        <textarea className={styles.area} name={name} onChange={handleChange} rows={rows} value={values.token || ''} disabled={disabled}/>
    )
}

export default TextArea;
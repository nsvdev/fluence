import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Url.module.css';

const Url = ({ text }) => {
    return (
        <Link to="/" className={styles.url}>{text}</Link>
    )
}

export default Url;
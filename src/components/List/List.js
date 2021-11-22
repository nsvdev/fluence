import React from 'react';

import Title from '../Title/Title';

import styles from './List.module.css';

const List = ({ title = '', social = false, children }) => {
    return (
        <>
            {title !== '' && <Title text={title} type='small' />}
            <ul className={styles.list}>
                {children}
            </ul>
        </>
    )
}

export default List;

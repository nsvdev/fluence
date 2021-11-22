import React from 'react';

import styles from './DefinitionList.module.css';

const DefinitionList = ( {dt, dd}) => {
    return(
        <dl className={styles["definition-list"]}>
            <dd className={styles["definition-list__definition"]} >{dd}</dd>
            <hr className={styles["definition-list__line"]} />
            <dt className={styles["definition-list__term"]} >{dt}</dt>
        </dl>
    )
}

export default DefinitionList;
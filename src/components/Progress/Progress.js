import React from 'react';

import styles from './Progress.module.css';

const Progress = () => {
    return (
        <ul className={styles["progress-list"]}>
            <li className={`${styles["progress-list__item"]} ${styles["progress-list__item_done"]} ${styles["progress-item_current"]}`}>
                <span className={`${styles["progress-list__caption"]} ${styles["progress-list__caption_done"]}`}>Wallet</span>
            </li>
            <li className={`${styles["progress-list__item"]} ${styles["progress-list__item_done"]} ${styles["progress-item_current"]}`}>
                <span className={`${styles["progress-list__caption"]} ${styles["progress-list__caption_done"]}`}>Proof</span>
            </li>
            <li className={`${styles["progress-list__item"]} ${styles["progress-item_current"]}`}>
                <span className={styles["progress-list__caption"]}>Delegation</span>
            </li>
            <li className={styles["progress-list__item"]}>
                <span className={styles["progress-list__caption"]}>Finish</span>
            </li>
        </ul>
    )
}

export default Progress;
import React from 'react';

import styles from 'UserCard.module.css';

const UserCard = ({ card }) => {
    return (
        <article className={styles.card}>
            <div className={styles["card__flex-container"]}>
                <div className={styles["card__user-info"]}>
                    <img className={styles.card__avatar} alt={card.name} src={card.url} />
                    <div className={styles.card__info}>
                        <p className={styles.card__name}>{card.name}</p>
                        <span className={styles.card__walet}>{card.wallet}</span>
                        <span className={styles.card__votes}></span>
                    </div>
                </div>
            </div>
            <div className={styles.card__rating}>
                
            </div>
        </article>
    )
}
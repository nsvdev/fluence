import React from 'react';
import { Link } from 'react-router-dom';

import dialog from '../../images/dialog-black.svg';
import telegram from '../../images/telegram-black.svg';
import discord from '../../images/discord-black.svg';
import styles from './LinkWithIcon.module.css';

const LinkWithIcon = ({ text, icon, url='/' }) => {
    const link = 
        icon === 'telegram' ? telegram 
        : icon === 'discord' ? discord
        : icon === 'dialog' ? dialog : ''


    return (
        <Link to={url} className={styles["link-with-icon"]}>
            <div style={{backgroundImage: "url(" + { dialog } + ")"}} className={styles["link-with-icon__icon"]} />
            <span>{text}</span>
        </Link>
    )
}

export default LinkWithIcon;
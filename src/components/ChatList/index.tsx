import React, {useState} from 'react'

import css from './index.module.scss'
import defaultAvatar from '../../resources/imgs/defaultAvatar.png'
import {UserInfo, ChatListProps} from '../../interface'
const index = (props:ChatListProps) => {
    const {onlineUserList, selectTarget} = props;
    
    return (
        <ul className={css.onlineUserList}>
            {
                onlineUserList.length !== 0 && onlineUserList.map((user:UserInfo) => {
                    return (
                    <li className={css.onlineUserItem} key={user.userID} onClick={() => {selectTarget(user.userID)}}>
                        <img className={css.avatar} src={user.avatar || defaultAvatar} alt="img loading error"/>
                        <span className={css.userName}>{user.userName}</span>
                        <span className={css.lastOnlineDate}>{user.lastOnlineDate}</span>
                    </li>
                    )
                })
            }
        </ul>
    )
}

export default index

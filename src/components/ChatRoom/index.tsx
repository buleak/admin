import React, { useRef, useState } from 'react'
import { Input, Button } from 'antd'

import css from './index.module.scss'
import defaultAvatar from '../../resources/imgs/defaultAvatar.png'
import { local } from '../../unit'
import { MsgInfo, UserInfo, ChatRoomProps } from '../../interface'
interface Item {
    msgList: MsgInfo[]
}
const Item = (props: Item) => {
    const { msgList } = props;
    const userInfo: UserInfo = JSON.parse(local.get('userInfo') as string);
    const ItemList = msgList.length !== 0 && msgList.map((item: MsgInfo) => {
        if (item.userID === userInfo.userID) {
            return (
                <li key={item.date} className={css.mineMsg}>
                    <div className={css.msg}>
                        {item.msg}
                        <i>{item.date}</i>
                    </div>
                    <img className={css.avatar} src={item.avatar || defaultAvatar} alt="image loading error" />
                </li>
            )
        } else {
            return (
                <li key={item.date} className={css.otherMsg}>
                    <img className={css.avatar} src={item.avatar || defaultAvatar} alt="image loading error" />
                    <div className={css.msg}>
                        {item.msg}
                        <i>{item.date}</i>
                    </div>
                </li>
            )
        }
    })
    return <>{ItemList}</>
}

export default (props: ChatRoomProps) => {
    const { emitMsg, msgList } = props;
    const emitRef = useRef(null);

    const onPressEnter = (e: any) => {
        e.persist()
        let msg:string = (emitRef.current as any).state.value.trim();
        if(msg) { emitMsg(msg); }
    }
    return (
        <div className={css.content}>
            <ul className={css.contentBox}>
                <Item msgList={msgList} />
            </ul>
            <div className={css.inputBox}>
                <Input ref={emitRef} onPressEnter={onPressEnter}/>
                <Button onClick={onPressEnter}>Enter</Button>
            </div>
        </div>
    )
}


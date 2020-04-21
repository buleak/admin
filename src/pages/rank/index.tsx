import React, { useState, useEffect } from 'react'

import $ from '../../api'
import { Users } from '../../interface'
import css from './index.module.scss'

const BtnGroup = (props: any) => {
    const { setRankType } = props;
    return (
        <div>
            {
                ['date', 'star', 'score'].map((val, index) => <button className={css.btn} key={index} onClick={() => setRankType(val)}><span>{val}</span></button>)
            }
        </div>
    )
}

const RankList = (props: any) => {
    const {userList} = props;
    return (
        <ul className={css.userBox}>
            {
                userList.map((item: Users) => {
                    return (
                        <li className={css.userInfo} key={item.id}>
                            <div>用户名：{item.userName}</div>
                            <span>date: {item.date}</span>
                            <span>star: {item.star}</span>
                            <span>score: {item.score}</span>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default (props: any) => {
    const [rankType, setRankType] = useState('date'), [userList, setUserList] = useState([]);
    useEffect(() => {
        $.ranking({
            rankType,
        }).then((data: any) => {
            console.log('data', data)
            if (data.userNameList) {
                setUserList(data.userNameList)
            }
        })
        return () => {

        }
    }, [rankType])
    return (
        <>
            <BtnGroup setRankType={setRankType}/>
            <RankList userList={userList} />
        </>
    )
}

import React from 'react'
import { NavLink } from 'react-router-dom'
import {Input, message} from 'antd'

import css from './index.module.scss'
import logo from '../../resources/imgs/logo.png'
import $ from '../../api'

export default function index(props:any) {
    let {history, url} = props;
    const routerLink = (e:any) => { history.push(e.target.name) }
    const search = (text:string) => {
        $.search({text}).then((data:any) => {
            if(data.status) {
                console.log('search_data', data)
            }else {
                message.warn('data is empty')
            }
        })
    }
    return (
        <header id={css.head}>
            <img className={css.logo} src={logo} alt="img loading error" />
            <nav>
                <NavLink activeClassName={css.navActive} to={`${url}/blog`} >Blog</NavLink>
                <NavLink activeClassName={css.navActive} to={`${url}/game`} >Game</NavLink>
                <NavLink activeClassName={css.navActive} to={`${url}/mall`} >Mall</NavLink>
                <NavLink activeClassName={css.navActive} to={`${url}/chat`} >Chat</NavLink>
            </nav>
            <Input.Search 
                placeholder='input search text'
                onSearch={search}
                style={{width: 200}}
                enterButton='搜索'
            />
            <div className={css.btnGroup} >
                <button name='/write' onClick={routerLink}>写文章</button>
                <button name='/message' onClick={routerLink}>私信</button>
                <button name='/mine' onClick={routerLink}>个人中心</button>
            </div>
        </header>
    )
}


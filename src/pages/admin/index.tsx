import React, { useEffect } from 'react'
import { Switch, Route, useHistory, useLocation } from 'react-router-dom'

// import $ from '../../api'
import {useMineRouteMatch, local} from '../../unit'
import { Head, Aside } from '../../components'
import { blog, game, mall, chat } from '../index'

export default () => {
    const history = useHistory(), // history对象，可操作历史堆栈 {push, replace, go, goBack, goForward, ...}
        location = useLocation(), // location对象，包含当前路径信息 {pathname, hash, search, state}
        {url, path} = useMineRouteMatch(); // 获取当前路由route path【/】 & link to url【/】用于匹配的地址
    // const params = new URLSearchParams(location.search); // 处理查询参数 {get, set, has, sort, keys, values, entries, getAll, append, delete, forEach, toString, ...}
    
    // console.log('params', params, params.getAll('name'))
    // console.log('history', history, location)
    // console.log('routeMatch', useRouteMatch(), url, path)

    useEffect(() => {
        if(!local.get('token')) {
            history.replace('/login')
        }
    }, [history])

    return (
        <>
            <Head url={url} history={history} />
            <Aside />
            <main style={{marginTop:'60px'}}>
                <Switch>
                    <Route exact path={`${path}/blog`} component={blog} />
                    <Route exact path={`${path}/game`} component={game} />
                    <Route exact path={`${path}/mall`} component={mall} />
                    <Route exact path={`${path}/chat`} component={chat} />
                </Switch>
            </main>
        </>
    )
}


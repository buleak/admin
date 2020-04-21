import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import {login, admin as HomePage, mine, rank, write, message, notFound as NotFound} from './pages'

import {local} from './unit'

const App = () => (
  // exact: 完全匹配       ['/', '/foo']
  // strict: 严格匹配      ['/', '/foo', '/foo/']
  // senstive: 大小写匹配  ['/', '/foo', '/Foo']
  <Switch>
    <Route exact path='/' render={({location}) => {
      return local.get('token') ?  (<HomePage />) : (<Redirect from='/' to={{pathname: '/login', state:{from:location}}} />)
    }} />
    <Route path='/login' component={login} />
    <Route path='/admin' render={() => <HomePage />} />
    <Route path='/mine' component={mine} />
    <Route path='/rank' component={rank} />
    <Route path='/write' component={write} />
    <Route path='/message' component={message} />
    <Route render={() => <NotFound />} />
  </Switch>
)

export default App


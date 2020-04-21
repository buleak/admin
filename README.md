### `npm start`
### `npm test`
### `npm run build`
### `npm run eject`

# 1.注册登录流程
client：首次进入 `/admin`，`localStorage`中未储存 `token`，跳转到 `/login`，点击**注册按钮**，
server：调用**注册接口**，储存用户信息到 `mongoDB`数据库，

# 2.eggJS
## 1.目录结构
1. config
   1. plugin.ts: 插件管理
   2. config.prod.ts: 生产环境配置
   3. config.local.ts: 开发环境配置
   4. config.default.ts: 默认配置
2. app
   1. controller: 控制器层: 处理接口，解析用户输入 & 返回相应数据
   2. service: 服务层: 处理业务逻辑
   3. model: 数据库层: 设置数据库的集合模型
   4. middleware: 中间件层
   5. view: 放置模板文件，用于模板渲染
   6. public: 放置静态资源
   7. schedule: 执行定时任务
   8. extend: 框架扩展
      1. helper.ts
      2. request.ts
      3. response.ts
      4. context.ts
      5. application.ts
      6. agent.ts
   9. interface.ts: ts接口
   10. router.ts: 路由规则
3. test
   1. test/**: 单元测试
## 

# 3.react
## 1.react
### 1.目录结构
1. public: 静态资源
   1. index.html: 单页面入口
2. src
   1. pages: 页面
   2. components: 组件
   3. index.tsx: App.tsx插入
   4. App.tsx: 整合的单页面应用
   5. unit.ts: 工具集合
   6. router.ts: 路由集合
   7. api.ts: 请求接口集合
   8. http.ts: 封装 axios
   9. interface.ts: ts接口集合
## 2.hooks
## 3.rudex
## 4.axios
## 5.react-router
1. hook
   1. useHistory: 返回用于导航的历史实例
      1. let history = useHistory(); history.push('/foo');
   2. useLocation: 返回代表当前 URL的 location对象
      1. let location = useLocation(); conosle.log(location.pathname)
   3. useParams: 返回URL参数的对象。使用它来访问当前<Route>的match.params[match:匹配]
      1. let { slug } = useParams(); return <div>now showing post {slug}</div>
   4. useRouteMatch: 与<Route>作用相同。主要用于在不实际呈现<Route>的情况下访问匹配数据
2. Routers：保持 UI & URL的同步
   1. BrowserRouter：使用 HTML5提供的 history API[pushState(), replaceState(), popstate事件]来保持 UI & URL的同步 
      1. [basename:string, forceRefresh:boolean, getUserConfirmation:function, keyLength:number, children:node]
      2. basename：基准URL
      3. forceRefresh：为 true时，导航过程中刷新整个页面
         1. 一般只有在不支持 HTML5 history API时使用 判断是否支持：const supportsHistory = 'pushState' in window.history;
      4. getUserConfirmation：确认是否导航的函数，配合<Prompt>使用
         1. 弹出提示，点击确定时才会导航
         2. 默认使用 confirm弹出提示：默认函数：const getConfirmation = (msg, callback) => { callback(window.confirm(msg)) }
      5. keyLength：location.key的长度，默认为 6
      6. children：要呈现的单个子元素(组件)
   2. HashRouter：使用 URL的 hash(window.location.hash)部分来保持 UI & URL的同步
      1. [basename:string, getUserConfirmation:function, hashType:string, children:node]
      2. hashType：window.location.hash使用的 hash类型
         1. slash：默认。后面跟斜杠：#/foo/far
         2. noslash：后面不跟斜杠：#foo/far
         3. hashbang：Google风格：#!/foo/far
   3. MemoryRouter：将 URL的历史记录保存在内存中(不读取或写入地址栏)，在测试或非浏览器环境中使用(React Native)
      1. [initialEntries:array, initialIndex:number, getUserConfirmation:function, keyLength:number, children:node]
3. Links：提供声明式的，可访问的导航链接
   1. Link
      1. [to:string|object|function, replace:boolean, innerRef:function|React.createRef(), others:any]
      2. to：链接地址[pathname:要链接的路径, search:查询参数, hash:URL中的hash, state:储存在location中的额外参数]
         1. string: <Link to='/foo?name=bb' />
         2. object: <Link to={{pathname: '/foo', search: '?name=bb', hash: '#the-hash', state: {额外参数} }} />
         3. function: <Link to={ function(location) { return string|object } } /> [location: 当前位置信息]
      3. replace：默认 false，设为 true时，历史堆栈中替换当前条目，而非添加新条目
      4. innerRef：允许访问组件的底层引用：const refCallBack = node => { /* node指向最终挂载的 DOM元素，卸载时为 null */ }
      5. other：可以传递一些其他属性，如：id、title、className
   2. NavLink：active时添加样式
      1. [activeClassName:string, activeStyle:object, exact:boolean, strict:boolean, isActive:function, location:object, aria-current:string]
      2. activeClassName：激活时的类名
      3. activeStyle：激活时的样式
      4. exact：默认 false，是否完全匹配
      5. strict：默认 false，是否严格匹配，匹配时是否考虑路径名后面的斜杠
      6. isActive：添加额外逻辑来判断是否为激活状态的函数：const isActiveFn = (match, location) => { return boolean}
         1. match：匹配信息
         2. location：当前 URL信息
      7. location：当前 URL信息，可以传递其他 URL
      8. aria-current：指示活动链接类型[默认为 page]
         1. page：用于指示一组分页链接中的链接
         2. step：用于指示基于步骤的过程的步骤指示器中的链接
         3. location：用于指示在视觉上突出显示的图像作为流程图的当前组成部分
         4. data：用于指示日历中的当前日期
         5. time：用于指示时间表中的当前时间
         6. true：用于指示NavLink是否处于活动状态
   3. Redirect：重定向到新位置，覆盖历史堆栈的当前位置
      1. [to:string|object, push:boolean, from:string, exact:boolean, strict:boolean, sensitive:boolean]
      2. push：默认 false。是否将新条目推送到历史堆栈，而不是替换当前条目
      3. from：
      4. exact：是否完全匹配
      5. strict：是否严格匹配
      6. sensitive：是否区分大小匹配
4. Routes：路由匹配时展示相应的 UI
   1. Route
      1. [component:component, render:function, children:function, path:string|string[], exact:boolean, strict:boolean, sensitive:boolean, location:object]
      2. component：<Route path='/foo' component={foo} />
      3. render：<Route path='bar' render={() => <div>Bar</div>} />
      4. children：<Route path='bzz' children={({match, location, history}) => <div>Bzz</div>} />
5. Prompt：用户导航前进行提示
   1. [message:string|function, when:boolean]
   2. message：function：<Prompt when={true} message={location => {return isApp ? `你确定要跳转到${location.pathname}吗？` : true;}}>
      1. location：下一个位置(用户想要跳转到的位置)
   3. when：true时弹出提示信息，false时不会弹出
6. Switch：渲染与路径匹配的第一个<Route />或<Redirect />
7. withRouter：高阶组件：
   1. 可以通过withRouter高阶组件访问历史对象的属性和最接近的<Route>匹配项
   2. 类组件中无法使用 this.props.history || this.props.location，需要用 withrouter封装。export default withRouter(MineComponent)
   
# 4.插件
## 1.CORS
### egg-cors[eggJS]
```js
    // 1. 下载插件
    npm i egg-cors -S

    // 2. 开启插件[plugin.ts]
    cors: { 
        enable: true,
        package: 'egg-cors'
    }

    // 3. 配置[config.default.ts]
        // tip: 开启csrf安全验证的情况下无法使用 egg-cors解决跨域问题。egg认为若允许跨域，则默认你信任该网站，不需要进行 csrf验证
    config.security = {
        csrf: { enable: false },// 关闭 csrf安全验证
        domainWhiteList: ['*'] // 白名单,配置 cors.origin后失效
    }
    config.cors = {
        credentials: true,
        origin: 'http://localhost:3000',
        allowMethods: 'GET, HEAD, PUT, POST, PATCH, DELETE'
    }
```

## 2.mongoDB数据库使用
### mongoDB[阿里云]
1. 下载安装 mongoDB
2. 配置 mongoDB后台自启动 
   1. mongod: 开启 mongoDB服务器
   2. mongo: 开启数据库控制台
### egg-mongoose[eggJS]
```js
    // 1. 下载插件
    npm i egg-mongoose -S
    
    // 2. 开启插件[plugin.ts]
    mongoose: {
        enable: true,
        package: 'egg-mongoose'
    }
    // 3. 配置[config.default.ts]
    config.mongoose = { 
        url: 'mongodb://47.94.3.149:27017/admin',
        options: {}
    }
    // 4. 设置模板[model/XXX.ts]
        // tip: collection_name对应 mongoDB集合的复数形式
    export default app => {
        const db = app.mongoose, Schema = db.Schema;
        const UserSchema = new Schema({
            userName: { type: String },
            passWord: { type: String },
        })
        return db.model('collection_name', UserSchema)
    }
    // 5. 使用 MongoDB 
        // tip: XXX对应 XXX.ts
    await this.ctx.model.XXX.find()
```

## 3.redis数据库使用
### redis[阿里云]
1. 下载安装 redis
2. 配置 redis后台自启动
   1. src/redis-server ../redis.conf: 使用 redis.conf的配置开启 redis服务器。redis.conf:
      1. 端口: 6000; 
      2. 密码: buleak;
      3. bind: 0.0.0.0; 
         1. 0.0.0.0: 所有ip
         2. 127.0.0.1: 本机ip
         3. 47.94.3.149: 阿里云ip
      4. 受保护模式: no;
   2. src/redis-cli -h 47.94.3.149 -p 6000: 开启数据库控制台
   3. auth buleak: 密码验证
### egg-redis[eggJS]
```js
    // 1. 下载插件
    npm i egg-redis -S

    // 2. 开启插件[plugin.ts]
    redis: { 
        enable: true,
        package: 'egg-redis'
    }

    // 3. 配置[config.default.ts]
    config.redis = {
        client: {
        port: 6000,
        host: '47.94.3.149',
        password: 'buleak',
        db: 0
        }
    }

    // 4. 使用
    await this.app.redis.set(`token_${userName}`, token)
```

## 4.JWT
### JWT详解
   1. JWT: Json Web Tokens: Header(头部).Payload(负载).Signature(签名)
      1. Header:描述JWT的元数据 { "alg": "HS256", "typ": "JWT"} // alg: 签名的算法[algorithm]; typ: 令牌[token]的类型[type]
      2. Payload:存放需要传递是数据 {iss:签发人, exp:过期时间, sub:主题, aud:受众, nbf:生效时间, iat:签发时间, jti:编号, ...自定义私有字段}
         1. JWT默认不加密，会被读取到，不要把秘密信息放到这里
      3. Signature:对前两部分的签名，防止数据被篡改
         1. 指定一个密钥，使用 Base64URL算法将前两部分串型化，使用前面提到的签名算法[HS256]，将三个部分拼接为字符串，用【.】分隔
   2. 特点：
      1. 默认不加密，但可以在生成原始 token后再使用【密钥】加密一次
      2. 不加密的情况下，不要在 JWT中写入秘密信息
      3. JWT不仅可以用来认证，也可以进行交换信息
      4. 一旦 JWT签发了，在到期之前都是有效的，服务器如果不做逻辑处理，是无法中途废弃某个 token，或更改 token权限。
      5. JWT本身包含了认证信息，一旦泄露，任何人都可以获得该令牌的权限。有效期应该设置时间较短，对一些重要权限，应该再次认证
      6. 为了减少盗用，JWT应该使用 HTTPS协议传输
   3. 流程用户登录
   4. 服务器认证
   5. 认证成功后，返回一个 JSON对象给到客户端。为了防止用户篡改数据，生成 JSON时会加上签名
   6. 客户端保存该 JSON【存储在cookie 或者localStorage里】，并在每次请求后台时都携带它【可以在headers、cookie或者请求参数中】
      1. 最好放在 HTTP请求头信息的 Authorization: `Bearer ${token}`
      2. 放在 Cookie中自动发送，但不能跨域
      3. 跨域的时候，可以放在 POST的参数里
   7. 服务器根据该 JSON判断用户身份 & 是否过期
### egg-jwt[eggJS]
```js
   // 1. 下载插件
   npm i egg-jwt -S

   // 2. 开启插件[plugin.ts]
   jwt: { 
      enable: true,
      package: 'egg-jwt'
   }

   // 3. 配置[config.default.ts]
   config.jwt = {
      secret: '[XXXXX]' // 加密条件字符串
   }

   // 4. 使用
   router.resources('/rank', jwt, controller.rank) // 需要验证 token的路由加上 [jwt]

   const token = this.app.jwt.sign( // jwt设置 token
      { userName }, // 需要储存的 token数据
      app.config.jwt.secret, 
      { expiresIn: '1h' } // token过期时间
   ); 

   // 5. token存储在 redis数据库中
   await app.redis.set(`token_${userName}`, token) 

   // 6. 返回数据时带上 token
   body = {status: 200, msg: 'ok', token}

   // 7. 前端使用
   获得 token时将其保存在 localStorage中：localStorage.setItem('token', data.token) 
   请求拦截：自动在请求头内添加token：headers.Authorization = `Bearer ${token}`
   响应拦截：返回值是 401[未登录]或者 403[token过期]时删除本地token，并跳转到登录界面
```

# 5.Bug
1. VSCode使用 `F2`修改 dom元素，会修改 ts定义，导致报错`Property 'div' does not exist on type 'JSX.IntrinsicElements'`
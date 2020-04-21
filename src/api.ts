import {get, post} from './http'

const login = (params:any) => get('/user', params) // 登录接口 @param params {userName, passWord} 
const register = (params:any) => post('/user', params) // 注册接口 @param params {userName, passWord, email, rePassWord}
const hasToken = () => get('/token') // 通过响应拦截判断是否有 token或 token是否过期
const search = (params:any) => get('/search', params) // 首页搜索文章
const ranking = (params:any) => get('/rank', params)
const getUserInfo = (params:any) => get(`/user/${params.userName}`) 
const getChatHistory = (params:any) => get('/chatHistory', params)

export default {
    login,
    register,
    hasToken,
    ranking,
    search,
    getUserInfo,
    getChatHistory,
}

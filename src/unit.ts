import {useRouteMatch} from 'react-router-dom';

let baseUrl = '';
export const testBaseUrl = 'http://localhost:7001'
export const productionBaseUrl = 'http://buleak.top:7001'
export const developmentBaseUrl = 'http://localhost:7001'
if (process.env.NODE_ENV === 'test') { // 测试环境
    baseUrl = testBaseUrl
}else if (process.env.NODE_ENV === 'production') { // 生产环境
    baseUrl = productionBaseUrl
}else if (process.env.NODE_ENV === 'development') { // 开发环境
    baseUrl = developmentBaseUrl
} 
export const baseURL = baseUrl;

export const isObj = (val:object) => Object.prototype.toString() === val.toString()

export const useMineRouteMatch = () => {
    // 当路由从 '/' 跳转到 '/xxx' 时，错误的认为 http://localhost:3000//xxx --> http://xxx，报错
    let {url, ...other} = useRouteMatch()
    if(url === '/') { url = '/admin'}
    return {url, ...other}
}

export const local = {
    set(key:string, value:any) {
        localStorage.setItem(key, JSON.stringify(value))
    },
    get(key:string) {   
        return localStorage.getItem(key);
    },
    remove(key:string) {
        localStorage.removeItem(key)
    },
    clear() {
        localStorage.clear()
    },
    length() {
        return localStorage.length
    }
}

export const session = {
    set(key:string, value:any) {
        sessionStorage.setItem(key, JSON.stringify(value))
    },
    get(key:string) {
        return sessionStorage.getItem(key);
    },
    remove(key:string) {
        sessionStorage.removeItem(key)
    },
    clear() {
        sessionStorage.clear()
    },
    length() {
        return sessionStorage.length
    }
}
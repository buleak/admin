// import qs from 'qs'
import axios from 'axios'
import { message } from 'antd'
import {baseURL, local} from './unit'

axios.defaults.baseURL = baseURL

// 请求超时
axios.defaults.timeout = 3600000 * 24

// post默认请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        console.log('---------------', localStorage.getItem('token'), local.get('token'))
        if (local.get('token')) {
            const token = local.get('token');
            config.headers.Authorization = `Bearer ${token}` // 不能直接设置值为 token，需要在前面加上 Bearer+空格       
            console.log('token >>', token)
        }
        return config;
    },
    error => Promise.reject(error)
)

// 响应拦截
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },
    error => {
        console.log('error', error)
        if (error.response.status) {
            switch (error.response.status) {
                case 400:
                    console.log('错误请求')
                    break;
                case 401: // 未登录
                    if (window.location.href === '/login') {
                        return false;
                    }
                    // 携带当前页面路径跳转到登录页面，登录成功后返回当前页面
                    message.info('INFO: 您尚未登录[401]')
                    local.remove('token')
                    window.location.href = '/login'
                    console.log('尚未登录')
                    break;
                case 403: // 登录 token过期
                    if (window.location.href === '/login') {
                        return false;
                    }
                    message.warn('WARN: 登录凭证过期[403]')
                    local.remove('token')
                    window.location.href = '/login'
                    console.log('登录凭证过期')
                    break;
                case 404: // 网络请求不存在
                    message.error('ERROR: 网络请求不存在[404]')
                    console.log('网络请求不存在')
                    break;
                case 405:
                    console.log('请求方法未允许')
                    break;
                case 408:
                    console.log('请求超时')
                    break;
                case 500:
                    message.error('服务器端出错')
                    console.log('服务器端出错')
                    break;
                case 501:
                    console.log('网络未实现')
                    break;
                case 502:
                    console.log('网络错误')
                    break;
                case 503:
                    console.log('服务不可用')
                    break;
                case 504:
                    console.log('网络超时')
                    break;
                default:
                    // 直接抛出错误提示
                    console.log('未知错误') 
                    message.error(`ERROR: ${error.response.message}`)

            }
            return Promise.reject(error.response)
        } else {
            message.error('ERROR: 未发现 error status')
        }
    }
)

/**
 * axios的 get请求方法
 * @param url 请求的URL地址
 * @param params 请求时携带的参数
 */
export const get = (url: string, params?: any) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params
        }).then(res => {
            console.log(`GET[${url}] >>`, res)
            resolve(res.data)
        }).catch(err => {
            console.log(`GET[${url}] >>`, err)
            reject(err.data)
        })
    })
}

/**
 * axios的 post请求方法
 * @param url 请求的URL地址
 * @param params 请求时携带的参数
 */
export const post = (url: string, params: any) => {
    return new Promise((resolve, reject) => {
        axios.post(url, {
            ...params
        }).then(res => {
            console.log(`POST[${url}] >>`, res)
            resolve(res.data)
        }).catch(err => {
            console.log(`GET[${url}] >>`, err)
            reject(err.data)
        })
    })
}

/**
 * axios的并发请求
 * @param axiosList axios请求列表
 */
export const all = (axiosList: object[]) => {
    return new Promise((resolve, reject) => {
        axios.all(axiosList).then(axios.spread((acct, perms) => {
            // 所有 axiosList内的请求结束后执行
            console.log('axios spread >>', acct, perms)
            resolve({ acct, perms })
        })).catch(error => {
            reject(error)
        })
    })
}


/* ------------------------ */
// import axios from "axios";
// import { stringify } from "qs";
// import { api } from "src/defaultSettings";
// import { Modal } from "antd";
// import { getWeekLocalStorage } from "./storage";

// const codeMessage = {
//   200: "服务器成功返回请求的数据。",
//   201: "新建或修改数据成功。",
//   202: "一个请求已经进入后台排队（异步任务）。",
//   204: "删除数据成功。",
//   400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
//   401: "用户没有权限（令牌、用户名、密码错误）。",
//   403: "用户得到授权，但是访问是被禁止的。",
//   404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
//   406: "请求的格式不可得。",
//   410: "请求的资源被永久删除，且不会再得到的。",
//   422: "当创建一个对象时，发生一个验证错误。",
//   500: "服务器发生错误，请检查服务器。",
//   502: "网关错误。",
//   503: "服务不可用，服务器暂时过载或维护。",
//   504: "网关超时。"
// };

// function checkStatus(response) {
//   if (!response) {
//     throw new Error("response is undefined");
//   }
//   if (response.status >= 200 && response.status < 300) {
//     return response;
//   }
//   const errorText = codeMessage[response.status] || response.statusText;
//   const error = new Error(errorText);
//   error.name = response.status;
//   error.response = response;
//   error.text = errorText;
//   throw error;
// }

// export const config = {
//   //`baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
//   // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
//   baseURL: api,
//   // 在请求发送前，可以根据实际要求，是否要对请求的数据进行转换
//   // 仅应用于 post、put、patch 请求
//   transformRequest: [
//     function(data, headers) {
//       // Do whatever you want to transform the data
//       // console.log(headers);
//       return stringify(data);
//     }
//   ],

//   //  `transformResponse` 在传递给 then/catch 前，允许修改响应数据
//   // it is passed to then/catch
//   transformResponse: [
//     function(data) {
//       // Do whatever you want to transform the data

//       return data;
//     }
//   ],

//   // 请求头信息
//   headers: {
//     // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;',
//   },
//   // 设置超时时间
//   timeout: 1000,
//   // 携带凭证
//   withCredentials: false
// };

// const instance = axios.create(config);

// //请求拦截器
// instance.interceptors.request.use(
//   config => {
//     // Do something before request is sent
//     // 可以在这里做一些事情在请求发送前
//     // config.headers['TOKEN']=''// 在这里设置请求头与携带token信息;
//     const token = getWeekLocalStorage("token");
//     if (token) {
//       config.headers["AUTHORIZATION"] = token;
//     }
//     if (config.method === "post") {
//       config.headers["Content-Type"] =
//         "application/x-www-form-urlencoded;charset=UTF-8";
//     }

//     return config;
//   },
//   error => {
//     // Do something whit request error
//     // 请求失败可以做一些事情
//     return Promise.reject(error);
//   }
// );

// //响应拦截器
// instance.interceptors.response.use(
//   response => {
//     // Do something with response data
//     // 在这里你可以判断后台返回数据携带的请求码
//     return response;
//   },
//   error => {
//     // Do something whit response error
//     // 根据 错误码返回信息
//     return checkStatus(error.response);
//   }
// );

// /* method GET/POST/PUT
//  * url
//  * params/data
//  * headers { 'content-type': 'application/x-www-form-urlencoded'}
//  */
// const ajax = options => {
//   return new Promise((resolve, reject) => {
//     instance(options)
//       .then(response => {
//         resolve(response);
//       })
//       .catch(error => {
//         console.dir(error);
//         Modal.error({
//           title: "请求错误",
//           content: error.message
//         });
//         reject(error);
//       });
//   });
// };

// export default ajax;
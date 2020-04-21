import {useState, useEffect} from 'react'

/**
 * 1. 调用 useCustom() --> 将 setState添加到监听器 list中 --> return [custom, setCustom]
 * 2. 调用 setCustom() --> 将 custom合并到 state中       --> 执行 监听器 list中所有 setState
 */
let state = {}, listeners:Function[] = [];

const setCustom = (custom:any) => {
    state = {...state, ...custom}
    listeners.forEach(listener => {
        listener(state) // setState(state)
    })
}

const useCustom = (initialState:any) => {
    const setState = useState(initialState)[1];
    useEffect(() => {
        listeners.push(setState)
        state = {...initialState}
        return () => {// 组件卸载时 删除 listeners中的 setState
            // if listener === setState， return false，setState将被过滤掉
            listeners = listeners.filter(listener => listener !== setState) 
        }
    }, []) // []只有组件挂载时调用一次，组件更新时不调用
    return [state, setCustom]
}

export default useCustom;
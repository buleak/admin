import React,{useState, useEffect} from 'react'
import { Prompt } from 'react-router-dom'
import io from 'socket.io-client'

import $ from '../../api'
import css from './index.module.scss'
import {baseURL, local} from '../../unit'
import {RoomInfo, UserInfo} from '../../interface'
import {ChatRoom, ChatList} from '../../components'

 /**
  * connect reconnect disconnect connect_error reconnect_error reconnecting reconnect_attempt reconnect_faild ping pong
  */
export default () => {
    let socketChat:any; 
    let {userID} = JSON.parse(local.get('userInfo') as string);
    const [msgList, setMsgList] = useState([]); // 消息列表
    const [onlineUserList, setOnlineUserList] = useState([]); // 在线列表
    const [roomID, setRoomID] = useState('public'); // 聊天室ID
    const [targetID, setTargetID] = useState(''); // 聊天对象ID
    const [isConnected, setIsConnected] = useState(false); // 是否断开了 ws连接

    useEffect(() => {
        let userInfo:UserInfo = JSON.parse(local.get('userInfo') as string)
        // 1. 创建 & 打开 ws链接
        socketChat = io(`${baseURL}/chat`);
        socketChat.open() // === socketChat.connect()

        // 2. 监听到 ws连接成功
        socketChat.on('connect', async () => { 
            const roomInfo:RoomInfo = { roomID: 'public', roomName: `公共聊天室` }
            // emit字符串就相当于 http的接口: 服务端监听 onlineList，并通过 online返回信息回来
            // 发送用户信息 & 服务端监听到后会返回线人员列表
            console.log('userInfo', userInfo)
            socketChat.emit('client_online', 'server_online', roomInfo, userInfo) 
            setIsConnected(true)
        })
        // 3. 监听服务端返回在线用户信息
        socketChat.on('server_online', (data:[]) => { 
            console.log('server_online_data', data)
            setOnlineUserList(data)
        })
        // 4. 监听服务端返回用户聊天记录
        socketChat.on('server_msg', (data:[]) => { 
            console.log('server_msglist_data', data)
            setMsgList(data)
        })

        socketChat.on('deny', () => { // 有用户被踢出
            console.log('用户被提出聊天室')
        })
    
        socketChat.on('disconnect', (timeout:any) => { // 监听断开连接
            console.log('连接断开', timeout.reason)
            setIsConnected(false)
            socketChat.open()
        })
    },[])
    
    const emitMsg = (msg:string) => { 
        socketChat.emit('client_msg', 'server_msg', { userID, targetID, roomID, msgs: {userID, msg, date: new Date().getTime()} })
    }
    const getChatHistory = (userID:string, targetID: string) => {
        setRoomID('public')
        $.getChatHistory({userID, targetID}).then(data => {
            console.log('getChathistory >>', data)
            setMsgList(data as [])
        })
    }
    const selectTarget = (targetID: string) => {
        setTargetID(targetID)
        getChatHistory(userID, targetID)
    }
    // // const connectChatRoom = (id:string) => {
        
    // // }
    
    // // 虚拟数据
    // const emitMsg = (msg:string) => { console.log(msg)}
    // const virtualOnlineUserList:UserInfo[] = [
    //     { userID: 'QAQ0.129873845458665_1587033294500', userName: 'aa', lastOnlineDate: new Date().getTime()+1000 },
    //     { userID: 'QAQ1', userName: 'bb', lastOnlineDate: new Date().getTime()+20002 },
    //     { userID: 'QAQ2', userName: 'flfkskdlskewjkrejfd jkrejewkjewkdsjdj', lastOnlineDate: new Date().getTime()-93949 },
    // ],
    // virtualMsgList: MsgInfo[] = [
    //     { userID: 'QAQ0.129873845458665_1587033294500', date: new Date().getTime()+1234, msg: 'hello buleak' },
    //     { userID: 'QAQ1', date: new Date().getTime()+2345, msg: 'hello admin, too' },
    //     { userID: 'QAQ1', date: new Date().getTime()+34456, msg: '天气不错' },
    //     { userID: 'QAQ0.129873845458665_1587033294500', date: new Date().getTime()+56780, msg: '大家撒看见大家的时间的卡尔瓦的精神困境的刷卡就，的九十五克二五九的数据可靠的数据，呈现出' },
    //     { userID: 'QAQ2', date: new Date().getTime()+90039, msg: '再见' },
    // ]


    return (
        <article className={css.chatRoom}>
            <Prompt
                when={isConnected}
                message={location => {
                    let isLeave = window.confirm(`are you sure close this websocket and leave ?`)
                    if(isLeave) { socketChat.close(); return true }
                    else { return false }
                }} />
            <div>通讯</div>
            <ChatList selectTarget={selectTarget} onlineUserList={onlineUserList} />
            <ChatRoom emitMsg={emitMsg} msgList={msgList} />
        </article>
    )
}

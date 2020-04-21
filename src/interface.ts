export interface Forms { // 登录注册表单
    userName: string,
    passWord: string,
    rePassWord?: string,
    email?: string,
}

export interface Users { // 排行榜用户列表
    id: number,
    date: number,
    star: number,
    score: number,
    userName:string,
}

export interface States { 
    form: Forms,
    setForm?: any
}

// -------- chat --------

export interface RoomInfo {roomID: string, roomName: string}
export interface UserInfo {avatar?: string, userID: string, userName: string, lastOnlineDate?: number}
export interface MsgInfo {userID: string, msg: string, date: number, avatar?: string}
export interface ChatListProps {selectTarget: Function, onlineUserList: UserInfo[]}
export interface ChatRoomProps {emitMsg: Function, msgList: MsgInfo[]}
import React, { useState, useEffect, useContext, createContext } from 'react'
import { useHistory, useLocation, Prompt } from 'react-router-dom'
import { Input, Button, Select, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import $ from '../../api'
import css from './index.module.scss'
import logo from '../../resources/imgs/logo.png'
import { Forms, States } from '../../interface'
import { local } from '../../unit'

const { Option } = Select;
/**
 * Input：输入框
 *  type：等同于 Input.Type [TextArea, Search, Group, PPassword]
 *  size：控件大小[small, large, middle]
 *  value/defaultValue：值/默认值
 *  disabled：是否禁用
 *  prefix/suffix：前缀/后缀
 *  addonBefore/addonAfter：前/后置标签
 *  allowClear：清除内容icon
 *  onChange: value变化时回调
 *  onPressEnter：按下回车时回调
 */

/**
 * 状态提升
 */
interface LocationStateParam {
    from?: any
}

const formObj: Forms = { userName: '', passWord: '', rePassWord: '', email: '' }
const ctx: States = { form: formObj, setForm: null }
const Context = createContext(ctx);

const MInput = (props: any) => {
    const { name, ...others } = props;
    const { form, setForm } = useContext(Context);
    /**
     * 异步访问事件属性，需在事件上调用【persist】方法。
     * 此方法会从池中移除合成事件，允许用户代码保留对事件的引用。
     * tips：不添加该方法会导致 onChange时，event为空。
     */
    const inputValueChange = (e: any) => {
        e.persist()
        const newForm = { ...form, [e.target.name]: e.target.value };
        setForm(newForm)
    }
    let propObj = {
        allowClear: true,
        name,
        maxLength: 20,
        placeholder: `fill in your ${name}`,
        addonBefore: <span style={{ display: 'inline-block', width: '70px' }}>{name}: </span>,
        onChange: inputValueChange,
    }
    switch (others.type) {
        case 'password':
            return (
                <Input.Password
                    visibilityToggle={true}
                    {...propObj}
                    {...others} />
            )
        case 'textarea':
            return (
                <Input.TextArea
                    {...propObj}
                    {...others} />
            )
        case 'search':
            return (
                <Input.Search
                    {...propObj}
                    {...others} />
            )
        case 'group':
            return (
                <Input.Group
                    {...propObj}
                    {...others} />
            )
        default:
            return (
                <Input
                    {...propObj}
                    {...others} />
            )
    }

}

const useForm = () => {
    const history = useHistory();
    const location = useLocation();
    const [flag, setFlag] = useState(false);
    const { form } = useContext(Context);
    const { from } = location.state as LocationStateParam || { from: { pathname: '/login' } };
    const { userName, passWord } = form;
    const $Login = () => {
        $.login({ userName, passWord }).then((data: any) => {
            if (data.status) {
                local.set('token', data.token)
                local.set('userInfo', data.userInfo)
                message.info(data.msg, () => {
                    setFlag(false)
                    history.replace(from)
                })
            } else {
                message.warn(data.msg)
            }
        }).catch((err) => {
            message.error('登录失败·请重新尝试')
            setFlag(false)
        })
    }
    return {form, flag, setFlag, $Login}
}

const LoginForm = () => {
    const {form, flag, setFlag, $Login} = useForm();
    const submit = () => {
        console.log('LoginForm: ', form)
        if (flag) {
            message.warn('正在登录·稍后再试')
            return
        }
        setFlag(true)
        $Login();
    }
    return (
        <div className={css.form}>
            <MInput name='userName' prefix={<UserOutlined className={css.formItemIcon} />} />
            <MInput name='passWord' type='password' />
            <Button type='primary' onClick={submit}>登录</Button>
        </div>
    )
}

const RegisterForm = () => {
    const {form, flag, setFlag, $Login} = useForm();
    const submit = () => {
        console.log('RegisterForm: ', form)
        if (flag) { message.warn('正在注册·稍后再试'); return }
        if (form.passWord !== form.rePassWord) { message.warn('请确认您的密码是否一致', 2); return }
        setFlag(true)
        $.register(form).then((data: any) => {
            if (data) {
                message.info(data.msg, () => { // 注册成功后自动登录
                    $Login()
                })
            }
        }).catch((err) => {
            message.error('注册失败·请重新尝试')
            setFlag(false)
        })
    }
    const emailSuffix = (
        <Select defaultValue='.com' >
            {
                ['.com', '.cn', '.jp', '.org'].map((val, index) => <Option key={index} value={val}>{val}</Option>)
            }
        </Select>
    )

    return (
        <div className={css.form} key='register'>
            <MInput name='userName' prefix={<UserOutlined className={css.formItemIcon} />} />
            <MInput name='email' addonAfter={emailSuffix} />
            <MInput name='passWord' type='password' />
            <MInput name='rePassWord' type='password' />
            <Button type='primary' onClick={submit}>注册</Button>
        </div>
    )
}

export default (props: any) => {

    const [form, setForm] = useState(formObj);
    const [formType, setFormType] = useState('login');
    const initForm = () => setForm(formObj);

    useEffect(() => { // 本地储存有 token & token未过期，直接跳转到 admin
        if (local.get('token')) {
            props.history.push('/admin')
        }
    })

    const toggleSubmit = () => { // 登录注册表单切换 & 初始化 form数据
        formType === 'login' ? setFormType('register') : setFormType('login')
        initForm()
    }

    return (
        <Context.Provider value={{ form, setForm }}>
            <div id={css.login} >
                {/* 路由跳转提示 */}
                <Prompt
                    when={true}
                    message={location => `Are you sure you want to login this account of ${form.userName}?`}
                />
                <header className={css.login}>
                    <img src={logo} alt="图片加载失败" className={css.logo} />
                    <h1>管理系统</h1>
                </header>
                <div className={css.loginform}>
                    {
                        formType === 'login' ? <LoginForm /> : <RegisterForm />
                    }
                    <div className={css.toggleform} onClick={toggleSubmit} >
                        前往<span style={{ color: '#1890ff', textDecoration: 'underline', cursor: 'pointer' }}>{formType === 'login' ? '注册' : '登录'}</span>
                    </div>
                </div>
            </div>
        </Context.Provider>
    )
}


// const LoginForm = ({submitType, form, changeForm, submit}:any) => {
//     if (submitType && submitType === 'login') {
//         return (
//             <div className={css.form} key='login'>
//                 <label><span>用户名: </span><input type="text" value={form.userName} onChange={e => { changeForm(e, 'userName') }} /></label>
//                 <label><span>密 码:</span><input type="password" value={form.passWord} onChange={e => { changeForm(e, 'passWord') }} /></label>
//                 <Button type='primary' onClick={submit}>登录</Button>
//             </div>
//         )
//     } else {
//         return (
//             <div className={css.form} key='register'>
//                 <label><span>用户名: </span><input type="text" value={form.userName} onChange={e => { changeForm(e, 'userName') }} /></label>
//                 <label><span>邮 箱:</span><input type="password" value={form.email} onChange={e => { changeForm(e, 'email') }} /></label>
//                 <label><span>密 码:</span><input type="password" value={form.passWord} onChange={e => { changeForm(e, 'passWord') }} /></label>
//                 <label><span>密码确认:</span><input type="password" value={form.rePassWord} onChange={e => { changeForm(e, 'rePassWord') }} /></label>
//                 <Button type='primary' onClick={submit}>注册</Button>
//             </div>
//         )
//     }
// }

// const changeForm = (e: any, type: string) => { // 获取用户名 & 密码
//     /**
//      * 异步访问事件属性，需在事件上调用【persist】方法。
//      * 此方法会从池中移除合成事件，允许用户代码保留对事件的引用。
//      * tips：不添加该方法会导致 onChange时，event为空。
//      */
//     e.persist()
//     setForm((form): Forms => {
//         let newForm: Forms = { ...form }, value = e.target.value;
//         switch (type) {
//             case 'userName':
//                 newForm.userName = value
//                 break;
//             case 'passWord':
//                 newForm.passWord = value
//                 break;
//             case 'rePassWord':
//                 newForm.rePassWord = value
//                 break;
//             case 'email':
//                 newForm.email = value
//                 break;
//             default:
//                 break;
//         }
//         // console.log('Form >>', newForm)
//         return newForm
//     })
// }
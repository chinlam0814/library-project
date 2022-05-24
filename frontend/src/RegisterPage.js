import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import api from './Components/Api'
import Cookies from 'js-cookie'

const RegisterPage = () => {
    const navigate = useNavigate()
    const [username,setUsername] = useState([])
    const [password, setPassword] = useState([])
    const [number, setNumber] = useState([])
    const [address, setAddress] = useState([])
    const [errorMessage,setErrorMessage] = useState("")
    const [registerType, setRegisterType] = useState('customer')


    const createUser = async (e) => {
        e.preventDefault()
        console.log(username + " " + password + " " + number)
        //console.log(username + " " + password + " " + phoneNum + " " + address)

        var data
        data = await api.createAdmin(username, password, number)
        console.log(data)
        //navigate('/')
    }

    return (
        <div className='register'>

            <div className='register-whole-box'>
                <form className='register-box' onSubmit={createUser}>
                    <h1 className='register-form-head'>注册</h1>

                    <div className='register-form'>
                        <input
                            onChange={event => setUsername(event.target.value)}
                            type='username'
                            placeholder='输入用户名'/>
                    </div>

                    <div className='register-form'>
                        <input
                            onChange={event => setPassword(event.target.value)}
                            type='password'
                            placeholder='输入密码'/>
                    </div>

                    <div className='register-form'>
                        <input
                            onChange={event => setNumber(event.target.value)}
                            type='text'
                            placeholder='输入学号'/>
                    </div>

                    <div className='register-button-submit-box'>
                        <button onSubmit={createUser} type='submit' className='register-button-submit'>提交</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage
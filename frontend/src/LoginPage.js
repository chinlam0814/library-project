import {useState, useEffect} from 'react'
import api from './Components/Api'
import Cookies from 'js-cookie'
import {Link, useNavigate} from 'react-router-dom'
import './LoginPage.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const LoginPage = () => {
    const [studentList, setStudentList] = useState([])
    const [username, setUsername] = useState([])
    const [password, setPassword] = useState([])
    const [idNumber, setIdNumber] = useState([])
    const navigate = useNavigate()

    const loginAction = async(e) => {
        e.preventDefault()
        console.log(username + password)
        const data = await api.login(username, password)
        console.log(data)
        console.log(Cookies.get('user'))

        if (data.errorCode === 404) {
            console.log(data)
            message.error('输入的用户不存在/密码错误！')
        }
        else {
            if (Cookies.get('user') === 'Student') {
                message.success('登陆成功！')
                navigate('/')
            } else if (Cookies.get('user') === 'Admin') {
                message.success('登陆成功！')
                navigate('/')
            } 
        }
    }

    const formItemLayout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 10 },
    };

    return (
        <div className='login'>

            <Header />

                <div className='login-form-design'>
                <h1>登陆</h1>

                    <br />
                    <br />

                    <Form {...formItemLayout}>
                        <Form.Item
                            label="学生/管理员姓名"
                            name="username"
                            rules={[{ required: true, message: '请输入学生/管理员姓名' }]}
                        >
                            <Input 
                                prefix={<UserOutlined />}
                                onChange={event => setUsername(event.target.value)}
                                placeholder="请输入学生/管理员姓名"/>
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{ required: true, message: '请输入密码' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                onChange={event => setPassword(event.target.value)}
                                placeholder="请输入密码"/>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
                            <Button type="primary" onClick={loginAction}>
                            登陆
                            </Button>

                            <Link className='user-forget-password-link' to='/forgetpassword'>
                                <button className='forget-button'>忘记密码？</button>
                            </Link>
                        </Form.Item>
                    </Form>   
                </div>
            <Footer />
        </div>
    )

}

export default LoginPage
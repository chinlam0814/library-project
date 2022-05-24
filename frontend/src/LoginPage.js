import {useState, useEffect} from 'react'
import api from './Components/Api'
import Cookies from 'js-cookie'
import {Link, useNavigate} from 'react-router-dom'
import './LoginPage.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { Form, Input, Button, Checkbox } from 'antd';
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
        console.log(Cookies.get('user'))

        if (data.errorCode === 403) {
            console.log(data)
            setPassword('')
            console.log('wrong password or username')
        } else if (data.errorCode === 404) {
            console.log(data)
            setPassword('')
            console.log('user not exist')
        }
        else {
            if (Cookies.get('user') === 'Student') {
                navigate('/')
            } else if (Cookies.get('user') === 'Admin') {
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
                                onChange={event => setUsername(event.target.value)}
                                placeholder="请输入学生/管理员姓名"/>
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{ required: true, message: '请输入密码' }]}
                        >
                            <Input.Password 
                                onChange={event => setPassword(event.target.value)}
                                placeholder="请输入密码"/>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
                            <Button type="primary" onClick={loginAction}>
                            登陆
                            </Button>
                        </Form.Item>
                    </Form>
                    
                </div>
            <Footer />
        </div>
    )

}

export default LoginPage
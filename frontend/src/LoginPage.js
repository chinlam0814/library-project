import {useState, useEffect} from 'react'
import api from './Components/Api'
import Cookies from 'js-cookie'
import {Link, useNavigate} from 'react-router-dom'
import './LoginPage.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { Form, Input, Button, message, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined, InfoCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const { Text} = Typography;

const LoginPage = () => {
    const [studentList, setStudentList] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [idNumber, setIdNumber] = useState([])
    const navigate = useNavigate()

    const forgetAction = async() => {
        navigate('/forgetpassword')
    }

    const loginAction = async(e) => {
        e.preventDefault()
        console.log(username + password)
        const data = await api.login(username, password)
        console.log(data)
        console.log(Cookies.get('user'))

        if(username.length === 0){
            message.error('请输入学生/管理员姓名！')
        }
        else if(password.length === 0){
            message.error('请输入密码！')
        }
        else{
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
    }

    const formItemLayout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 10 },
    };

    return (
        <div className='login'>

            <Header />

                <div className='warn-text-whole-box'>
                <Card style={{ width: 300 }} className='warn-text-box'>
                        <Text type='danger' level={3}>注意事项：</Text>
                        <br />
                        <br />
                        <Text>初始登陆的密码为学号/管理员号，登陆后请对密码进行修改！</Text>
                </Card> 
                </div>

                <div className='login-form-design'>
                <h1 className='login-text-box'>登陆</h1>
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

                            <Button type="link" danger className='user-forget-password-link' onClick={forgetAction}>
                            忘记密码？
                            </Button>

                        </Form.Item>
                    </Form>  
                </div>
            <Footer />
        </div>
    )

}

export default LoginPage
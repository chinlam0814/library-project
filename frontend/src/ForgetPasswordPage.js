import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import api from './Components/Api'
import Cookies from 'js-cookie'
import Footer from './Components/Footer'
import Header from './Components/Header'
import './ForgetPasswordPage.css'
import { UserOutlined, LockOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { Form, Input, Button, Select, message } from 'antd';

const { Option } = Select;

const ForgetPasswordPage = () => {
    const navigate = useNavigate()
    const [type, setType] = useState([])
    const [number, setNumber] = useState([])
    const [password, setPassword] = useState([])
    const [password1, setPassword1] = useState([])

    const forgetPasswordAction = async(e) => {
        e.preventDefault()
        console.log(number + ' ' + password + ' ' + password1 + ' ' + type)

        if(number.length === 0){
            message.warning('请输入学号/管理员号！');
        }
        else if(password.length === 0){
            message.warning('请输入新密码！');
        }
        else if(password1.length === 0){
            message.warning('请输入确认密码！');
        }
        else if(type.length === 0){
            message.warning('请选择用户类型！');
        }
        else if(password !== password1){
            message.warning('新密码和确认密码不一致！');
        }
        else{
            if(type === 'Admin'){
                var data
                data = await api.forgetPasswordAdmin(number, password)
                console.log(data)
                if(data.errorCode === 404){
                    message.warning('输入的学号/管理员号不存在');
                }
                else{
                    message.success('修改密码成功!')
                    navigate('/login')
                }
            }
            else{
                var data
                data = await api.forgetPasswordStudent(number, password)
                console.log(data)
                if(data.errorCode === 404){
                    message.warning('输入的学号/管理员号不存在');
                }
                else{
                    message.success('修改密码成功!')
                    navigate('/login')
                } 
            }
        }
    }

    const backAction = () => {
        navigate('/login')
    }

    const handleChange = (value) => {
        setType(value)
        console.log(type)
    };

    const formItemLayout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 10 },
    };

    return(
        <div>
            <Header />
            
            <div className='form-design'>
                <h1>添加用户</h1>
                
                <br />
                
                <Form {...formItemLayout}>
                    <Form.Item
                        label="学号/管理员号"
                        name="number"
                        rules={[{ required: true, message: '请输入学号/管理员号' }]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            onChange={event => setNumber(event.target.value)}
                            placeholder="请输入学号/管理员号"/>
                    </Form.Item>

                    <Form.Item
                        label="新密码"
                        name="password"
                        rules={[{ required: true, message: '请输入新密码' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            onChange={event => setPassword(event.target.value)}
                            placeholder="请输入新密码"/>
                    </Form.Item>

                    <Form.Item
                        label="确认密码"
                        name="password1"
                        rules={[{ required: true, message: '请输入确认密码' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            onChange={event => setPassword1(event.target.value)}
                            placeholder="请输入确认密码"/>
                    </Form.Item>
                        
                    <Form.Item
                        name="select"
                        label="用户类型"
                        hasFeedback
                        rules={[{ required: true, message: '请选择用户类型' }]}
                    >
                        <Select
                            onChange={handleChange}
                            placeholder="请选择用户类型">
                                <Option value="Admin">管理员</Option>
                                <Option value="Student">学生</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 12, offset: 3 }}>
                        <Button type="primary" className='confirm-forget-button' htmlType="submit" onClick={forgetPasswordAction}>
                        确认
                        </Button>
                        <Button type="primary" htmlType="submit" onClick={backAction} danger>
                        取消
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            <Footer />
        </div>
    )

}

export default ForgetPasswordPage
import {useState, useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import api from './Components/Api'
import Footer from './Components/Footer'
import Header from './Components/Header'
import './EditUserPage.css'
import { Card, Button, Typography, Form, Input, message } from 'antd';

const { Text} = Typography;

const EditUserPage = () => {
    let {userId, type} = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState([])
    const [name, setName] = useState([])
    const [username, setUsername] = useState([])

    const formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 10 },
    };

    const backAction = async() => {
        navigate('/users')
    }

    const editAction = async(username, name) => {
        if(type ==='admin'){
            if(username.length === 0){
                message.error('新管理员号不为空！')
            }
            else if(username.length < 8){
                message.error('新管理员号位数需为8！')
            }
            else if(username.indexOf(' ') !== -1){
                message.error('新管理员号不能含有空格！')
            }
            else if(name.length === 0){
                message.error('新管理员姓名不能为空！')
            }
            else if(name.indexOf(' ') !== -1){
                message.error('新管理员姓名不能含有空格！')
            }
            else{
                const data = await api.editAdmin(userId, name, username)
                console.log(data)
                if(data.errorCode === 0){
                    message.success('修改成功！')
                }
                navigate('/users')
            }
        }
        else{
            if(username.length === 0){
                message.error('新学号不为空！')
            }
            else if(username.length < 8){
                message.error('新学号位数需为8！')
            }
            else if(username.indexOf(' ') !== -1){
                message.error('新学号不能含有空格！')
            }
            else if(name.length === 0){
                message.error('新学生姓名不能为空！')
            }
            else if(name.indexOf(' ') !== -1){
                message.error('新学生姓名不能含有空格！')
            }
            else{
                const data = await api.editStudent(userId, name, username)
                console.log(data)
                if(data.errorCode === 0){
                    message.success('修改成功！')
                }
                navigate('/users')
            }
        }
    };

    const fetchUser = async() => {
        if(type === 'student'){
            const data = await api.getStudent(userId)
            console.log(data.data[0])
            return data.data[0]
        }
        else{
            const data = await api.getAdmin(userId)
            return data.data[0]
        }
    }

    useEffect(() => {
        const getUser = async() => {
            const userFromServer = await fetchUser()
            setUser(userFromServer)
        }

        getUser()
    }, [])

    if(type === 'admin'){
        return(
            <div>
                <Header />

                <div className='warn-text-whole-box'>
                    <Card style={{ width: 300 }} className='warn-text-box'>
                            <Text type='danger' level={3}>账号原信息：</Text>
                            <br />
                            <br />
                            <Text>学号：{user.username}</Text>
                            <br />
                            <Text>姓名：{user.name}</Text>
                    </Card> 
                </div>
    
                <div className='edit-user-box'>
                    <h1 className='edit-user-title'>编辑管理员信息</h1>


                    <br />

                    <Form {...formItemLayout}>
                        <Form.Item
                            label="管理员号"
                            name="username"
                            rules={[{ required: true, message: '请输入新管理员号' }]}
                        >
                            <Input 
                            //defaultValue={number}
                            onChange={event => setUsername(event.target.value)}
                            placeholder="请输入新管理员号"
                            />
                        </Form.Item>
    
                        <Form.Item
                            label="管理员姓名"
                            name="name"
                            rules={[{ required: true, message: '请输入新管理员姓名' }]}
                        >
                            <Input 
                                //defaultValue={username}
                                onChange={event => setName(event.target.value)}
                                placeholder="请输入新管理员姓名"
                            />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{ offset: 5, span: 16 }}
                            name="edit-button"
                        >
                            <Button className='edit-user-button' type='primary' onClick={() => editAction(username, name)}>编辑</Button>
                            <Button type='primary' danger onClick={backAction}>取消</Button>
                        </Form.Item>

                    </Form>
                </div>
    
                <Footer />
            </div>
        )
    }

    return(
        <div>
            <Header />

            <div className='warn-text-whole-box'>
                <Card style={{ width: 300 }} className='warn-text-box'>
                        <Text type='danger' level={3}>账号原信息：</Text>
                        <br />
                        <br />
                        <Text>学号：{user.username}</Text>
                        <br />
                        <Text>姓名：{user.name}</Text>
                </Card> 
            </div>

            <div className='edit-user-box'>
                <h1 className='edit-user-title'>编辑学生信息</h1>

                <br />

                <Form {...formItemLayout}>
                    <Form.Item
                        label="学号"
                        name="username"
                        rules={[{ required: true, message: '请输入新学号' }]}
                    >
                        <Input 
                        //defaultValue={number}
                        onChange={event => setUsername(event.target.value)}
                        placeholder="请输入新学号"
                        />
                    </Form.Item>

                    <Form.Item
                        label="学生姓名"
                        name="name"
                        rules={[{ required: true, message: '请输入新学生姓名' }]}
                    >
                        <Input 
                            //defaultValue={username}
                            onChange={event => setName(event.target.value)}
                            placeholder="请输入新学生姓名"
                        />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{ offset: 5, span: 16 }}
                        name="edit-button"
                    >
                        <Button className='edit-user-button' type='primary' onClick={() => editAction(username, name)}>编辑</Button>
                        <Button type='primary' danger onClick={backAction}>取消</Button>
                    </Form.Item>

                </Form>
            </div>

            <Footer />
        </div>
    )

}

export default EditUserPage
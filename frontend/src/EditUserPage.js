import {useState, useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import api from './Components/Api'
import Footer from './Components/Footer'
import Header from './Components/Header'
import './EditUserPage.css'
import { Descriptions, Radio, Button, Modal, Form, Input, message } from 'antd';

const EditUserPage = () => {
    let {userId, type} = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState([])
    const [number, setNumber] = useState([])
    const [username, setUsername] = useState([])

    const formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 10 },
    };

    const backAction = async() => {
        navigate('/users')
    }

    const editAction = async(number, username) => {
        if(type ==='admin'){
            console.log(number + ' ' + username)
            const data = await api.editAdmin(userId, number, username)
            console.log(data)
            if(data.errorCode === 0){
                message.success('修改成功！')
            }
            navigate('/users')
        }
        else{
            console.log(number + ' ' + username)
            const data = await api.editStudent(userId, number, username)
            console.log(data)
            if(data.errorCode === 0){
                message.success('修改成功！')
            }
            navigate('/users')
        }
    };

    const fetchUser = async() => {
        if(type === 'student'){
            const data = await api.getStudent(userId)
            console.log(data.data[0])
            setNumber(data.data[0].number)
            setUsername(data.data[0].username)
            return data.data[0]
        }
        else{
            const data = await api.getAdmin(userId)
            console.log(data.data[0])
            setNumber(data.data[0].number)
            setUsername(data.data[0].username)
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
    
                <div className='edit-user-box'>
                    <h1 className='edit-user-title'>编辑管理员信息</h1>

                    <Form {...formItemLayout}
                    initialValues={{
                        'number': user.number,
                        'username': user.username,
                    }}>
                        <Form.Item
                            label="管理员号"
                            name="number"
                            rules={[{ required: true, message: '请输入新管理员号' }]}
                        >
                            <Input 
                            //defaultValue={number}
                            onChange={event => setNumber(event.target.value)}
                            placeholder="请输入新管理员号"
                            />
                        </Form.Item>
    
                        <Form.Item
                            label="管理员姓名"
                            name="username"
                            rules={[{ required: true, message: '请输入新管理员姓名' }]}
                        >
                            <Input 
                                //defaultValue={username}
                                onChange={event => setUsername(event.target.value)}
                                placeholder="请输入新管理员姓名"
                            />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{ offset: 5, span: 16 }}
                            name="edit-button"
                        >
                            <Button className='edit-user-button' type='primary' onClick={() => editAction(number, username)}>编辑</Button>
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

            <div className='edit-user-box'>
                <h1 className='edit-user-title'>编辑学生信息</h1>

                <Form {...formItemLayout}
                initialValues={{
                    'number': user.number,
                    'username': user.username,
                }}>
                    <Form.Item
                        label="学号"
                        name="number"
                        rules={[{ required: true, message: '请输入新学号' }]}
                    >
                        <Input 
                        //defaultValue={number}
                        onChange={event => setNumber(event.target.value)}
                        placeholder="请输入新学号"
                        />
                    </Form.Item>

                    <Form.Item
                        label="学生姓名"
                        name="username"
                        rules={[{ required: true, message: '请输入新学生姓名' }]}
                    >
                        <Input 
                            //defaultValue={username}
                            onChange={event => setUsername(event.target.value)}
                            placeholder="请输入新学生姓名"
                        />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{ offset: 5, span: 16 }}
                        name="edit-button"
                    >
                        <Button className='edit-user-button' type='primary' onClick={() => editAction(number, username)}>编辑</Button>
                        <Button type='primary' danger onClick={backAction}>取消</Button>
                    </Form.Item>

                </Form>
            </div>

            <Footer />
        </div>
    )

}

export default EditUserPage
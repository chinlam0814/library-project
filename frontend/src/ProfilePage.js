import {useState, useEffect} from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import './ProfilePage.css'
import api from './Components/Api'
import Cookies from 'js-cookie'
import Footer from './Components/Footer'
import Header from './Components/Header'
import { Descriptions, Tooltip, Button, Modal, Form, Input, message } from 'antd';

const ProfilePage = () => {
    let id = Cookies.get('user_id')
    let loggedInType = Cookies.get('user')
    const navigate = useNavigate()
    const [isModalVisible, setIsModalVisible] = useState(false);

    var num;
    const [student, setStudent] = useState([])
    const [admin, setAdmin] = useState([])
    const [password, setPassword] = useState([])
    const [password1, setPassword1] = useState([])
    const [borrownum, setBorrownum] = useState([])

    const showModal = () => {
        setIsModalVisible(true);
    };
    
    const handleOk = () => {
        setIsModalVisible(false);
    };
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 10 },
    };

    const resetpasswordAction = async(e) => {
        e.preventDefault()
        console.log(password1 + ' ' +password)
        if(password.length === 0){
            message.error('请输入新密码')
        }
        else if(password.length < 8){
            message.error('密码位数至少为8！')
        }
        else if(password1.length === 0){
            message.error('请输入确认密码')
        }
        else if(password.indexOf(' ')!== -1){
            message.error('密码不能包含空格！')
        }
        else if(password1 === password){
            console.log(id)
            if(loggedInType === 'Student'){
                //const data = await api.resetPasswordStudent(id, username, password, number, borrow_num)
                //console.log(data)
                //setPassword('')
                //setPassword1('')
                console.log('student change password')
                const data = await api.resetPasswordStudent(id, password)
                Cookies.remove("user")
                Cookies.remove("username")
                Cookies.remove("user_id")
                navigate('/')
            }
            else{
                const data = await api.resetPasswordAdmin(id, password)
                //console.log(data)
                //setPassword('')
                //setPassword1('')
                console.log('admin change password')
                Cookies.remove("user")
                Cookies.remove("username")
                Cookies.remove("user_id")
                navigate('/')
            }
        }
        else{
            message.error('新密码和确认密码不一致')
        }
    }

    const fetchStudent = async() => {
        const data = await api.getStudent(id)
        console.log(data.data[0])
        return data.data[0]
    }

    const fetchBorrownum = async() => {
        if(loggedInType === 'Student'){
            const data = await api.getStudentBorrowStatusList(id)
            console.log(data.data[0])
            num = data.data.length
            console.log(num)
            return data.data
        }
    }

    useEffect(() => {
        const getStudent = async() => {
            const studentFromServer = await fetchStudent()
            setStudent(studentFromServer)
        }
        const getBorrownum = async() => {
            const borrownumFromServer = await fetchBorrownum()
            setBorrownum(borrownumFromServer)
        }

        getStudent()
        getBorrownum()
    }, [])

    const fetchAdmin = async() => {
        const data = await api.getAdmin(id)
        console.log(data.data[0])
        //setUsername(admin.username)
        //setNumber(admin.number)
        return data.data[0]
    }

    useEffect(() => {
        const getAdmin = async() => {
            const adminFromServer = await fetchAdmin()
            setAdmin(adminFromServer)
        }

        getAdmin()
    }, [])

    if(loggedInType === 'Admin'){
        return(
            <div>
                <Header />
                <div className='admin-profile-des-box'>
                    <Descriptions
                        bordered
                        title="管理员信息"
                    >
                        <Descriptions.Item label="管理员号" span={5}>{admin.number}</Descriptions.Item>
                        <Descriptions.Item label="姓名" span={5}>{admin.username}</Descriptions.Item>
                    </Descriptions>
                    <br />

                    <Button type="primary" onClick={showModal}>
                        修改密码
                    </Button>
                    <Modal title="修改密码" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
                        footer={[
                            <Button key="back" onClick={handleCancel} danger>
                            取消
                            </Button>,
                            <Button key="submit" type="primary" onClick={resetpasswordAction}>
                            修改
                            </Button>,
                      ]}>
                        <Form {...formItemLayout}>
                            <Form.Item
                                label="新密码"
                                name="password"
                                rules={[{ required: true, message: '请输入新密码' }]}
                            >
                                <Tooltip  placement="right" title='新密码位数至少为8，不能含有空格！'>
                                    <Input.Password 
                                        onChange={event => setPassword(event.target.value)}
                                        placeholder="请输入新密码"/>
                                </Tooltip>
                            </Form.Item>

                            <Form.Item
                                label="确认密码"
                                name="password1"
                                rules={[{ required: true, message: '请输入确认密码' }]}
                            >
                                <Tooltip placement="right" title='新密码与确认密码需一致！'>
                                    <Input.Password
                                        onChange={event => setPassword1(event.target.value)}
                                        placeholder="请输入确认密码"/>
                                </Tooltip>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
                <Footer/>
            </div>
        )
    }

    return(
        <div>
            <Header />
            <div className='student-profile-des-box'>
                <Descriptions
                    bordered
                    title="学生信息"
                >
                    <Descriptions.Item label="学生号" span={5}>{student.number}</Descriptions.Item>
                    <Descriptions.Item label="姓名" span={5}>{student.username}</Descriptions.Item>
                    <Descriptions.Item label="正在借阅书籍的数量" span={5}>{borrownum.length}</Descriptions.Item>
                </Descriptions>
                <br />

                <Button type="primary" onClick={showModal}>
                    修改密码
                </Button>
                <Modal title="修改密码" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={handleCancel} danger>
                        取消
                        </Button>,
                        <Button key="submit" type="primary" onClick={resetpasswordAction}>
                        修改
                        </Button>,
                  ]}>
                    <Form {...formItemLayout}>
                        <Form.Item
                            label="新密码"
                            name="password"
                            rules={[{ required: true, message: '请输入新密码' }]}
                        >
                            <Input.Password
                                onChange={event => setPassword(event.target.value)}
                                placeholder="请输入新密码"/>
                        </Form.Item>

                        <Form.Item
                            label="确认密码"
                            name="password1"
                            rules={[{ required: true, message: '请输入确认密码' }]}
                        >
                            <Input.Password
                                onChange={event => setPassword1(event.target.value)}
                                placeholder="请输入确认密码"/>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
            <Footer/>
        </div>
    )

}

export default ProfilePage
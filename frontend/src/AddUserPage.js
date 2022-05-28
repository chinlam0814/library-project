import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import api from './Components/Api'
import Cookies from 'js-cookie'
import Footer from './Components/Footer'
import Header from './Components/Header'
import { Form, Input, Card, Button, Select, message, Typography } from 'antd';
import './AddUserPage.css'

const { Text} = Typography;

const { Option } = Select;

const AddUserPage = () => {
    const [type, setType] = useState([])
    const [number, setNumber] = useState([])
    const [username, setUsername] = useState([])
    //const [password, setPassword] = useState([])

    const createAction = async(e) => {
        e.preventDefault()
        var password = number
        console.log(number + ' ' + username + ' ' + type + ' ' + password)

        if(number.length === 0){
            message.error('请输入学号/管理员号！')
        }
        else if(number.length < 8){
            message.error('学号/管理员号位数需为8！')
        }
        else if(number.indexOf(' ')!== -1){
            message.error('学号/管理员号不能包含空格！')
        }
        else if(username.length === 0){
            message.error('请输入学生/管理员！')
        }
        else if(username.indexOf(' ')!== -1){
            message.error('学生/管理员姓名不能包含空格！')
        }
        else if(type.length === 0){
            message.error('请选择创建用户类型！')
        }
        else{
            if(type === 'Admin'){
                var data
                data = await api.createAdmin(username, password, number)
                console.log(data)
                window.location.reload(false)
            }
            else{
                var data
                data = await api.createStudent(username, password, number)
                console.log(data)
                window.location.reload(false)
            }
        }
    }

    const handleChange = (value) => {
        setType(value)
        //console.log(type)
    };

    const formItemLayout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 14 },
    };

    return(
        <div>
            <Header />

            <div className='warn-text-whole-box'>
                <Card style={{ width: 300 }} className='warn-text-box'>
                        <Text type='danger' level={3}>注意事项：</Text>
                        <br />
                        <br />
                        <Text>创建用户时密码默认学号/管理员号</Text>
                </Card> 
            </div>
            
            <div className='form-design'>
                <h1>添加用户</h1>
                
                <br />
                <br />
                
                <Form {...formItemLayout}>
                    <Form.Item
                        label="学号/管理员号"
                        name="number"
                        rules={[{ required: true, message: '请输入学号/管理员号' }]}
                    >
                        <Input 
                            onChange={event => setNumber(event.target.value)}
                            placeholder="请输入学号/管理员号"/>
                    </Form.Item>

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
                        <Button type="primary" htmlType="submit" onClick={createAction}>
                        创建
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            <Footer />
        </div>
    )

}

export default AddUserPage
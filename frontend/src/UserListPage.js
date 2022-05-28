import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import api from './Components/Api'
import Cookies from 'js-cookie'
import Footer from './Components/Footer'
import Header from './Components/Header'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Modal, Button, Form, Input, message } from 'antd';
import './UserListPage.css'
import { Collapse } from 'antd';
const { Panel } = Collapse;

const UserListPage = () => {
    let listid = Cookies.get('user_id')
    const navigate = useNavigate()
    const [studentList, setStudentList] = useState([])
    const [adminList, setAdminList] = useState([])
    const [number, setNumber] = useState([])
    const [username, setUsername] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);

    const editAction = (userId, type) => {
        navigate(`/edit/${type}/${userId}`)
    };

    const fetchStudentList = async() => {
        const data = await api.getStudentList()
        console.log(data.data)
        return data.data
    }

    const fetchAdminList = async() => {
        const data = await api.getAdminList()
        console.log(data.data)
        return data.data
    }

    useEffect(() => {
        const getStudentList = async() => {
            const studentListFromServer = await fetchStudentList()
            setStudentList(studentListFromServer)
        }

        const getAdminList = async() => {
            const adminListFromServer = await fetchAdminList()
            setAdminList(adminListFromServer)
        }

        getStudentList()
        getAdminList()
    }, [])

    const deleteStudentAction = async(studentId) => {
        const data = await api.deleteStudent(studentId)
        console.log(data)
        window.location.reload(false)
    }

    const deleteAdminAction = async(adminId) => {
        const data = await api.deleteAdmin(adminId)
        console.log(data)
        //window.location.reload(false)
        if(data.errorCode === 403){
            message.error('不能删除自己的账号！')
        }
        else{
            window.location.reload(false)
        }
    }

    return(
        <div>
            <Header />
            <div className='table-list'>
                <div className='list-header'>
                    <h1>用户记录</h1>
                </div>
              
                <Collapse accordion>
                <Panel header="管理员列表" key="1">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">管理员号</TableCell>
                                        <TableCell align="center">姓名</TableCell>
                                        <TableCell align="center">操作</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {adminList.length > 0 ? adminList.map((adminlist, index) => (
                                        <TableRow
                                            key={listid}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell component="th" scope="row" align="center">
                                            {adminlist.number}
                                        </TableCell>
                                            <TableCell align="center">{adminlist.username}</TableCell>
                                            <TableCell align="center">
                                                <button className='delete-user-button' onClick={() => deleteAdminAction(adminlist.id)} >删除</button>
                                                <button className='update-user-button' onClick={() => editAction(adminlist.id, 'admin')} >编辑</button>
                                            </TableCell>
                                        </TableRow>
                                    )): <h2>暂无管理员用户记录</h2>}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Panel>
                    <Panel header="用户列表" key="2">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">学号</TableCell>
                                        <TableCell align="center">姓名</TableCell>
                                        <TableCell align="center">操作</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {studentList.length > 0 ? studentList.map((studentlist, index) => (
                                        <TableRow
                                            key={listid}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell component="th" scope="row" align="center">
                                            {studentlist.number}
                                        </TableCell>
                                            <TableCell align="center">{studentlist.username}</TableCell>
                                            <TableCell align="center">
                                                <button className='delete-user-button' onClick={() => deleteStudentAction(studentlist.id)} >删除</button>
                                                <button className='update-user-button' onClick={() => editAction(studentlist.id, 'student')} >编辑</button>
                                            </TableCell>
                                        </TableRow>
                                    )): <h2>暂无学生用户记录</h2>}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Panel>
                </Collapse>
            </div>
            <Footer />
        </div>
    )

}

export default UserListPage
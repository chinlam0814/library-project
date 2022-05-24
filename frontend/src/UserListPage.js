import React from 'react';
import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import api from './Components/Api'
import './UserListPage.css'
import Cookies from 'js-cookie'
import Footer from './Components/Footer'
import Header from './Components/Header'
import AddIcon from './Components/AddIcon.png'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Modal } from 'antd';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Collapse, Form, Input } from 'antd';

const { Panel } = Collapse;

const UserListPage = () => {
    let listid = Cookies.get('user_id')
    let flag = React.useState(true);
    const [studentList, setStudentList] = useState([])
    const [adminList, setAdminList] = useState([])
    const [number, setNumber] = useState([])
    const [username, setUsername] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const editAdminAction = async(admin_id, admin_number, admin_username) => {
        //console.log('testing')
        //console.log(admin_id + ' ' + admin_number + ' ' + admin_username)
        setNumber(admin_number)
        setUsername(admin_username)
        setIsModalVisible(true);
    };

    /*function editAdminAction(admin_id, admin_number, admin_username){
        console.log(admin_id + ' ' + admin_number + ' ' + admin_username)

        setOpen(true);
        console.log(open)

        return(
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }*/
    
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
        console.log(adminId)
        const data = await api.deleteAdmin(adminId)
        console.log(data)
        if(data['errorCode'] === 403){
            console.log('cannot delete own account')
        }
        else{
            window.location.reload(false)
        }
    }

    const updateAction = async() => {
        console.log('update user')
    }

    const formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 18 },
    };

    function AdminModel(admin_id, admin_number, admin_username){
        console.log(admin_id + ' ' + admin_number + ' ' + admin_username)
    }

    return(
        <div>
            <Header />
            <div className='table-list'>
                <div className='list-header'>
                    <h1>用户管理</h1>
                    <Link className='add-user-icon-link' to='/adduser'>
                        <img src = {AddIcon} className='add-icon' alt='add-user-icon' />
                    </Link>
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
                                                <Button color="error" onClick={() => deleteAdminAction(adminlist.id)} >删除</Button>
                                            </TableCell>
                                        </TableRow>
                                    )): <h2>暂无管理员用户记录</h2>}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Panel>
                    <Panel header="学生列表" key="2">
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
                                                <Button color="error" onClick={() => deleteStudentAction(studentlist.id)} >删除</Button>
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
import {useState, useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import api from './Components/Api'
import Cookies from 'js-cookie'
import moment from 'moment'
import Footer from './Components/Footer'
import Header from './Components/Header'
import './BorrowListPage.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { message, Button, Input } from 'antd';

const StudentBorrowListPage = () => {
    let {id} = useParams();
    const navigate = useNavigate()
    const [borrowList, setBorrowList] = useState([])

    const backAction = () => {
        navigate('/borrowlist')
    }

    const fetchBorrowList = async() => {
        const data = await api.getStudentBorrowListBySearch(id)
        console.log(data.data)
        return data.data
    }

    useEffect(() => {
        const getBorrowList = async() => {
            const borrowListFromServer = await fetchBorrowList()
            setBorrowList(borrowListFromServer)
        }

        getBorrowList()
    }, [])

    return(
        <div>
            <Header />
            <div className='table-list'>
                <h1>{id}的借阅记录</h1>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">姓名</TableCell>
                                <TableCell align="center">书名</TableCell>
                                <TableCell align="center">作者</TableCell>
                                <TableCell align="center">状态</TableCell>
                                <TableCell align="center">借书日期</TableCell>
                                <TableCell align="center">应还书日期</TableCell>
                                <TableCell align="center">还书日期</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {borrowList.length > 0 ? borrowList.map((borrowlist, index) => (
                                <TableRow
                                    key={id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">{borrowlist.student.name}</TableCell>
                                    <TableCell align="center">{borrowlist.bookinfo.title}</TableCell>
                                    <TableCell align="center">{borrowlist.bookinfo.author}</TableCell>
                                    <TableCell align="center">{borrowlist.status}</TableCell>
                                    <TableCell align="center">{borrowlist.borrow_date.substring(0, 10)}</TableCell>
                                    <TableCell align="center">{borrowlist.return_date.substring(0, 10)}</TableCell>
                                    {(borrowlist.returned_date === null)? <TableCell align="center">用户还未归还此书籍</TableCell> :<TableCell align="center">{borrowlist.returned_date.substring(0, 10)}</TableCell>}
                                </TableRow>
                            )): <h2>暂无{id}的借阅记录</h2>}
                        </TableBody>
                    </Table>
                </TableContainer>

                <br />

                <Button type="primary" htmlType="submit" onClick={backAction} danger>
                    返回
                </Button>
            </div>

            <Footer />
        </div>
    )
}

export default StudentBorrowListPage
import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
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
import { message, Button } from 'antd';

const BorrowListPage = () => {  
    let id = Cookies.get('user_id')
    let loggedInType = Cookies.get('user')
    let borrow_message = '还未归还此书籍'
    var today = moment().format();
    const navigate = useNavigate()
    const [borrowList, setBorrowList] = useState([])
    const [allBorrowList, setAllBorrowList] = useState([])
    const [different, setDifferent] = useState(0)

    const returnAction = async (borrow_id, return_date, bookId) => {
        if(moment(return_date.substring(0, 10)).isBefore(today.substring(0, 10))){
            const data = await api.editStudentBorrowStatus(borrow_id, '已逾期', bookId)
            console.log(data)
            if(data.errorCode === 0){
                message.warning('存在逾期，请缴纳逾期罚款！', 5)
                window.location.reload(false)
            }
            else{
                message.error('还书失败！')
            }
        }
        else{
            const data = await api.editStudentBorrowStatus(borrow_id, '已还书', bookId)
            console.log(data)
            window.location.reload(false)
        }
    }

    function CheckPaidAmount(return_date){
        setDifferent(moment(today.substring(0, 10)).diff(return_date.return_date, 'days'))
        console.log(different)
    }

    const paidAction = async (borrowId, return_date) => {
        console.log(different)
        navigate(`/payfines/${borrowId}/${different}/`)
    }

    const fetchBorrowList = async() => {
        const data = await api.getStudentBorrowList(id)
        console.log(data.data)
        return data.data
    }
    
    const fetchAllBorrowList = async() => {
        const data = await api.getAllBorrowList()
        console.log(data.data)
        return data.data
    }

    useEffect(() => {
        const getBorrowList = async() => {
            const borrowListFromServer = await fetchBorrowList()
            setBorrowList(borrowListFromServer)
        }

        const getAllBorrowList = async() => {
            const allBorrowListFromServer = await fetchAllBorrowList()
            setAllBorrowList(allBorrowListFromServer)
        }

        getAllBorrowList()
        getBorrowList()
    }, [])

    if(loggedInType === 'Admin'){
        return(
            <div>
                <Header />
                <div className='table-list'>
                    <h1>借阅记录</h1>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">学号</TableCell>
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
                                {allBorrowList.length > 0 ? allBorrowList.map((allborrowlist, index) => (
                                    <TableRow
                                        key={id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell component="th" scope="row" align="center">
                                        {allborrowlist.student.number}
                                    </TableCell>
                                        <TableCell align="center">{allborrowlist.student.username}</TableCell>
                                        <TableCell align="center">{allborrowlist.bookinfo.title}</TableCell>
                                        <TableCell align="center">{allborrowlist.bookinfo.author}</TableCell>
                                        <TableCell align="center">{allborrowlist.status}</TableCell>
                                        <TableCell align="center">{allborrowlist.borrow_date.substring(0, 10)}</TableCell>
                                        <TableCell align="center">{allborrowlist.return_date.substring(0, 10)}</TableCell>
                                        {(allborrowlist.returned_date === null)? <TableCell align="center">用户还未归还此书籍</TableCell> :<TableCell align="center">{allborrowlist.returned_date.substring(0, 10)}</TableCell>}
                                    </TableRow>
                                )): <h2>暂无借阅记录</h2>}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <Footer />
            </div>
        )
    }

    return(
        <div>
            <Header />
            <div className='table-list'>
                <h1>借阅记录</h1>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">书名</TableCell>
                                <TableCell align="center">作者</TableCell>
                                <TableCell align="center">状态</TableCell>
                                <TableCell align="center">借书日期</TableCell>
                                <TableCell align="center">应还书日期</TableCell>
                                <TableCell align="center">还书日期</TableCell>
                                <TableCell align="center">操作/备注</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {borrowList.length > 0 ? borrowList.map((borrowlist, index) => (
                                //<div>
                                    //<CheckPaidAmount return_date={borrowlist.returned_date}/>
                                    <TableRow
                                        key={id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell component="th" scope="row" align="center">
                                        {borrowlist.bookinfo.title}
                                    </TableCell>
                                    <TableCell align="center">{borrowlist.bookinfo.author}</TableCell>
                                    <TableCell align="center">{borrowlist.status}</TableCell>
                                    <TableCell align="center">{borrowlist.borrow_date.substring(0, 10)}</TableCell>
                                    <TableCell align="center">{borrowlist.return_date.substring(0, 10)}</TableCell>
                                    {(borrowlist.returned_date === null)? <TableCell align="center">{borrow_message}</TableCell> : <TableCell align="center">{borrowlist.returned_date.substring(0, 10)}</TableCell>}
                                    {(borrowlist.status === '已借书')? <TableCell align="center"><Button type='link' onClick={() => returnAction(borrowlist.id, borrowlist.return_date, borrowlist.bookinfo.id)} >还书</Button></TableCell> 
                                        : ((borrowlist.status === '已还书')? <TableCell align="center"></TableCell> 
                                            :((borrowlist.status === '已逾期')? <TableCell align="center">
                                                    <CheckPaidAmount return_date={borrowlist.return_date.substring(0, 10)}/>
                                                    <Button danger type='text' onClick={() => paidAction(borrowlist.id, borrowlist.return_date)}>点击付款</Button>
                                                </TableCell> 
                                                :((borrowlist.status === '逾期已付款')? <TableCell align="center">已完成逾期付款</TableCell> :<TableCell align="center"></TableCell>)))}
                                    </TableRow>
                                //</div>
                            )): <h2>暂无借阅记录</h2>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Footer />
        </div>
    )

}

export default BorrowListPage
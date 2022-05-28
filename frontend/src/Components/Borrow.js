import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import api from './Api'
import BorrowListPage from './BorrowListPage'

const Borrow = () => {
    let id = Cookies.get('user_id')
    const [borrowList, setBorrowList] = useState([])

    const fetchBorrowList = async() => {
        const data = await api.getStudentBorrowList(id)
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

    return (
        <div className='borrow-list-box'>
            {borrowList.length > 0 ? borrowList.map((borrowlist, index) => (
                //<h2>{bookList.length}</h2>
                <BorrowListPage key={index} 
                    studentId={id}
                    bookTitle={borrowlist.bookinfo.title} 
                    bookAuthor={borrowlist.bookinfo.author} 
                    status={borrowlist.status}
                    borrow_date={borrowlist.borrow_date} 
                    return_date={borrowlist.return_date} 
                    returned_date={borrowlist.returned_date} 
                />
            )): <h2>暂无书籍</h2>}
        </div>
   )
}

export default Borrow
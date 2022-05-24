import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import api from './Api'
import BookImage from './BookImage'
import ImageList from '@mui/material/ImageList';
import { Card } from 'antd';
const { Meta } = Card;

const Book = () => {
    const [bookList, setBookList] = useState([])

    const fetchBookList = async() => {
        const data = await api.getBookList()
        console.log(data.data)
        return data.data
    } 

    useEffect(() => {
        const getBookList = async() => {
            const bookListFromServer = await fetchBookList()
            setBookList(bookListFromServer)
        }

        getBookList()
    }, [])

    return (
        <div className='order-statuslist-box'>
            {bookList.length > 0 ? bookList.map((booklist, index) => (
                //<h2>{bookList.length}</h2>
                <BookImage key={index} bookId={booklist.id} />
            )): <h2>暂无书籍</h2>}
        </div>
   )

   /*return(
       <div className='book-list-whole-box'>
           <ImageList sx={{ width: 500, height: 450 }}>
            {bookList.length > 0 ? bookList.map((booklist, index) => (
                <BookImage key={index} bookId={booklist.id} />          
            )): <h2>暂无书籍</h2>}
           </ImageList>
       </div>
   )*/
}

export default Book
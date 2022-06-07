import {useState, useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import api from './Components/Api'
import Footer from './Components/Footer'
import Header from './Components/Header'
import BookImage from './Components/BookImage'
import './SearchPage.css'
import { Typography } from 'antd';
const { Text } = Typography;

const SearchPage = () => {
    let {searchword, type} = useParams();
    const [images, setImages] = useState([]);
    const [searchBook, setSearchBook] = useState([])

    const fetchSearchBook = async() => {
        console.log(searchword + ' ' + type)
        if(type === 'title'){
            const data = await api.getSearchBookByTitle(searchword)
            console.log(data.data.length)
            return data.data
        }
        else if(type === 'author'){
            const data = await api.getSearchBookByAuthor(searchword)
            console.log(data.data.length)
            return data.data
        }
        else{
            const data = await api.getSearchBookByType(searchword)
            console.log(data.data.length)
            return data.data
        }
    } 

    useEffect(() => {
        const getSearchBook = async() => {
            const searchBookFromServer = await fetchSearchBook()
            setSearchBook(searchBookFromServer)
        }

        getSearchBook()
    }, [])
     
    return (
        <div className='search-book-list-box'>
            <Header />

            {(type === 'title') ?<h2 className='search-title-box'>'{searchword}'相关书籍...</h2> : ((type === 'author')?<h2 className='search-title-box'>'{searchword}'相关作者的书籍...</h2>: <h2 className='search-title-box'>'{searchword}'相关类型的书籍...</h2>)}
            {searchBook.length > 0 ? searchBook.map((searchbook, index) => (
                <BookImage key={index} bookId={searchbook.id} />
            )): ((type === 'title')?<h3 className='no-search-des-box'>暂无相关书籍</h3> :((type === 'author')?<h3 className='no-search-des-box'>暂无相关作者的书籍</h3>: <h3 className='no-search-des-box'>暂无{searchword}类型的书籍</h3>))}
            
            <Footer />
        </div>
   )

}

export default SearchPage
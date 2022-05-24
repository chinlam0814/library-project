import * as React from 'react';
import ReactDOM from 'react-dom';
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import api from './Api'
import TitleIcon from './TitleIcon.png'
import AuthorIcon from './AuthorIcon.png'
import './BookImage.css'
import { Card, Tag, Divider } from 'antd';
const { Meta } = Card;

const BookImage = ({bookId}) => {
    const [image, setImages] = useState([])
    const [book, setBook] = useState([])

    const path = `/bookinfo/${bookId}`


    const fetchImages = async() => {
        const data = await api.getFirstBookImage(bookId)
        //console.log(data)
        if (data !== undefined) return data.errorCode === '404' ? (console.log('image not found')) : data.data[0]
    }

    const fetchBook = async() => {
        const data = await api.getBook(bookId)
        //console.log(data.data)
        return data.data[0]
    } 

    useEffect(() => {
        const getImages = async() => {
            const imageFromServer = await fetchImages()
            setImages(imageFromServer)
        }

        const getBook = async() => {
            const bookFromServer = await fetchBook()
            setBook(bookFromServer)
        }

        getImages()
        getBook()
    }, [])

    return(
        <div className='book-list-whole-box'>
            <Link className='bookinfo-link' to={path} >
                <Card
                    bordered
                    hoverable
                    style={{ width: 200 }}
                    cover={<img className='book-image' alt="book-image" src={image? image.image_url : '0'} />}
                >
                    
                    <div className='border-box'>
                        <hr />
                    </div>
                    
                    <div className='title-box'>
                        <Meta className='book-title' title={book.title} />
                    </div>
                
                    <div className='author-box'>
                        <Meta className='book-author' title={book.author} />
                    </div>
                </Card>
             </Link>
        </div>
    )
}

export default BookImage
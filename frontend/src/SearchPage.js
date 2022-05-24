import {useState, useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import api from './Components/Api'
import Cookies from 'js-cookie'
import Footer from './Components/Footer'
import Header from './Components/Header'

const SearchPage = () => {
    let {searchword} = useParams();
    const [images, setImages] = useState([]);
    const [book, setBook] = useState([])


    /*const fetchImages = async() => {
        const data = await api.getFirstBookImage(bookId)
        //console.log(data)
        if (data !== undefined) return data.errorCode === '404' ? (console.log('image not found')) : data.data[0]
    }*/

    const fetchBook = async() => {
        const data = await api.getSearchBook(searchword)
        console.log(data.data)
        return data.data
    } 

    useEffect(() => {
        /*const getImages = async() => {
            const imageFromServer = await fetchImages()
            setImages(imageFromServer)
        }*/

        const getBook = async() => {
            const bookFromServer = await fetchBook()
            setBook(bookFromServer)
        }

        //getImages()
        getBook()
    }, [])
     
    return(
        <div>
            <Header />
            <span>{searchword}</span>
            <Footer />
        </div>
    )

}

export default SearchPage
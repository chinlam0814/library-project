import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import api from './Components/Api'
import Cookies from 'js-cookie'
import Footer from './Components/Footer'
import Header from './Components/Header'
import Book from './Components/Book'
import './MainPage.css'

const MainPage = () => {

    return(
        <div>
            <Header />
            <Book />
            <Footer />
        </div>
    )

}

export default MainPage
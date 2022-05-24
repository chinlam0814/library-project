import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import api from './Components/Api'
import Cookies from 'js-cookie'
import Footer from './Components/Footer'
import Header from './Components/Header'
import Book from './Components/Book'

const MainPage = () => {
    let loggedInType = Cookies.get('user')

    if(loggedInType === 'Admin'){
        return(
            <div>
                <Header />
                <Book />
                <Footer />
            </div>
        )
    }
    else if(loggedInType === 'Student'){
        return(
            <div>
                <Header />
                <Book />
                <Footer />
            </div>
        )
    }

    return(
        <div>
            <Header />
            <Book />
            <Footer />
        </div>
    )

}

export default MainPage
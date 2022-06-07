import React from 'react';
import Cookies from 'js-cookie'
import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import moment from 'moment'
import api from './Components/Api'
import Footer from './Components/Footer'
import Header from './Components/Header'
import Book from './Components/Book'
import './MainPage.css'
import { Radio, Card } from 'antd';

const MainPage = () => {
    let id = Cookies.get('user_id')
    let loggedInType = Cookies.get('user')
    var today = moment().format();
    const [borrowList, setBorrowList] = useState([])
    const [different, setDifferent] = useState([])

    const fetchBorrowList = async() => {
        const data = await api.getStudentLatestBorrowList(id)
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

    if(loggedInType === 'Student' && borrowList.length > 0){
        return(
            <div>
                <Header />

                <div className='remind-list-box'>
                    <Card type='inner' title="还书提醒" style={{ width: 700 }}>
                        {borrowList.length > 0 ? borrowList.map((borrowlist, index) => (
                            <div className='remind-detail-box'>
                                <div className='remind-detail'>
                                    <div>
                                        <h3>《{borrowlist.bookinfo.title}》</h3>
                                        <h4>需还书日期：{borrowlist.return_date.substring(0, 10)}</h4>
                                    </div>

                                    <div className='remind-text-box'>
                                        <h4>距离还书还剩</h4>
                                        <h4 className='day-remind'>{moment(borrowlist.return_date.substring(0, 10)).diff(today.substring(0, 10), 'days')}</h4>
                                        <h4>天</h4>
                                    </div>
                                </div>

                                <hr />
                            </div>
                        )): console.log('no reminder')}
                    </Card>
                </div>

                <div className='book-list-design'>
                    <Book />
                </div>
    
                <Footer />
            </div>
        )
    }

    return(
        <div>
            <Header />

            <div className='book-list-design'>
                <Book />
            </div>

            <Footer />
        </div>
    )

}

export default MainPage
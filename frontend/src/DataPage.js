import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import api from './Components/Api'
import Cookies from 'js-cookie'
import Footer from './Components/Footer'
import Header from './Components/Header'
import './DataPage.css'

const DataPage = () => {
    const [dataList, setDataList] = useState([])

    const fetchDataList = async() => {
        const data = await api.getDataList()
        console.log(data.data)
        return data.data
    } 

    useEffect(() => {
        const getDataList = async() => {
            const dataListFromServer = await fetchDataList()
            setDataList(dataListFromServer)
        }

        getDataList()
    }, [])
    
    return (
        <div className='library-data-whole-box'>
            <Header />

            {dataList.length > 0 ? dataList.map((datalist, index) => (
                <div className='daily-data-box'>
                    <h5>日期：{datalist.date}</h5>
                    <h5>节约总数：{datalist.borrow_dailynum}</h5>
                    <h5>还书总数：{datalist.return_dailynum}</h5>
                    <h5>还款总数：{datalist.refund_amount}</h5>
                </div>
            )): <h2>暂无数据</h2>}

            <Footer />
        </div>
   )

}

export default DataPage
import {useState, useEffect} from 'react'
import {Link, Navigate, useNavigate, useParams} from 'react-router-dom'
import api from './Components/Api'
import Cookies from 'js-cookie'
import Footer from './Components/Footer'
import Header from './Components/Header'
import { Card, message, Button } from 'antd';
import './PayFinesPage.css'

const PayFinesPage = () => {
    let {borrowId, different} = useParams()
    const navigate = useNavigate()

    const payFinesAction = async () => {
        console.log(different)
        const data = await api.editStudentPaidStatus(borrowId, '逾期已付款')
        console.log(data)
        message.success('付款成功！')
        navigate(`/borrowlist`)
    }

    const backListAction = () => {
        //console.log('back')
        navigate('/borrowlist')
    }

    return(
        <div>
            <Header />
            
            <div className='fines-whole-box'>
                <h2>逾期详情</h2>

                <br />

                <div className='fines-details-box'>
                    <Card title ='逾期罚款'>
                        <h4>逾期天数：{different}天</h4>
                        <h4>逾期：{different * 0.5}元</h4>
                    </Card>
                </div>

                <br />
                <br />

                <div>
                    <Button className='pay-fines-button' type='primary' onClick={payFinesAction}>付款</Button>
                    <Button type='primary' danger onClick={backListAction}>取消</Button>
                </div>

                <br />
                <br />

            </div>
            
            <Footer />
        </div>
    )

}

export default PayFinesPage
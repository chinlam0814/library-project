import React, {Component, useState} from 'react'
import {Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import api from './Api'
import './Header.css'
import HomeIcon from './HomeIcon.png'
import LoginIcon from './LoginIcon.png'
import LogoutIcon from './LogoutIcon.png'
import UserIcon from './UserIcon.png'
import BookIcon from './BookIcon.png'
import AddBookIcon from './AddBookIcon.png'
import AddUserIcon from './AddUserIcon.png'
import UserListIcon from './UserListIcon.png'
import { Input, message, Tooltip, Select, Button, AutoComplete } from 'antd';

const { Option } = Select;

const { Search } = Input;

const Header = () => {
    const navigate = useNavigate()
    let loggedInType = Cookies.get('user')
    const [type, setType] = useState("title");
    const [value, setValue] = useState("");

    const options = [
        {
            value: '法律',
        },
        {
            value: '教育',
        },
        {
            value: '科技',
        },
        {
            value: '科学',
        },
        {
            value: '漫画',
        },
        {
            value: '体育',
        },
        {
            value: '文学',
        },
        {
            value: '小说',
        },
        {
            value: '艺术',
        },
        {
            value: '医学',
        },
        {
            value: '哲学',
        },
        {
            value: '参考书',
        },
        {
            value: '儿童读物',
        },
        {
            value: '外国历史',
        },
        {
            value: '外国文化',
        },
        {
            value: '休闲娱乐',
        },
        {
            value: '中国历史',
        },
        {
            value: '中国文化',
        },
        {
            value: '家具与园艺',
        },
        {
            value: '家庭与育儿',
        },
        {
            value: '旅游与自然',
        },
        {
            value: '商业与投资',
        },
        {
            value: '传记与自传',
        },
        {
            value: '计算机与网络',
        },
        {
            value: '宗教与精神生活',
        },
        {
            value: '其他',
        },
    ];

    const onSearch = (value) => {
        //console.log(value.length)

        if(value.length === 0){
            message.warning('请输入书名/作者！')
            console.log('null')
        }
        else if(value.indexOf(' ') !== -1){
            message.warning('输入的书名/作者不能含有空格！')
        }
        else{
            console.log(value)
            navigate(`/search/${type}/${value}`)
            window.location.reload(false)
        }
    }

    const onSearch1 = () => {
        if(value.length === 0){
            message.warning('请选择书籍类型！')
        }
        else{
            console.log(value)
            navigate(`/search/${type}/${value}`)
            window.location.reload(false)
        }
    }

    const onChange = (value) => {
        setValue(value)
    }

    const logoutAction = async(e) => {
        e.preventDefault()
        const data = await api.logout()

        if (data.errorCode === 403) {
            console.log('not logged in yet.')
            Cookies.remove("user")
			Cookies.remove("username")
			Cookies.remove("user_id")
        } else {
            message.loading('正在登出...', 1)
            .then(() => message.success('登出成功！', 2.5))
            navigate('/')
        }

        navigate('/')
    }

    const handleChange = (value) => {
        setType(value)
        console.log(type)
    };

    if(loggedInType === 'Student'){
        return(
            <div className = 'header-design'>
                
                <Link className='home-icon-link' to='/'>
                    <img src = {HomeIcon} className = 'homeicon' alt = 'home-icon' />
                </Link>

                <img src = {LogoutIcon} className = 'logouticon' alt = 'logout-icon' onClick = {logoutAction} />

                <Link className='user-icon-link' to='/profile'>
                    <img src = {UserIcon} className = 'usericon' alt = 'user-icon'/>
                </Link>

                <Link className='book-icon-link' to='/borrowlist'>
                    <img src = {BookIcon} className = 'bookicon' alt = 'book-icon'/>
                </Link>

                <div className='search-whole-box'>
                    <Select defaultValue="title" onChange={handleChange}>
                        <Option value="title">书名</Option>
                        <Option value="author">作者</Option>
                        <Option value="type">类型</Option>
                    </Select>   
                    {(type === "title" || type ==="author")?
                        <Input.Search
                            className='search-input'
                            placeholder="请输入书名/作者"
                            allowClear
                            enterButton="搜索"
                            size="medium"
                            onSearch={onSearch}
                        />:
                        <AutoComplete
                            options={options}
                        >
                            <Input.Search
                                className='search-input'
                                enterButton="搜索"
                                placeholder="请输入书籍类型"
                                allowClear
                                size="medium"
                                onSearch={onSearch}
                            />
                        </AutoComplete>
                    }
                </div>
    
                <div className = 'hr-design'>
                    <hr />
                </div>
    
            </div>
        )
    }
    else if(loggedInType === 'Admin'){
        return(
            <div className = 'header-design'>
                
                <Link className='home-icon-link' to='/'>
                    <img src = {HomeIcon} className = 'homeicon' alt = 'home-icon' />
                </Link>

                <img src = {LogoutIcon} className = 'logouticon' alt = 'logout-icon' onClick = {logoutAction} />

                <Link className='user-icon-link' to='/profile'>
                    <img src = {UserIcon} className = 'usericon' alt = 'user-icon'/>
                </Link>

                <Link className='book-icon-link' to='/borrowlist'>
                    <img src = {BookIcon} className = 'bookicon' alt = 'book-icon'/>
                </Link>

                <Link className='add-book-icon-link' to='/addbook'>
                    <img src = {AddBookIcon} className = 'addbookicon' alt = 'add-book-icon'/>
                </Link>

                <Link className='add-user-icon-link' to='/adduser'>
                    <img src = {AddUserIcon} className='add-icon' alt='add-user-icon' />
                </Link>

                <Link className='user-list-icon-link' to='/users'>
                    <img src = {UserListIcon} className = 'userlisticon' alt = 'user-list-icon'/>
                </Link>

                <div className='search-whole-box'>
                    <Select defaultValue="title" onChange={handleChange}>
                        <Option value="title">书名</Option>
                        <Option value="author">作者</Option>
                        <Option value="type">类型</Option>
                    </Select>   
                    {(type === "title" || type ==="author")?
                        <Input.Search
                            className='search-input'
                            placeholder="请输入书名/作者"
                            allowClear
                            enterButton="搜索"
                            size="medium"
                            onSearch={onSearch}
                        />:
                        <AutoComplete
                            options={options}
                        >
                            <Input.Search
                                className='search-input'
                                enterButton="搜索"
                                placeholder="请输入书籍类型"
                                allowClear
                                size="medium"
                                onSearch={onSearch}
                            />
                        </AutoComplete>
                    }
                </div>
    
                <div className = 'hr-design'>
                    <hr />
                </div>
    
            </div>
        )
    }

    return(
        <div className = 'header-design'>
            
            <Link className='home-icon-link' to='/'>
                <img src = {HomeIcon} className = 'homeicon' alt = 'home-icon' />
            </Link>

            <Link className='login-icon-link' to='/login'>
                <img src = {LoginIcon} className = 'loginicon' alt = 'login-icon' />
            </Link>

            <div className='search-whole-box'>
                    <Select defaultValue="title" onChange={handleChange}>
                        <Option value="title">书名</Option>
                        <Option value="author">作者</Option>
                        <Option value="type">类型</Option>
                    </Select>   
                    {(type === "title" || type ==="author")?
                        <Input.Search
                            className='search-input'
                            placeholder="请输入书名/作者"
                            allowClear
                            enterButton="搜索"
                            size="medium"
                            onSearch={onSearch}
                        />:
                        <AutoComplete
                            options={options}
                        >
                            <Input.Search
                                className='search-input'
                                enterButton="搜索"
                                placeholder="请输入书籍类型"
                                allowClear
                                size="medium"
                                onSearch={onSearch}
                            />
                        </AutoComplete>
                    }
            </div>

            <div className = 'hr-design'>
                <hr />
            </div>

        </div>
    )

}

export default Header
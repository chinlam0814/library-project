import React, {Component, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import api from './Api'
import './Header.css'
import HomeIcon from './HomeIcon.png'
import LoginIcon from './LoginIcon.png'
import LogoutIcon from './LogoutIcon.png'
import UserIcon from './UserIcon.png'
import BookIcon from './BookIcon.png'
import AddBookIcon from './AddBookIcon.png'
import DataIcon from './DataIcon.png'
import SearchIcon from './SearchIcon.png'
import UserListIcon from './UserListIcon.png'
import { Input, Space } from 'antd';

const { Search } = Input;

const Header = () => {
    const navigate = useNavigate()
    let loggedInType = Cookies.get('user')
    const [searchInput, setSearchInput] = useState("");

    const onSearch = (value) => {
        //console.log(value.length)

        if(value.length === 0){
            console.log('null')
        }
        else{
            console.log(value)
            navigate(`/search/${value}`)
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
      };

    const logoutAction = async(e) => {
        e.preventDefault()
        const data = await api.logout()

        if (data.errorCode === 403) {
            console.log('not logged in yet.')
            Cookies.remove("user")
			Cookies.remove("username")
			Cookies.remove("user_id")
        } else {
            navigate('/')
        }

        navigate('/')
    }

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
                    <Search
                        className='search-input'
                        placeholder="请输入书名/作者"
                        allowClear
                        enterButton="搜索"
                        size="medium"
                        onSearch={onSearch}
                    />
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

                <Link className='user-list-icon-link' to='/users'>
                    <img src = {UserListIcon} className = 'userlisticon' alt = 'user-list-icon'/>
                </Link>

                <div className='search-whole-box'>
                    <Search
                        className='search-input'
                        placeholder="请输入书名/作者"
                        allowClear
                        enterButton="搜索"
                        size="medium"
                        onSearch={onSearch}
                    />
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
                    <Search
                        className='search-input'
                        placeholder="请输入书名/作者"
                        allowClear
                        enterButton="搜索"
                        size="medium"
                        onSearch={onSearch}
                    />
            </div>

            <div className = 'hr-design'>
                <hr />
            </div>

        </div>
    )

}

export default Header
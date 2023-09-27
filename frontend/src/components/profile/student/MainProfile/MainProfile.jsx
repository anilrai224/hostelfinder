import React from 'react'
import './MainProfile.css'
import Nav from '../nav/Nav'
import Main from '../profilePage/main/Main'
import Account from '../profilePage/account/Account'
import {Route, Routes } from 'react-router-dom'
import Security from '../profilePage/security/Security'

const MainProfile = () => {
  return (
    <div className='main-profile'>
        <div className="container">
            <div className="main-profile-content">
                <Nav/>
                <Routes>
                    <Route path='profile' element={<Main/>}/>
                    <Route path='account' element={<Account/>}/>
                    <Route path='security' element={<Security/>}/>
                </Routes>
            </div>
        </div>
    </div>
  )
}

export default MainProfile
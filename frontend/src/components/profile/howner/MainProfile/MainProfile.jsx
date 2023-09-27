import React from 'react'
import './MainProfile'
import {Routes,Route} from 'react-router-dom'
import Nav from '../nav/Nav'
import Register from '../profilePage/register/Register'
import Main from '../profilePage/main/Main'
import Edit from '../profilePage/edit/Edit'

const MainProfile = () => {
  return (
    <div className='main-profile'>
        <div className="container">
            <div className="main-profile-content">
                <Nav/>
                <Routes>
                  <Route path='profile' element={<Main/>}/>
                  <Route path='RegisterHostel' element={<Register/>}/>
                  <Route path='edit' element={<Edit/>}/>
                </Routes>
            </div>
        </div>
    </div>
  )
}

export default MainProfile
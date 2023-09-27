import React from 'react'
import './Nav.css'
import { NavLink, useNavigate } from 'react-router-dom'
import {CgProfile} from 'react-icons/cg'
import {FiSettings} from 'react-icons/fi'
import {HiOutlineKey} from 'react-icons/hi'
import {MdOutlineLogout} from 'react-icons/md'

const Nav = () => {
  const navigate = useNavigate();
  const logout=()=>{
    localStorage.clear();
    navigate('/');
  }
  return (
    <div className='profile-nav'>
        <NavLink to='/student/profile' className='profile-navList'><CgProfile/><p>Profile</p></NavLink>
        <NavLink to='/student/account' className='profile-navList'><FiSettings/><p>Account Setting</p></NavLink>
        <NavLink to='/student/security' className='profile-navList'><HiOutlineKey/><p>Security</p></NavLink>
        <button onClick={logout} className='logout-btn profile-navList'><MdOutlineLogout/><p>Logout</p></button>
    </div>
  )
}

export default Nav
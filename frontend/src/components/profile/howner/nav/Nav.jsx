import React from 'react'
import './Nav.css'
import { NavLink } from 'react-router-dom'
import {CgProfile} from 'react-icons/cg'
import {PiClipboardTextLight} from 'react-icons/pi'
import {TbBrandBooking} from 'react-icons/tb'
import {MdOutlineLogout} from 'react-icons/md'

const showDropDown =()=>{
    const dropdown= document.querySelector('.profile-dropdown');
    dropdown.classList.toggle('shows');
}

const Nav = () => {
  return (
    <div className='hprofile-nav'>
        <NavLink onClick={showDropDown} to = '/howner' className='profile-navList'>
             <CgProfile className='icon'/><p>Owner</p>
        </NavLink>
        <div className="profile-dropdown">
            <NavLink className='drop-down-menu' to = '/howner/profile'>Profile</NavLink>
            <NavLink className='drop-down-menu' to = '/howner/edit'>Edit Profile</NavLink>
        </div>
        <NavLink to = '/howner/RegisterHostel' className='profile-navList'><PiClipboardTextLight className='icon'/>Registe Hostel</NavLink>
        <NavLink to = '/howner/Bookings' className='profile-navList'><TbBrandBooking className='icon'/>Bookings</NavLink>
        <button className="logout-btn profile-navList"><MdOutlineLogout className='icon'/>Logout</button>
    </div>
  )
}

export default Nav
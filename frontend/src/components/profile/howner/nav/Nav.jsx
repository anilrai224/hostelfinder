import React, { useContext } from 'react'
import './Nav.css'
import { NavLink, useNavigate } from 'react-router-dom'
import {CgProfile} from 'react-icons/cg'
import {PiClipboardTextLight} from 'react-icons/pi'
import {TbBrandBooking} from 'react-icons/tb'
import {MdOutlineLogout} from 'react-icons/md'
import { DetailContext } from '../../../detailProvider/DetailProvider'

const showDropDown =()=>{
    const dropdown= document.querySelector('.profile-dropdown');
    dropdown.classList.toggle('shows');
}
const Nav = () => {
  const {hostelReg} = useContext(DetailContext);
  const navigate = useNavigate();
  const logout=()=>{
     localStorage.clear();
     navigate('/');
  }
  return (
    <div className='hprofile-nav'>
        <NavLink onClick={showDropDown} to = '/howner' className='profile-navList'>
             <CgProfile className='icon'/><p>Owner</p>
        </NavLink>
        <div className="profile-dropdown">
            <NavLink className='drop-down-menu' to = '/howner/profile'>Profile</NavLink>
            <NavLink className='drop-down-menu' to = '/howner/edit'>Edit Profile</NavLink>
        </div>
        <NavLink to = '/howner/RegisterHostel' className='profile-navList'><PiClipboardTextLight className='icon'/><p>{!hostelReg?'Register Hostel':'Update Hostel'}</p></NavLink>
        <NavLink to = '/howner/Bookings' className='profile-navList'><TbBrandBooking className='icon'/><p>Bookings</p></NavLink>
        <button className="logout-btn profile-navList" onClick={logout}><MdOutlineLogout className='icon'/><p>Logout</p></button>
    </div>
  )
}

export default Nav
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import './Choice.css'
import { DetailContext } from '../detailProvider/DetailProvider'

const LoginChoice = () => {
  const {setLoggedInType} = useContext(DetailContext);
  const display=(e)=>{
    setLoggedInType(e.target.name);
  }
  return (
    <div className='choices'>
      <NavLink name="student" onClick={display} to='/login/student' className='choice'>as a Student</NavLink>
      <NavLink name="howner" onClick={display} to='/login/hostel' className='choice'>as a Hostel Owner</NavLink>
    </div>
  )
}

export default LoginChoice
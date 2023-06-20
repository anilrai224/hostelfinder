import React from 'react'
import { NavLink } from 'react-router-dom'
import './Choice.css'

const LoginChoice = () => {
  return (
    <div class='choices'>
      <NavLink to='/register/student' className='choice'>as a Student</NavLink>
      <NavLink to='/register/hostel' className='choice'>as a Hostel Owner</NavLink>
    </div>
  )
}

export default LoginChoice
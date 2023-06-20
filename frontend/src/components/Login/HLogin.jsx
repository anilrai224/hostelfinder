import React from 'react'
import { NavLink } from 'react-router-dom'
import './Login.css'

const SLogin = () => {
  return (
    <div className='login'>
      <form>
        <h1>Log <span>In</span></h1>
        <h5>don't you have an account? <NavLink className='register__option' to='/register/hostel'><span>SignUp</span></NavLink></h5>
        <label htmlFor="email">
          <p>Email</p>
          <input type="email" name="email" id="email" />
        </label>
        <label htmlFor="password">
          <p>Password</p>
          <input type="text" name="password" id="password" />
        </label>
        <label htmlFor="submit">
          <input type="submit" value="Log In" />
        </label>
      </form>
    </div>
  )
}

export default SLogin
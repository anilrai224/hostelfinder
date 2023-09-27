import React from 'react'
import {useNavigate } from 'react-router-dom'
import './LoginError.css'

const LoginError = () => {
  const navigate = useNavigate();
    const gotoLogin = (e)=>{
        e.preventDefault();
        navigate('/login')
    }
  return (
    <div className='notLogged'>
        <p>Please Login to Access this Feature</p>
        <button onClick={gotoLogin}>Login</button>
    </div>
  )
}

export default LoginError
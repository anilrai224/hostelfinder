import React, { useState } from 'react'
import './Register.css'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

const SRegister = () => {
  const [name,setName]= useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [phone,setPhone] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e)=>{
    e.preventDefault();
    axios
    .post('http://localhost:3001/register/student',{name,email,password,phone})
    .then(res=>{
      navigate('/login/hostel');
    })
    .catch(err=>console.log(err));
  }
  return (
    <div className='register'>
      <form onSubmit={handleSubmit}>
        <h1>Sign <span>Up</span></h1>
        <h5>Already Have account? <NavLink to='/login/hostel'><span>Login</span></NavLink></h5>
        <label htmlFor="name">
          <p>Name</p>
          <input type="text" onChange={e=>setName(e.target.value)} name="name" id="name" />
        </label>
        <label htmlFor="pnumber">
          <p>Phone Number</p>
          <input type="number" onChange={e=>setPhone(e.target.value)} name="pnumber" id="pnumber" />
        </label>
        <label htmlFor="email">
          <p>Email</p>
          <input type="email" onChange={e=>setEmail(e.target.value)} name="email" id="email" />
        </label>
        <label htmlFor="password">
          <p>Password</p>
          <input type="text" onChange={e=>setPassword(e.target.value)} name="password" id="password" />
        </label>
        <label htmlFor="cpassword">
          <p>Confirm Password</p>
          <input type="text" name="cpassword" id="cpassword" />
        </label>
        <label htmlFor="agreement" className='agreement'>
          <input type="checkbox" name="agreement" id="agreement" />
          <p>I agree to <span>Platfroms Terms</span> of Service and <span>Privacy Policy</span></p>
        </label>
        <label htmlFor="submit">
          <input type="submit" value="Create Account" />
        </label>
      </form>
    </div>
  )
}

export default SRegister
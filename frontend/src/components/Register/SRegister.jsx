import React, { useState } from 'react'
import './Register.css'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

const SRegister = () => {
  const [name,setName]= useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [phone,setPhone] = useState('');

  const [emailFocus,setEmailFocus] = useState(false);
  const [passFocus,setPassFocus] = useState(false);
  const [conPassFocus,setConPassFocus] = useState(false);
  const handleEmailFocus=()=>{
    setEmailFocus(true);
  }
  const handlePassFocus=()=>{
    setPassFocus(true);
  }
  const handleConPassFocus = ()=>{
    setConPassFocus(true);
  }

  const navigate = useNavigate();

  const handleSubmit = (e)=>{
    e.preventDefault();
    axios
    .post('http://localhost:3001/register/student',{name,email,password,phone})
    .then(res=>{
      navigate('/login/student');
    })
    .catch(err=>console.log(err));
  }
  return (
    <div className='register'>
      <form onSubmit={handleSubmit}>
        <h1>Sign <span>Up</span></h1>
        <h5>Already Have account? <NavLink to='/login/student' className='login__option'><span>Login</span></NavLink></h5>
        <label htmlFor="name">
          <p>Name</p>
          <input required type="text" onChange={e=>setName(e.target.value)} name="name" id="name" />
        </label>
        <label htmlFor="pnumber">
          <p>Phone Number</p>
          <input required type="number" onChange={e=>setPhone(e.target.value)} name="pnumber" id="pnumber" />
        </label>
        <label htmlFor="email">
          <p>Email</p>
          <input onBlur={handleEmailFocus} focused={emailFocus.toString()} required type="email" onChange={e=>setEmail(e.target.value)} name="email" id="email"  pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" />
          <span className='error'>Enter Valid Emai address</span>
        </label>
        <label htmlFor="password">
          <p>Password</p>
          <input onBlur={handlePassFocus} focused={passFocus.toString()} required type="text" onChange={e=>setPassword(e.target.value)} name="password" id="password" pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"/>
          <span className='error'>Minimum eight characters, at least one letter and one number</span>
        </label>
        <label htmlFor="cpassword">
          <p>Confirm Password</p>
          <input onBlur={handleConPassFocus} focused={conPassFocus.toString()} required type="text" name="cpassword" id="cpassword" pattern={password}/>
          <span className='error'>Password Doesn't Match</span>
        </label>
        <label htmlFor="agreement" className='agreement'>
          <input required type="checkbox" name="agreement" id="agreement" />
          <p>I agree to <span>Platfroms Terms</span> of Service and <span>Privacy Policy</span></p>
        </label>
        <label htmlFor="submit">
          <input required type="submit" value="Create Account" />
        </label>
      </form>
    </div>
  )
}

export default SRegister
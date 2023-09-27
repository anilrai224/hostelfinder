import React, { useState } from 'react'
import './Register.css'
import { NavLink, useNavigate } from 'react-router-dom'
import {AiFillEye} from 'react-icons/ai'
import {VscEyeClosed} from 'react-icons/vsc'
import axios from 'axios'
import Swal from 'sweetalert2'

const SRegister = () => {
  const [name,setName]= useState('');
  const [email,setEmail] = useState('');
  const [availableEmail,setEmailAvailable] = useState(true);
  const [password,setPassword] = useState('');
  const [phone,setPhone] = useState('');

  const [emailFocus,setEmailFocus] = useState(false);
  const [passFocus,setPassFocus] = useState(false);
  const [conPassFocus,setConPassFocus] = useState(false);

  const handleEmailFocus=()=>{
    setEmailFocus(true);
    checkEmailAvailability();
  }
  const checkEmailAvailability = ()=>{
    axios
    .post('http://localhost:3031/register/student/check-email',{email})
    .then(res=>{
      setEmailAvailable(res.data.isAvailable);
    })
    .catch(err=>console.log(err));
  }
  const handlePassFocus=()=>{
    setPassFocus(true);
  }
  const handleConPassFocus = ()=>{
    setConPassFocus(true);
  }
  const [showPassword,setShowPassword] = useState(true);
  const showPass = (e) =>{
    e.preventDefault();
    const input = document.querySelector('.inputpassword');
    if(showPassword){
      input.type="text";
      setShowPassword(false);
    }else{
      input.type="password";
      setShowPassword(true);
    }
  }
  const [showCPassword,setShowCPassword] = useState(true);
  const showCPass = (e)=>{
    e.preventDefault();
    const input = document.querySelector('.inputCpassword');
    if(showCPassword){
      input.type="text";
      setShowCPassword(false);
    }else{
      input.type="password";
      setShowCPassword(true);
    }
  }
  const navigate = useNavigate();

  const handleSubmit = (e)=>{
    e.preventDefault();
    axios
    .post('http://localhost:3031/register/student',{name,email,password,phone})
    .then(res=>{
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer:3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Registered Successfully.'
      })
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
              <input required maxLength="10" pattern="[0-9]*" onChange={e=>setPhone(e.target.value)} name="pnumber" id="pnumber" />
            </label>
            <label htmlFor="email">
              <p>Email</p>
              <input onBlur={handleEmailFocus} focused={emailFocus.toString()} required type="email" onChange={e=>setEmail(e.target.value)} name="email" id="email"  pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" />
              <span className='error'>Enter Valid Emai address</span>
              {!availableEmail && <span>Email Already Exist!</span>}
            </label>
            <label className='password' htmlFor="password">
              {showPassword
              ?<AiFillEye className='show-pass' onClick={showPass}/>:
               <VscEyeClosed className='show-pass' onClick={showPass}></VscEyeClosed>
              }
              <p>Password</p>
              <input onBlur={handlePassFocus} focused={passFocus.toString()} required type="password" onChange={e=>setPassword(e.target.value)} className='inputpassword' name="password" id="password" pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"/>
              <span className='error'>Minimum eight characters, at least one letter and one number</span>
            </label>
            <label className='Cpass' htmlFor="cpassword">
            {showCPassword
              ?<AiFillEye className='show-pass' onClick={showCPass}/>:
               <VscEyeClosed className='show-pass' onClick={showCPass}></VscEyeClosed>
              }
              <p>Confirm Password</p>
              <input className='inputCpassword' onBlur={handleConPassFocus} focused={conPassFocus.toString()} required type="password" name="cpassword" id="cpassword" pattern={password}/>
              <span className='error'>Password Doesn't Match</span>
            </label>           
        <label htmlFor="agreement" className='agreement'>
          <input required type="checkbox" name="agreement" id="agreement" />
          <p>I agree to <span>Platfroms Terms</span> of Service and <span>Privacy Policy</span></p>
        </label>
        {availableEmail && <label htmlFor="submit">
          <input required type="submit" value="Create Account" />
        </label>}
      </form>
    </div>
  )
}

export default SRegister
import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {DetailContext} from '../detailProvider/DetailProvider'
import './Login.css'
import {AiFillEye} from 'react-icons/ai'
import {VscEyeClosed} from 'react-icons/vsc'
import Swal from 'sweetalert2'
import axios from 'axios'

const SLogin = () => {
  const {setDetail,setIsLoggedIn} = useContext(DetailContext);
  const navigate = useNavigate();
  const [values,setValues]=useState({
    email:'',
    password:'',
  })
  const handleInput = (e)=>{
    setValues(prev=>({...prev,[e.target.name]:e.target.value}));
  }

  // const [password,setPassword] = useState();
  // const [email,setEmail] = useState();
  const handleSubmit = (e)=>{
    e.preventDefault();
    // console.log(email,password)
    axios.post("http://localhost:3031/login/hostel",values)
    .then(res=>{
      // console.log(res.data);
      if(res.data==='NotFound'){
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'error',
          title: 'Wrong Credentials!!'
        })
      }else{
        setDetail(res.data);
        setIsLoggedIn(true);
        const uid=res.data.id;
        localStorage.setItem('uid',uid);

        const expiryTime = new Date().getTime()+24*60*60*1000;
        localStorage.setItem('expiry',expiryTime);

        const loginStatus = 'true';
        localStorage.setItem('loginStatus',loginStatus);

        const logInType = 'howner';
        localStorage.setItem('logintype',logInType);
        
        navigate(`/${logInType}/profile`);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Logged In successfully'
        })
      }
    })
    .catch(err=>console.log(err))
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
  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <h1>Log <span>In</span></h1>
        <h5>don't you have an account? <NavLink className='register__option' to='/register/hostel'><span>SignUp</span></NavLink></h5>
        <label htmlFor="email">
          <p>Email</p>
          <input onChange={handleInput} type="email" name="email" id="email" />
        </label>
        <label htmlFor="password" className='password'>
        {showPassword
            ?<AiFillEye className='show-pass' onClick={showPass}/>:
             <VscEyeClosed className='show-pass' onClick={showPass}/>
          }
          <p>Password</p>
          <input onChange={handleInput} className='inputpassword' type="text" name="password" id="password" />
        </label>
        <label htmlFor="submit">
          <input type="submit" value="Log In" />
        </label>
      </form>
    </div>
  )
}

export default SLogin
import React,{useContext, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Login.css'
import { DetailContext } from '../detailProvider/DetailProvider'
import {AiFillEye} from 'react-icons/ai'
import {VscEyeClosed} from 'react-icons/vsc'
import Swal from 'sweetalert2'
import axios from 'axios'

const SLogin = () => {
  const {setDetail,setIsLoggedIn} = useContext(DetailContext); 

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const navigate = useNavigate();
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

  const handleSubmit = async(e)=>{
    e.preventDefault();
    axios
    .post('http://localhost:3031/login/student',{email,password})
    .then(res=>{
      if(res.data==="Invalid"){
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
          icon: 'error',
          title: 'Invalid Credentials!!!'
        })
      }else{
        setIsLoggedIn(true);
        setDetail(res.data);
        const uid=res.data.id;
        localStorage.setItem('uid',uid);

        const expiryTime = new Date().getTime()+24*3600*1000;
        localStorage.setItem('expiry',expiryTime);

        const loginStatus = 'true';
        localStorage.setItem('loginStatus',loginStatus);

        const logInType = 'student';
        localStorage.setItem('logintype',logInType);
        
        navigate('/');
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
          title: 'Logged In Successfully'
        })
      }
      
    })
    .catch(err=>console.log(err));
  }
  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <h1>Log <span>In</span></h1>
        <h5>don't you have an account? <NavLink className='register__option' to='/register/student'><span>SignUp</span></NavLink></h5>
        <label htmlFor="email">
          <p>Email</p>
        <input onChange={e=>setEmail(e.target.value)} type="email" name="Lemail" id="Lemail" />
        </label>
        <label className='password' htmlFor="password">
        {showPassword
            ?<AiFillEye className='show-pass' onClick={showPass}/>:
             <VscEyeClosed className='show-pass' onClick={showPass}/>
          }
          <p>Password</p>
          <input onChange={e=>setPassword(e.target.value)} type="password" className='inputpassword' name="Lpassword" id="Lpassword" />
        </label>
        <label htmlFor="submit">
          <input type="submit" value="Log In" />
        </label>
      </form>
    </div>
  )
}

export default SLogin
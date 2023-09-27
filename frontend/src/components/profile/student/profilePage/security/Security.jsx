import React, { useContext, useState } from 'react'
import {AiFillLock} from 'react-icons/ai'
import { DetailContext } from '../../../../detailProvider/DetailProvider'
import './Security.css'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Security = () => {
    const {detail,setDetail,setIsLoggedIn} = useContext(DetailContext);
    // const [password,setPassword] = useState();
    const [passFocus,setPassFocus] = useState(false);
    const [conPassFocus,setConPassFocus] = useState(false);

    const handlePassFocus=()=>{
        setPassFocus(true);
    }
    const handleConPassFocus = ()=>{
        setConPassFocus(true);
    }
    const [cpassword,setcPassword] = useState();
    const [npassword,setnPassword] = useState();
    const id=detail.id;
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        axios.post("http://localhost:3031/student/security",{cpassword,npassword,id})
        .then(res=>{
            console.log(res);
            setDetail(null);
            setIsLoggedIn(false);
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
                title: 'Password Changed successfully'
              })  
            navigate('/');
        })
        .catch(err=>console.log(err));
    }
  return (
    <div className='security'>
        <p>Security</p>
        <div className="security-body">
            <div className="lock-icon">
                <AiFillLock/>
            </div>
            <p>Change Password</p>
            <span>To change your password, please fill in the fields below.<br/> Your password must contain at least 8 characters, it<br/> must also include at least one upper case letter, one lower<br/> case letter, one number and one special character</span>
            <form onSubmit={handleSubmit}>
                <label htmlFor="cpassword">
                    <p>Current Password</p>
                    <input onChange={e=>setcPassword(e.target.value)} type="text" name="cpassword" id="cpassword" />
                </label>
                <label htmlFor="npassword">
                    <p>New Password</p>
                    <input onBlur={handlePassFocus} focused={passFocus.toString()} onChange={e=>setnPassword(e.target.value)}  pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" type="text" name="npassword" id="npassword" />
                    <span className='error'>Minimum eight characters, at least one letter and one number</span>
                </label>
                <label htmlFor="confirmpass">
                    <p>Confirm Password</p>
                    <input onBlur={handleConPassFocus} focused={conPassFocus.toString()} required type="text" name="confirmpass" id="confirmpass" pattern={npassword}/>
              <span className='error'>Password Doesn't Match</span>
                </label>
                <input type="submit" value="Change Password" />
            </form>
        </div>
    </div>
  )
}

export default Security
import React, { useContext, useState } from 'react'
import {AiFillLock} from 'react-icons/ai'
import { DetailContext } from '../../../../detailProvider/DetailProvider'
import './Security.css'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {AiFillEye} from 'react-icons/ai'
import {VscEyeClosed} from 'react-icons/vsc'

const Security = () => {
    const {detail,setDetail,setIsLoggedIn} = useContext(DetailContext);
    const [showNPassword,setShowNPassword] = useState(true);
    const [showCPassword,setShowCPassword] = useState(true);
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
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const id=detail.id;
        axios.post("http://localhost:3031/student/security",{cpassword,npassword,id})
        .then(res=>{
            // console.log(res);
            if(res.data===1){
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
                    title: `Current Password Doesn't match`
                })
            }else if (res.data ===0 ){
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
                localStorage.clear();
                navigate('/login/student');
            }
        })
        .catch(err=>console.log(err));
    }
    const showPass = (e) =>{
        e.preventDefault();
        const input = document.querySelector('.inputCPassword');
        if(showCPassword){
          input.type="text";
          setShowCPassword(false);
        }else{
          input.type="password";
          setShowCPassword(true);
        }
      }
    const showNPass = (e) =>{
        e.preventDefault();
        const input = document.querySelector('.inputNPassword');
        if(showNPassword){
          input.type="text";
          setShowNPassword(false);
        }else{
          input.type="password";
          setShowNPassword(true);
        }
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
                <label htmlFor="npassword" className='newpass'>
                    {showNPassword
                        ?<AiFillEye className='show-pass' onClick={showNPass}/>:
                        <VscEyeClosed className='show-pass' onClick={showNPass}></VscEyeClosed>
                    }
                    <p>New Password</p>
                    <input onBlur={handlePassFocus} focused={passFocus.toString()} onChange={e=>setnPassword(e.target.value)} className='inputNPassword'  pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" type="text" name="npassword" id="npassword" />
                    <span className='error'>Minimum eight characters, at least one letter and one number</span>
                </label>
                <label htmlFor="confirmpass" className='confirmpass'>
                    {showCPassword
                        ?<AiFillEye className='show-pass' onClick={showPass}/>:
                        <VscEyeClosed className='show-pass' onClick={showPass}></VscEyeClosed>
                    }
                    <p>Confirm Password</p>
                    <input onBlur={handleConPassFocus} focused={conPassFocus.toString()} required className='inputCPassword' type="text" name="confirmpass" id="confirmpass" pattern={npassword}/>
              <span className='error'>Password Doesn't Match</span>
                </label>
                <input type="submit" value="Change Password" />
            </form>
        </div>
    </div>
  )
}

export default Security
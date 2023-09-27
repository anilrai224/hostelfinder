import React,{createContext, useEffect, useState} from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';

export const DetailContext  = createContext(null);
export const DetailProvider = (props) => {

  const [loggedInType,setLoggedInType] = useState();
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [detail,setDetail] = useState();//for student

  // const [ownerDetail,setOwnerDetail] = useState();
  
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(()=>{
    const loginType = localStorage.logintype;
    const uid=localStorage.getItem('uid');
    if(loginType==='student'){
      axios.post('http://localhost:3031/user',{uid})
      .then(res=>{
        // console.log(res.data)
        setDetail(res.data);
        const loginStatus = localStorage.getItem('loginStatus');
        setIsLoggedIn(loginStatus);
        const logintype=localStorage.getItem('logintype');
        setLoggedInType(logintype)
      })
      .catch(err=>console.log(err));
    }else{
      axios.post('http://localhost:3031/huser',{uid})
      .then(res=>{
        setDetail(res.data);
        const loginStatus = localStorage.getItem('loginStatus');
        setIsLoggedIn(loginStatus);
        const logintype=localStorage.getItem('logintype');
        setLoggedInType(logintype)
      })
    }
    const type = localStorage.getItem('logintype');
    if(type === 'howner' && location.pathname.includes('student')){
      //display error message
      const newLoc = location.pathname.replace('student','howner');
      navigate(newLoc);
    }else if(type === 'student' && location.pathname.includes('howner')){
      //display error message
      const newLoc = location.pathname.replace('howner','student');
      navigate(newLoc);
    }

    const userLoggedIn = localStorage.getItem('loginStatus');
    if(userLoggedIn === 'true' && location.pathname.includes('/login')){
      // console.log('user already logged in');
      navigate('/');
    }
  },[location.pathname,navigate]) 
  //this dependencies may cause error

  const values = {detail,setDetail,isLoggedIn,setIsLoggedIn,loggedInType,setLoggedInType};

  return (
    <DetailContext.Provider value={values}>
        {props.children}
    </DetailContext.Provider>
  )
}

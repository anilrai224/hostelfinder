import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import './Choice.css'
import { DetailContext } from '../detailProvider/DetailProvider'

const LoginChoice = () => {
  const {setLoggedInType} = useContext(DetailContext);
  const display=(e)=>{
    setLoggedInType(e.target.name);
  }
  return (
    <div className='choices'>
      <div className="container">
        <div className="choiceContainer">
         <div className="choice">
          <NavLink name="student" onClick={display} to='/login/student' className='choiceLink'>as a Student</NavLink>
         </div>
          <div className="choice">
            <NavLink name="howner" onClick={display} to='/login/hostel' className='choiceLink'>as a Hostel Owner</NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginChoice
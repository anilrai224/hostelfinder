import React from 'react'
import { NavLink } from 'react-router-dom'
import img404 from '../../images/404.jpg'
import './NotFound.css'

const NotFound = () => {
  return (
    <div className='not-found'>
        <div className="container">
            <div className="not-found-content">
                <div className="not-found-left">
                    <img src={img404} alt="404" />
                </div>
                <div className="not-found-right">
                    <h1>Oops, <br/>
                    <span>nothing</span> here...
                    </h1>
                    <p>Uh oh, We can't seem to find the page you are looking for,<br/>
                        Try going back to previous page or Contact Us for more information.
                    </p>
                    <NavLink to ='/' className='go-back'>Go Back</NavLink>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NotFound
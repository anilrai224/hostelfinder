import React from 'react'
import {NavLink} from 'react-router-dom'
import logo from '../../images/logo.png'
import footerImg from '../../images/footer.png'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
        <img src={footerImg} className='footer-img' alt="footer" />
        <div className="container">
            <div className="footer__contents">
                <div className="footer__content">
                    <img src={logo} alt="logo" />
                    <p className="logo__desc">
                    Unlock a world of affordable accommodations with our comprehensive hostel directory. Find your perfect stay and create unforgettable memories on your next journey.
                    </p>
                </div>
                <div className="footer__content">
                    <h3>Services</h3>
                    <NavLink className="link">Booking</NavLink>
                    <NavLink className="link">Featured Hostels</NavLink>
                    <NavLink className="link">Review & Ratings</NavLink>
                </div>
                <div className="footer__content">
                    <h3>Quick Links</h3>
                    <NavLink className="link">Home</NavLink>
                    <NavLink className="link">About Us</NavLink>
                    <NavLink className="link">Services</NavLink>
                </div>
                <div className="footer__content">
                    <h3>Support</h3>
                    <NavLink className="link">Contact Us</NavLink>
                    <NavLink className="link">FAQs</NavLink>
                    <NavLink className="link">Privacy & Policy</NavLink>
                </div>
                {/* <div className="footer__content">
                    <h3>About Us</h3>
                    <p>At Hostel Finder, we are dedicated to providing student-friendly accommodations that combine comfort, affordability, and a vibrant community.</p>
                </div> */}
            </div>
            <div className="copyright">
                <p><span>Copyright &copy; 2023</span> All Rights Reserved By <span>hostelfinder.com</span></p>
            </div>
        </div>
    </div>
  )
}

export default Footer
import React, { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../images/logo.png';
import { FaBars } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import './Header.css';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRef = useRef();
  const handleResize=()=>{
    const width=window.innerWidth;
    if(width<=729){
      //taking all the nav list 
      const navLinks = document.querySelectorAll('.nav__link')
      navLinks.forEach((link)=>{
        //adding event listener in each link
        link.addEventListener('click',()=>{
          //when user open navigation in responsive view
          //then when user click on any link 
          //the responsive window should be on default 
          document.querySelector('.nav__links').classList.remove('responsive');
          document.querySelector('.login__register').classList.remove('responsive');
          //setting isNavOpen to false because when user click
          //on any link of responisve mode the isNavOpen is set to
          //true which means when user click on bar btn it doesnot open in responsive but to get reponsive next time when user click on bar we must set isnavopen to false;
          //icon 
          setIsNavOpen(false);
        })
      })
    }
  }
  window.addEventListener('resize',handleResize)

  const showNavBar = () => {
    setIsNavOpen(!isNavOpen);
  };

  // const showLogin=()=>{
  //   const loginModal = document.querySelector('.login__form-modal')
  //   const loginInputs = document.querySelector('.login__form-inputs')
  //   loginModal.style.display='block';
  //   loginInputs.style.display='block';
  //   loginModal.addEventListener('click',(e)=>{
  //     if(e.target === loginModal){
  //       loginModal.style.display='none'
  //     }
  //   })
  // }
  return (
    <header>
      <div className="container">
        <div className="nav__content">
          <div className="logo">
            <NavLink to="/" className="nav__logo">
              <img src={Logo} alt="LOGO" />
            </NavLink>
          </div>
          <div onClick={showNavBar} className="open">
            <FaBars />
          </div>
          <nav
            ref={navRef}
            className={`nav__links ${isNavOpen ? 'responsive' : ''}`}
          >
            <NavLink to="/" className="nav__link">
              Home
            </NavLink>
            <NavLink to="/about" className="nav__link">
              About Us
            </NavLink>
            <NavLink to="/services" className="nav__link">
              Services
            </NavLink>
            <NavLink to="/contact" className="nav__link">
              Contact
            </NavLink>
            <NavLink to="/faq" className="nav__link">
              FAQs
            </NavLink>
            <div className="close" onClick={showNavBar}>
              <MdClose />
            </div>
          </nav>
          <div className={`login__register ${isNavOpen ? 'responsive' :''}`}>
            <NavLink to='/login' className="btn link btn-login" >Login</NavLink>
            <NavLink to='/register' className="btn link btn-register" >Register</NavLink>
          </div>
          <div className="login__form-modal">
            <form className='login__form-inputs'>login form</form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

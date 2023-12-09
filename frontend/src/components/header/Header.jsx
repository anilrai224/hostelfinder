import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../../images/logo.png';
import { FaBars } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import './Header.css';
import defaultProfile from '../../images/profile.jpg'
import { DetailContext } from '../detailProvider/DetailProvider';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRef = useRef();

  useEffect(()=>{
    const handleResize=()=>{
      const width=window.innerWidth;
      if(width<=729){
        //taking all the nav list 
        const navLinks = document.querySelectorAll('.nav__link')
        navLinks.forEach((link)=>{
          link.addEventListener('click',()=>{
            document.querySelector('nav').classList.remove('responsive');
            document.querySelector('.login__register').classList.remove('responsive');
            setIsNavOpen(true);
          })
        })
      }
    }
    window.addEventListener('resize',handleResize)
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  },[])

  
  const showNavBar = () => {
    setIsNavOpen((prevIsNavOpen) => !prevIsNavOpen);
  };
  
  const {isLoggedIn,setIsLoggedIn,detail} = useContext(DetailContext);
  const loggedInType = localStorage.logintype;
  const navigate = useNavigate();
  const handleLogOut = ()=>{
    setIsLoggedIn(false);
    navigate('/');
    localStorage.clear();
  }

  const removeBtn =()=>{
    document.querySelector('nav').classList.remove('responsive');
    document.querySelector('.login__register').classList.remove('responsive')
  }

  //defining image source  
  useEffect(() => {
    if (!detail) {
      setIsLoggedIn(false);
    }
  }, [detail, setIsLoggedIn]);
  
  var imageSource;

  if (isLoggedIn && detail && detail.image) {
    imageSource = `http://localhost:3031/images/${detail.image}`;
  } else {
    imageSource = defaultProfile;
  }

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
            {loggedInType === 'student' || !isLoggedIn ? <NavLink to="/search" className="nav__link">Search</NavLink>:''}
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
          {isLoggedIn? 
            <div className='currentAccount'>
              <div className="currentAccount-img">
                <img src={imageSource} alt="Profile" />
              </div>
              <div className="account__option">
                <NavLink to={`/${loggedInType}/profile`} className='link'>Dashboard</NavLink>
                <p onClick={handleLogOut} className='link'>Logout</p>
              </div>
            </div>
            :
            <div className={`login__register ${isNavOpen ? 'responsive' :''}`}>
              <NavLink to='/login' onClick={removeBtn} className="btn link btn-login" >Login</NavLink>
              <NavLink to='/register' onClick={removeBtn} className="btn link btn-register" >Register</NavLink>
            </div>
          }
        </div>
      </div>
    </header>
  );
};

export default Header;

import React from 'react'
import {NavLink} from 'react-router-dom'
import background_image from '../../images/landing_page/bckground_image.png'
import aboutImg from '../../images/landing_page/about.png'
import {FaFacebookF,FaTwitter,FaInstagram,FaPhoneAlt} from 'react-icons/fa'
import {MdEmail} from 'react-icons/md'
import {ImLocation2} from 'react-icons/im'
import service1 from '../../images/service1.png'
import hostel from '../../images/hostel-rent.png'
import './Home.css'

const Home = () => {
  return (
    <>
        <div className='home'>
        <div className="container">
            <div className="home__contents">
                <div className="banner">
                    <div className="home__about">
                        <h1>looking <br/> for hostel?</h1>
                        <p>find the best available hostels and <br/> book for room availability qucikly</p>
                        <div className="home__buttons">
                            <a href='#home__about-us' className='btn btn__home-about'>About Hostel</a>
                            <button className="btn btn__home-book">Book Now</button>
                        </div>
                    </div>
                    <div className="banner__images">
                        <img src={background_image} alt="" />
                    </div>
                </div>
            </div>
            <div className="home__social">
                <div className="home__social-icons">
                    <div className="icon">
                        <FaFacebookF/>
                    </div>
                    <div className="icon">
                        <FaTwitter/>
                    </div>
                    <div className="icon">
                        <FaInstagram/>
                    </div>
                </div>
                <div className="home__social-line">
                    
                </div>
                <p>Join Us</p>
            </div>
        </div>
    </div>
    <div className="home__about-us" id='home__about-us'>
        <div className="container">
            <div className="home__about-us-contents">
                <div className="home__about-us-left">
                    <span>who we are?</span>
                    <h2>About Us</h2>
                    <p>
                    Welcome to our Hostel finder! We're here to simplify your search for the perfect hostel. Whether you're a budget traveler or seeking a unique accommodation experience, we're dedicated to helping you find the ideal hostel that meets your needs.<br/><br/>
                    With our user-friendly platform, you can easily search and discover hostels worldwide. Our extensive database covers various destinations, ensuring plenty of options to choose from. We provide accurate information on facilities.
                    </p>
                    <button className="btn btn__home-readmore">Read More</button>
                </div>
                <div className="home__about-us-right">
                    <img src={aboutImg} alt="" />
                </div>
            </div>
        </div>
    </div>
    <div className="home__services">
        <div className="container">
            <h2>services</h2>
            <div className="home__services-contents">
                <div className="home__service">
                    <div className="home__service-img">
                        <img src={service1} alt="" />
                    </div>
                    <div className="home__service-desc">
                        <span>Student</span>
                        <p>Our hostel finder website provides a comprehensive platform for students to easily search and find suitable accommodations based on their preferences, including location, budget, and availability.</p>
                    </div>
                </div>
                <div className="home__service">
                    <div className="home__service-img">
                        <img src={service1} alt="" />
                    </div>
                    <div className="home__service-desc">
                        <span>Student</span>
                        <p>Our hostel finder website provides a comprehensive platform for students to easily search and find suitable accommodations based on their preferences, including location, budget, and availability.</p>
                    </div>
                </div>
                <div className="home__service">
                    <div className="home__service-img">
                        <img src={service1} alt="" />
                    </div>
                    <div className="home__service-desc">
                        <span>Student</span>
                        <p>Our hostel finder website provides a comprehensive platform for students to easily search and find suitable accommodations based on their preferences, including location, budget, and availability.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="home__contact">
        <div className="container">
            <div className="home__contact-contents">
                <div className="home__contact-left">
                    <h3>Contact Us</h3>
                    <p>Reach out to us for any inquiries or assistance regarding our hostel finder website. We're here to help!</p>
                    <div className="home__contact-details">
                        <div className="detail">
                            <div className="detail__icon">
                                <FaPhoneAlt className="icon" />
                            </div>
                            <div className="details">
                                <b>Phone</b>
                                <span>98123412334</span>
                                <span>98123412334</span>
                            </div>
                        </div>
                        <div className="detail">
                            <div className="detail__icon">
                                <MdEmail className="icon"/>
                            </div>
                            <div className="details">
                                <b>Email</b>
                                <span>test@test.com</span>
                            </div>
                        </div>
                        <div className="detail">
                            <div className="detail__icon">
                                <ImLocation2 className="icon"/>
                            </div>
                            <div className="details">
                                <b>Location</b>
                                <span>Kathmandu</span>
                                <span>Kalanki</span>
                            </div>
                        </div>
                        <div className="detail">
                            <div className="detail__icon">
                                <FaPhoneAlt className="icon"/>
                            </div>
                            <div className="details">
                                <b>Phone</b>
                                <span>98123412334</span>
                                <span>98123412334</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="home__contact-right">
                    <iframe title='map' src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2041.579475341821!2d85.28464675688221!3d27.691809419283018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1687003291453!5m2!1sen!2snp">
                    </iframe>
                </div> */}
            </div>
        </div>
    </div>
    <div className="hostel__rent">
        <div className="container">
            <div className="hostel__rent-contents">
                <div className="hostel__rent-content">
                    <h2>do you have <br/> hostel for rent?</h2>
                    <p>list your hostel and connect with us</p>
                    <NavLink to='/register/hostel' className='link'>Contact Us</NavLink>
                </div>
                <div className="hostel__rent-img">
                    <img src={hostel} alt="" />
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Home
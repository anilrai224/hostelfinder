import React,{useContext} from 'react'
import {MdEdit} from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import './Main.css'
import { DetailContext } from '../../../../detailProvider/DetailProvider';
import defaultProfile from '../../../../../images/profile.jpg'

const Main = () => {
  const navigate = useNavigate();
  const goToAccount = (e) =>{
    e.preventDefault();
    navigate('/student/account')
  }
  const {detail} = useContext(DetailContext);

  // When the Main component loads, the useEffect in DetailProvider is still fetching the data, and detail might not have been set yet. As a result, detail.name or any other properties will be undefined initially, causing an error.
  //so if detail is not fetched then we return Loading to the page...
  if(!detail){
    return <p>Loading.....</p>;
  }
  //defining image source
  const imageSource = detail.image ? `http://localhost:3031/images/${detail.image}` : defaultProfile;

  return (
    <div className='profile-detail'>
      <p>My Profile</p>
      <div className="profile-details">
        <div className="first-profile">
          <div className="profile-img">
            {/* <img src={defaultProfile} className='img' alt="" /> */}
            <img src={imageSource} alt="Profile" />
          </div>
            <div className="profile-desc">
              <b>{detail.name}</b>
              <p>{detail.bio}</p>
              <p>{detail.taddress}</p>
            </div>
        </div>
        <div className="second-profile">
          <div className="profile-heading">
            <p>Personal Information</p>
            <button onClick={goToAccount}>Edit<MdEdit/></button> 
          </div>
            <div className="profile-info">
              <span>Name</span>
              <p>{detail.name}</p>
              <span>Email address</span>
              <p>{detail.email}</p>
              <span>Phone number</span>
              <p>{detail.phone}</p>
              <span>Bio</span>
              <p>{detail.bio}</p>
            </div>
        </div>
        <div className="third-profile">
          <div className="profile-heading">
            <p>Personal Information</p>
            <button onClick={goToAccount}>Edit<MdEdit/></button> 
          </div>
          <div className="profile-info">
            <div>
              <span>Country</span>
              <p>{detail.country}</p>
              <span>Permanent Address</span>
              <p>{detail.paddress}</p>
            </div>
            <div>
              <span>City/State</span>
              <p>{detail.city}</p>
              <span>Temporary Address</span>
              <p>{detail.taddress}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
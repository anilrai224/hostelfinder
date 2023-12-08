import React,{useContext, useState} from 'react'
import './Account.css'
import { DetailContext } from '../../../../detailProvider/DetailProvider';
import axios from 'axios'
import {MdPhotoSizeSelectLarge} from 'react-icons/md'
import {AiOutlineCamera} from 'react-icons/ai'
import defaultProfile from '../../../../../images/profile.jpg'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Account = () => {

  const [email,setEmail] = useState('');
  const [emailAvailable,setEmailAvailable] = useState(true);
  const [bio,setBio] = useState('');
  const [gender,setGender] = useState('');
  const [dob,setDob] = useState('');
  const [country,setCountry] = useState('');
  const [paddress,setPaddress] = useState('');
  const [taddress,setTaddress] = useState('');
  const [city,setCity] = useState('');

  const {detail,setDetail} = useContext(DetailContext);

  const [file,setFile] = useState();

  const navigate = useNavigate();
  const handleSubmit=(e)=>{
    e.preventDefault();
    const id=detail.id;
    const formData = new FormData();
    formData.append('email', email);
    formData.append('bio', bio);
    formData.append('gender', gender);
    formData.append('dob', dob);
    formData.append('country', country);
    formData.append('paddress', paddress);
    formData.append('taddress', taddress);
    formData.append('city', city);
    formData.append('id', id);
    formData.append('image', file);

    axios.post("http://localhost:3031/student/account", formData)
    .then(res => {
      setDetail(res.data);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer:3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Detail Changed Successfully'
        })
      const loginType= localStorage.logintype;
      navigate(`/${loginType}/profile`);
    })
    .catch(err => console.log(err));
  }

  const handleImage = (e)=>{
    setFile(e.target.files[0])
    const image = document.getElementsByClassName("img")[0];
    const input = document.getElementsByClassName("input-img")[0];
    console.log(image);
    image.src = URL.createObjectURL(input.files[0]);
  }
 
  const handleEmailBlur=()=>{
    checkEmailAvailability();
  }
    const checkEmailAvailability = ()=>{
      axios
      .post('http://localhost:3031/register/student/check-email',{email})
      .then(res=>{
        setEmailAvailable(res.data.isAvailable);
      })
      .catch(err=>console.log(err));
    }

    if(!detail){
      return <p>Loading..</p>;
    }
    if(!detail){
    return <p>Loading.....</p>;
  }
  const imageSource = detail.image ? `http://localhost:3031/images/${detail.image}` : defaultProfile;

  return (
    <div className='account-setting'>
      <p>Edit Profile</p>
      <form action="" onSubmit={handleSubmit}>
        <div className="img-form">
          <div className="your-img">
            <img src={imageSource} className='img' alt="" />
              {/* <img src={`http://localhost:3031/images/`+detail.image} className='img' alt="Profile" /> */}
          </div>
          <div className="img-input">
            <MdPhotoSizeSelectLarge className='img-icon'/>
            <p>Drag and Drop Image here</p>
            <span>or</span>
            <input onChange={handleImage} className='input-img' id="file" type="file" alt="Profile_Img" />
            <label className='img-file' htmlFor="file"><AiOutlineCamera className='camera'/>Select File</label>
          </div>
        </div>
        <div className="first-form">
          <p>Personal Information</p>
          <div>
            <div>
              <label htmlFor="email">
                <p>Email</p>
                <input onBlur={handleEmailBlur} onChange={e=>setEmail(e.target.value)} type="email" name="email" id="email" />
                {!emailAvailable && <span>Email Already is in Use.</span>}
              </label>
              <label htmlFor="bio">
                <p>Bio</p>
                <input onChange={e=>setBio(e.target.value)} type="text" name="bio" id="bio" />
              </label>
            </div>
            <div>
              <label htmlFor="gender">
                <p>Gender</p>
                <select onChange={e=>setGender(e.target.value)} name="gender" className='gender' id="gender">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </label>
              <label htmlFor="dob">
                <p>Date of Birth</p>
                <input onChange={e=>setDob(e.target.value)} type="date" name="dob" id="dob" />
              </label>
            </div>
          </div>
        </div>
        <div className="second-form">
          <p>Address</p>
          <div>
            <div>
              <label htmlFor="country">
                <p>Country</p>
                <input onChange={e=>setCountry(e.target.value)} type="text" name="country" id="country" />
              </label>
              <label htmlFor="perAddress">
                <p>Permanent Address</p>
                <input onChange={e=>setPaddress(e.target.value)} type="text" name="pAddress" id="pAddress" />
              </label>
            </div>
            <div>
              <label htmlFor="city">
                <p>City/State</p>
                <input onChange={e=>setCity(e.target.value)} type="text" name="city" id="city" />
              </label>
              <label htmlFor="tempAddress">
                <p>Temporary Address</p>
                <input onChange={e=>setTaddress(e.target.value)} type="text" required name="tAddress" id="tAddress" />
              </label>
            </div>
          </div>
        </div>
        {emailAvailable && <input type="submit" value="Save Profile" />}
      </form>
    </div>
  )
}

export default Account
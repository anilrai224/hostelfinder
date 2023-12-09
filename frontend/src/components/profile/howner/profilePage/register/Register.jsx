import React,{useContext, useState,useEffect} from 'react'
import {MdPhotoSizeSelectLarge} from 'react-icons/md'
import {AiOutlineCamera} from 'react-icons/ai'
import defaultProfile from '../../../../../images/profile.jpg'
import {useNavigate} from 'react-router-dom'
import { DetailContext } from '../../../../detailProvider/DetailProvider'
import './Register.css'
import Swal from 'sweetalert2'
import axios from 'axios'

const Register = () => {
  const {detail,hostelReg,setHostelReg} = useContext(DetailContext);
  // console.log(detail)
  // console.log(hostelReg)
  useEffect(() => {
    if (detail) {
      const isHostelReg = detail.hostelReg;
      if (isHostelReg === 1) {
        setHostelReg(true);
      }
    }
  }, [detail, setHostelReg]);
  const navigate = useNavigate();
  const [name,setName] = useState();
  const [address,setAddress] = useState();
  const [people,setPeople] = useState();
  const [tole,setTole] = useState();
  const [type,setType] = useState('boys');
  const [rooms,setRooms] = useState();
  const [facilities,setFacilities] = useState([]);
  const [seats,setSeats] = useState([]);
  const [file,setFile] = useState();

  const handleImage = (e) => {
    //may be we should write e.trager.files[0].filename
    setFile(e.target.files[0])
    // console.log(e.target.files[0]);
    const image = document.getElementsByClassName('img')[0];
    const input = document.getElementsByClassName('input-img')[0];
    // console.log(image);
    image.src = URL.createObjectURL(input.files[0]);
  };

  const [total,setTotal]=useState({
    toneseat:'',
    toneprice:'',
    ttwoseat:'',
    ttwoprice:'',
    tthreeseat:'',
    tthreeprice:'',
  })
  const handletotalchange=(e)=>{
    setTotal(prev=>({...prev,[e.target.name]:e.target.value}))
  }

  const handleFacilitiesChange = (e) => {
    const facilityName = e.target.name;
    const isChecked = e.target.checked;

    setFacilities((prevFacilities) => {
      if (isChecked) {
        return [...prevFacilities, facilityName];
      } else {
        return prevFacilities.filter((facility) => facility !== facilityName);
      }
    });
  };
  
  const [count,setCount] =useState(1);
  const handleSubmit = (e) => {
    e.preventDefault();
    
      const hostelSeaterInputs = document.querySelectorAll('.hostel_seater_inputs input[type="checkbox"]');
      const hostelSeaterData = [];

      hostelSeaterInputs.forEach((input) => {
        const checkboxName = input.name;
        const isChecked = input.checked;

        if (isChecked) {
          const totalseat = total[`t${checkboxName}seat`];
          const totalprice = total[`t${checkboxName}price`];

          hostelSeaterData.push({
            seat: checkboxName,
            tseat: totalseat,
            tprice: totalprice,
          });
        }
      });

      const collectedSeats = hostelSeaterData.map((data) => {
        return {
          seat: data.seat,
          tseat: data.tseat,
          tprice: data.tprice,
        };
      });
      setSeats((prevSeats) => [...prevSeats, ...collectedSeats]);
      setCount((prev)=>prev+1)

      //cause in single click i dont' get the updated seats values but in double click it does (needs' to be fixed)
      if(count === 2){
        if(!hostelReg){
          const formData = new FormData();
          //using same id of howner for his hostel 
          const id=detail.id;
          formData.append('id',id);
          formData.append('name',name)
          formData.append('address',address)
          formData.append('people',people)
          formData.append('tole',tole)
          formData.append('type',type)
          formData.append('rooms',rooms)
          formData.append('facilities',JSON.stringify(facilities))
          formData.append('seats',JSON.stringify(seats))
          formData.append('image',file)
          axios.post('http://localhost:3031/howner/RegisterHostel',formData)
          .then(res=>{
            console.log(res.data)
            if(res.data === "registered"){
              setHostelReg(true);
              navigate('/howner/profile')
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
                title: 'Hostel Registered Successfully'
              })
            }
          })
          .catch(err=>console.log(err))
          
        }else{
          
          const formData = new FormData();
          //to idenftiy the hostel of the hostel owner using his uid cause his uid is the id of his hostel
          const id = detail.id;
          //here to get the seats data user have to submit form twice
          //solved by: initially if user submit form then the seats value will be empty
          //so api call only happen if the seats which is an object length >0 i.e not empty
          if(Object.keys(seats).length>0){
            formData.append('id',id)
            formData.append('facilities',JSON.stringify(facilities))
            formData.append('seats',JSON.stringify(seats))
            formData.append('image',file)
            console.log(seats)
    
            axios.post('http://localhost:3031/howner/updateHostel',formData)
            .then(res=>{
              console.log(res.data);
              navigate('/howner/profile');
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
                title: 'Hostel Updated Successfully'
              })
            })
            .catch(err=>console.log(err));
          }
        }
      }
  }
  
  return (
    <div className='register_hostel'>
      <h1>Register Hostel</h1>
      <form  onSubmit={handleSubmit}>
        <div className="img-form">
            <div className="your-img">
              <img src={defaultProfile} className='img' alt="" />
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
        <div className="hostel_info">
          <p>hostel information</p>
          {!hostelReg && 
          <div className="hostel_info_inputs">
            <label htmlFor="name">
              <span>Name</span>
              <input onChange={e=>setName(e.target.value)} type="text" id='name' name='name' />
            </label>
            <label htmlFor="address">
              <span>Full Address</span>
              <input onChange={e=>setAddress(e.target.value)} type="text" name="address" id="address" />
            </label>
            <label htmlFor="people">
              <span>Total People</span>
              <input onChange={e=>setPeople(e.target.value)} type="number" name="people" id="people" />
            </label>
            <label htmlFor="tole">
              <span>Tole</span>
              <input onChange={e=>setTole(e.target.value)} type="text" name="tole" id="tole" />
            </label>
            <label htmlFor="type">
              <span>Type of Hostel</span>
              <select onChange={e=>setType(e.target.value)} name="type" id="type">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
            <label htmlFor="rooms">
              <span>Total Rooms</span>
              <input onChange={e=>setRooms(e.target.value)} type="number" name="rooms" id="rooms" />
            </label>
          </div>
          }

          <div className="hostel_seater">
            <p>available seater</p>
            <div className="hostel_seater_inputs">
              <div>
                <p>Seater</p>
                <p>T/No of Seater</p>
                <p>Fees</p>
              </div>
              <div>
                <label htmlFor="one">
                  <input type="checkbox" name="one" id="one" />
                  <span>One</span>
                </label>
                <input type="number" onChange={handletotalchange}  name="toneseat" id="toneseat" />
                <input type="number" onChange={handletotalchange}  name="toneprice" id="toneprice" />
              </div>
              <div>
                <label htmlFor="two">
                  <input type="checkbox" name="two" id="two" />
                  <span>Two</span>
                </label>
                <input type="number" onChange={handletotalchange} name="ttwoseat" id="ttwoseat" />
                <input type="number" onChange={handletotalchange} name="ttwoprice" id="ttwoprice" />
              </div>
              <div>
                <label htmlFor="three">
                  <input type="checkbox" name="three" id="three" />
                  <span>Three</span>
                </label>
                <input type="number" onChange={handletotalchange} name="tthreeseat" id="tthreeseat" />
                <input type="number" onChange={handletotalchange} name="tthreeprice" id="tthreeprice" />
              </div>
            </div>
          </div>

          <div className="hostel_facilities">
            <p>hostel facilities</p>
            <div className="hostel_facilities_inputs">
              <label htmlFor="Hygienic Food">
                <input onChange={handleFacilitiesChange}
                type="checkbox" value="Hygienic Food" name="Hygienic Food" id="Hygienic Food" />
                <span>Hygienic Food</span>
              </label>
              <label htmlFor="Attached bathroom">
                <input onChange={handleFacilitiesChange}
                type="checkbox" value="Attached Bathroom" name="Attached bathroom" id="Attached bathroom" />
                <span>Attached Bathroom</span>
              </label>
              <label htmlFor="laundary">
                <input onChange={handleFacilitiesChange}
                type="checkbox" value="Laundary" name="laundary" id="laundary" />
                <span>Laundary</span>
              </label>
              <label htmlFor="GYM">
                <input onChange={handleFacilitiesChange}
                type="checkbox" value="GYM" name="GYM" id="GYM" />
                <span>GYM</span>
              </label>
            </div>
          </div>
        </div>
        {hostelReg?<input type="submit" value="Update"/>:<input type="submit" value="Submit" />}
      </form>
    </div>
  )
}

export default Register
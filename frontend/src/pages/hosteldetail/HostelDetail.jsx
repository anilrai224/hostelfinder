  import React, { useContext, useEffect, useState } from 'react'
  import './HostelDetail.css'
  import { useParams,useNavigate } from 'react-router-dom'
  import {ImLocation2} from 'react-icons/im'
  import bed from '../../images/bed.png'
  import { DetailContext } from '../../components/detailProvider/DetailProvider'
  import Swal from 'sweetalert2'
  import axios from 'axios';

  const HostelDetail = () => {
    const navigate = useNavigate();
    const {isLoggedIn,detail} = useContext(DetailContext);
    const [hostel,setHostel] = useState();

      const {id} = useParams();
      useEffect(() => {
        axios.get(`http://localhost:3031/search/${id}`)
            .then(res => {
                setHostel(res.data[0]);
                // console.log(res.data[0])
              })
              .catch(err => console.log(err));
            }, [id]);
          if(!hostel){
            return <p>Loading....</p>
          }
          const dat= JSON.parse(hostel.seats_details);
          const facilities = JSON.parse(hostel.facilities);
        
        const handleBooking = (e,seater,totalSeat)=>{
          e.preventDefault();
          const hid=id; //howner id
          const std_id=detail.id;
          const seat = seater; //seat to be booked
          axios.post('http://localhost:3031/api/bookHostel',{hid,seat,std_id})
          .then(res=>{
            if(res.data === "Booked"){
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
                    title: 'Hostel Has been Booked.'
                  })
            }else{
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
                  icon: 'error',
                  title: 'Hostel Has been Booked Already.'
                })
            }
          })
          .catch(err=>console.log(err))
        }
    return (
      <div className='hostel-detail'>
        <div className="container">
          {isLoggedIn ? (
            <div className="hostel-detail-contents">
            <div>
              <h3>{hostel.name}</h3>
              <span><ImLocation2/>{hostel.address}</span>
            </div>
            <div className="hostel-img">
              <img src={`http://localhost:3031/images/`+hostel.image} alt="" />
            </div>
            <div className="hostel-info">
              <p>HOSTEL INFORMATON</p>
              <div className="hostel-info-details">
                <div>
                  <p>Full Address</p>
                  <p>{hostel.address}</p>
                </div>
                <div>
                  <p>Total People</p>
                  <p>{hostel.people}</p>
                </div>
                <div>
                  <p>Type of Hostel</p>
                  <p>{hostel.type}</p>
                </div>
                <div>
                  <p>Total Rooms</p>
                  <p>{hostel.rooms}</p>
                </div>
              </div>
            </div>
            <div className="hostel-seat-info">
              <p>available seater</p>
              <div className='available_seat'>
                {dat.map((room)=>{
                  return(
                    <div className="available_seat_info"  key={Math.random()}>
                        <img src={bed} alt="bed_img" />
                        <p>{room.tseat} BEDS AVAILABLE NOW</p>
                        <span>Price Per Bed : {room.tprice}/-</span>
                        <div className="total_seat">{room.seat} Seater</div>
                        <button className='book_hostel' onClick={(e)=>handleBooking(e,room.seat,room.tseat)}>Book Hostel</button>
                    </div>
                  )
                })
              }
              </div>
            </div>
            <div className="facilities">
              <p>HOSTEL FACILITIES</p>
              <div className="available_facilities">
                {facilities.map(facility=>
                  <p key={Math.random()}>{facility}</p>
                )}
              </div>
            </div>
          </div>
          ):(navigate('/error'))}
        </div>
      </div>
    )
  }

  export default HostelDetail
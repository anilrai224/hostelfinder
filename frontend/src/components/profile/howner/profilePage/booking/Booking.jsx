import React, { useEffect, useState } from 'react';
import './Booking.css';
import axios from 'axios';

const Booking = () => {
  const [booking,setBooking] = useState(false);
  const [bookingData,setBookingData] = useState();
  useEffect(()=>{
    const uid=localStorage.getItem('uid');
    //getting booking details of hostel owner from his/her id
    axios.post('http://localhost:3031/api/getBookings',{uid})
    .then(res=>{
      setBooking(true);
      setBookingData(res.data)
    })
    .catch(err=>console.log(err))
  },[])
  return (
    <div className='booking'>
      <h2>{booking ? 'Bookings' : 'No Bookings Found!'}</h2>
      {booking? 
              <div className='table'>
                <div>
                  <div className='th'>Name</div>
                  <div className='th'>Address</div>
                  <div className='th'>Number</div>
                  <div className='th'>Seater</div>
                </div>
                {bookingData.map((user,index)=>(
                  <UserRow key={index} uid = {user.std_id} seat={user.seat}/>
                ))}
            </div>
      :''}
    </div>
  );
};
 
const UserRow = ({uid,seat})=>{
  const [user,setUser] = useState(null);
  useEffect(()=>{
    axios.post('http://localhost:3031/user',{uid})
    .then(res=>{
      setUser({...res.data,bookedSeat:seat});
    })
    .catch(err=>console.log(err))
  },[uid])

  return(
    <div style={{padding:'10px 0'}}>
      <div className='td'>{user ? user.name :'Loading..'}</div>
      <div className='td'>{user ? user.taddress :'Loading..'}</div>
      <div className='td'>{user ? user.phone :'Loading..'}</div>
      <div className='td'>{user ? user.bookedSeat :'Loading..'}</div>
    </div>
  )
}

export default Booking;
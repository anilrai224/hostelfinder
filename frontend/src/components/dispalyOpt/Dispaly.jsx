import React, { useState,useEffect } from 'react'
import img1 from '../../images/hostel-rent.png'
import {ImLocation2} from 'react-icons/im'
import './Dispaly.css'
import axios from 'axios'

const Dispaly = () => {

  // const [hostel,setHostel] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get('http://localhost:3001/service')
  //     .then((res) => {
  //       setHostel(res.data);
  //       console.log(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  return (
    <div className="display__hostel">
      {/* {hostel.map((hostel)=>{
        //converting json(of database type) type in objects
        const seaterOptions = JSON.parse(hostel.seater);
        return(
          <div className="hostel" key={hostel.id}>
            <img src={img1} alt="" />
            <div className="hostel__desc">
              <p>{hostel.name}</p>
              <span>{seaterOptions.join('/')} Seater</span>
              <div className="loc">
                <ImLocation2/>
                <p>{hostel.address}</p>
              </div>
            </div>
          </div>
        );
      })} */}
      <h1>display</h1>
    </div>
  )
}

export default Dispaly
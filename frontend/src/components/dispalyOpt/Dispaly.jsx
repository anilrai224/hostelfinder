import React, { useState,useEffect } from 'react'
import img1 from '../../images/hostel-rent.png'
import {ImLocation2} from 'react-icons/im'
import './Dispaly.css'
import axios from 'axios'

const Dispaly = (props) => {
    const [hostels,setHostels] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3031/search')
      .then((res) => {
        setHostels(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="display__hostel">

      {hostels.map((hostel)=>{
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
      })}
      <h1>Display</h1>
    </div>
  )
}

export default Dispaly
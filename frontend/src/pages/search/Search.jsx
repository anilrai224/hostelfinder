import React, { useState,useEffect, useContext } from "react";
import searchImg from "../../images/search.png";
import { MdLocationOn } from "react-icons/md";
import { BiCurrentLocation } from "react-icons/bi";
import { ImPriceTags } from "react-icons/im";
import { FaBed } from "react-icons/fa";
import "./Search.css";
// import Display from '../../components/dispalyOpt/Dispaly'
import axios from 'axios'
import { DetailContext } from "../../components/detailProvider/DetailProvider";
import {ImLocation2} from 'react-icons/im'
import { NavLink, useNavigate } from "react-router-dom";

const Search = () => {
  const [iprice, setIprice] = useState("");
  const [fprice, setFprice] = useState("");
  const [hostel, setHostel] = useState("");
  const [location, setLocation] = useState("");
  const [seater, setSeater] = useState("");

  const [error,setError] = useState(false);

  const [hostels,setHostels] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:3031/search')
      .then((res) => {
        setHostels(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  
  const navigate = useNavigate();
  const handleSubmit=(e)=>{
    if(isLoggedIn){
      e.preventDefault();
      console.log(iprice,fprice,hostel,location,seater);
      axios 
      .post('http://localhost:3031/search',{hostel,location,iprice,fprice,seater})
      .then(res=>{
        if(res.data.length>0){
          setHostels(res.data);
        }else{
          setError(true);
        }
      })
      .catch(err=>console.log(err));
    }else{
      console.log('Not logged In');
      navigate('/error');
    }
  }

  const {isLoggedIn} = useContext(DetailContext);
  return (
    <div className="searchOpt">
      <div className="container">
        <img src={searchImg} className="form_img" alt="search" />
        <div className="search__contents">
          <form className="search__inputs" onSubmit={handleSubmit}>
            <h2>search hostel</h2>
            <p>Type of hostel</p>
            <label className="hostel_types">
              <div>
                <input onChange={e=>setHostel(e.target.value)} value="boys" type="radio" name="hostel" id="hostel" />
                <span>Boys Hostel</span>
              </div>
              <div>
                <input onChange={e=>setHostel(e.target.value)} value="girls" type="radio" name="hostel" id="hostel" />
                <span>Girls Hostel</span>
              </div>
            </label>
            <label className="location" htmlFor="location">
              <p>
                <MdLocationOn />
                <span>location/states</span>
              </p>
              <div className="input">
                <input onChange={e=>setLocation(e.target.value)} type="text" name="location" id="location" />
                <BiCurrentLocation className="licon" />
              </div>
            </label>
            <p>
              <ImPriceTags />
              <span>price</span>
            </p>
            <label className="price" htmlFor="price">
              <label htmlFor="iprice">
                <p style={{color:'#db5c0b'}}>FROM</p>
                <div className="budget">
                  <input
                    type="text"
                    defaultValue={iprice}
                    onChange={e=>setIprice(e.target.value)}
                  />
                </div>
              </label>
              <label htmlFor="fprice">
                <p style={{color:'#db5c0b'}}>TO</p>
                <div className="budget">
                  <input
                    type="text"
                    defaultValue={fprice}
                    onChange={e=>setFprice(e.target.value)}
                  />
                </div>{" "}
              </label>
              {/* NPR <input className="range" type="text" name="iprice" id="iprice" />
                        - NPR <input className='range' type="text" name="fprice" id="fprice" /> */}
            </label>
            <p>
              <FaBed />
              <span>no.of seater</span>
            </p>
            <select onChange={e=>setSeater(e.target.value)} name="seater" id="seater">
              <option hidden>Choose a seater</option>
              <option value="one">one</option>
              <option value="two">two</option>
              <option value="three">three</option>
              <option value="four">four</option>
            </select>
            <input type="submit" value="submit" />
          </form>
          <div className="search__results">
            <div className="display__hostel">
            {error ? (
              <h1 className="hostelNotFound">No suitable hostels found.</h1>
            ) : (
                hostels.map((hostel) => {
                  // Converting JSON (of database type) to objects
                  const seaterOptions = JSON.parse(hostel.seats_details);
                  return (
                    <div className="hostel" key={hostel.id}>
                      <img src={`http://localhost:3031/images/${hostel.image}`} alt="" />
                      <div className="hostel__desc">
                        <p>{hostel.name}</p>
                        <span>{seaterOptions.map((seat,index) => (
                          <span key={seat.seat}>
                            {seat.tseat}
                            {index!== seaterOptions.length-1 ? ',':''}
                          </span>
                        ))} Seater </span> 
                        <div className="loc">
                          <ImLocation2 />
                          <p>{hostel.address}</p>
                        </div>
                        <NavLink className='view-hostel' to = {`/search/${hostel.id}`}>View Details</NavLink>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;

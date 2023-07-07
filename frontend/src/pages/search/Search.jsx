import React, { useState } from "react";
import searchImg from "../../images/search.png";
import { MdLocationOn } from "react-icons/md";
import { BiCurrentLocation } from "react-icons/bi";
import { ImPriceTags } from "react-icons/im";
import { FaBed } from "react-icons/fa";
import "./Search.css";
import Dispaly from '../../components/dispalyOpt/Dispaly'
import axios from 'axios'

const Search = () => {
  const [iprice, setIprice] = useState("");
  const [fprice, setFprice] = useState("");
  const [hostel, setHostel] = useState("");
  const [location, setLocation] = useState("");
  const [seater, setSeater] = useState("");
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(iprice,fprice,hostel,location,seater);
    axios 
    .post('http://localhost:3031/search',{hostel,location,iprice,fprice,seater})
    .then(res=>{
      console.log('res.data');
    })
    .catch(err=>console.log(err));
    
  }
  return (
    <div className="searchOpt">
      <div className="container">
        <img src={searchImg} alt="search" />
        <div className="search__contents">
          <form className="search__inputs" onSubmit={handleSubmit}>
            <h2>make a reservation</h2>
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
                <input
                  type="range"
                  onChange={e=>setIprice(e.target.value)}
                  min="5000"
                  max="30000"
                  step={1000}
                  name="iprice"
                  id="iprice"
                />
                <div className="budget">
                  <input
                    type="text"
                    defaultValue={iprice}
                  />
                  <p>NPR </p>
                </div>
              </label>
              <label htmlFor="fprice">
                <input
                  type="range"
                  onChange={e=>setFprice(e.target.value)}
                  min="5000"
                  max="30000"
                  step={1000}
                  name="fprice"
                  id="fprice"
                />
                <div className="budget">
                  <input
                    type="text"
                    defaultValue={fprice}
                  />
                  <p>NPR </p>
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
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            <input type="submit" value="submit" />
          </form>
          <div className="search__results">
            <Dispaly/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;

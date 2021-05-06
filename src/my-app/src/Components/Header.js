import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./CSS/Header.css";



const Header = (props) => {
  const [searchFilter, setSearchFilter] = useState('');

  const search = () => {
    props.history.push(`/search?keyword=${searchFilter}`);
  }

  return (
      <div className="gwd-div-1tnt" id="header-div">
        <Link to="/" style={{textDecoration : "none"}}><label id="label_1" className="gwd-label-1xit">Vega</label></Link>
        <div className="gwd-div-1im0">
          <input type="text" id="text_1" onChange={ (e) => setSearchFilter(e.target.value)}  className="gwd-input-116q"/>
          <button id="button_1" className="gwd-button-rvij" onClick= {search}>
            Search
          </button>
        </div>
        <div className="gwd-div-1b0h">
          <button id="button_2" className="gwd-button-rr5j gwd-button-1d0r" onClick={() => props.history.push("/login")}>Login</button>
          <button id="button_3" className="gwd-button-rr5j gwd-button-iigw" onClick={() => props.history.push("/signup")}>Signup</button>
          <button id="button_4" className="gwd-button-rr5j gwd-button-1234" onClick={() => props.history.push("/mylistings")}>My Listings</button>
        </div>
      </div>
  )
}

export default Header

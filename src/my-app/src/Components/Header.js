import React from "react"
import SearchBar from './SearchBar'
import "./CSS/Header.css";

const headerStyle = {
  padding: "0px 0px",
  lineHeight: "1.5em",
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: "100px",
  justifyContent: 'center'
}

const headerTextStyle = {
  fontSize: "5rem",
  fontWeight: "600",
  marginBottom: "2rem",
  lineHeight: "1em",
  color: "#000000",
  textTransform: "lowercase",
  textAlign: "center",
  alignSelf:"flex-start"      
}

const inputStyle = {
  alignSelf:'flex-end'
}

const Header = () => {
  return (
    <header>
      <ul>
        <li><a class="active" href="#home">Home</a></li>
        <li><a href="#news">News</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#about">About</a></li>
      </ul>
    </header>
  )
}

export default Header
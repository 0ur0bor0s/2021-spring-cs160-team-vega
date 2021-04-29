import React from "react"
import SearchBar from './SearchBar'

const Header = () => {


  const headerStyle = {
      padding: "20px 0",
      lineHeight: "1.5em",
      display: 'flex',
      alignItems: 'center'
    }



  return (
    <header style ={headerStyle}>
      <h1
        style ={
            {
                fontSize: "5rem",
                fontWeight: "600",
                marginBottom: "2rem",
                lineHeight: "1em",
                color: "#000000",
                textTransform: "lowercase",
                textAlign: "left",            }
        }>vega</h1>{/*<SearchBar />*/} 
    </header>
  )
}

export default Header

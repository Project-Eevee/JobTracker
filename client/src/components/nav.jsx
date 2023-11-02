import React from 'react';
import './nav.css'
const Nav = () => {
  return(

    <div className="nav-container">
      <div>
        <h1 className="title">Got Jobs?</h1>
      </div>
      
      <div className="button-container">
        <button className="metrics-button">
          Metrics
        </button>
        
        <button className="logout-button">
          Logout
        </button>
      </div>               
    </div>
  )
}

export default Nav;
import React from 'react';
import './nav.css';
import { googleLogout } from '@react-oauth/google';
import { logOut } from '../slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    googleLogout();
    console.log('logging out');
    dispatch(logOut());

    localStorage.removeItem('token');
    navigate('/');
  };
  return (
    <div className='nav-container'>
      <div>
        <h1 className='title'>Got Jobs?</h1>
      </div>

      <div className='button-container'>
        <button className='metrics-button'>Metrics</button>

        <button onClick={handleLogout} className='logout-button'>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Nav;

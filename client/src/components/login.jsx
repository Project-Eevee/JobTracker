import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { authenticateUser, setCredentials } from '../slices/authSlice';
import { googleLogout } from '@react-oauth/google';
import { logOut } from '../slices/authSlice';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = (data) => {
    navigate('/home');
  };

  const onSignup = (data) => {
    navigate('/home');
  };

  const handleCredentialResponse = async (response) => {
    const googleData = {
      tokenId: response.credential,
    };

    const resultAction = await dispatch(authenticateUser(googleData));

    if (authenticateUser.fulfilled.match(resultAction)) {
      console.log(resultAction);
      const userData = resultAction.payload;
      dispatch(
        setCredentials({
          user: userData.user,
          accessToken: userData.accessToken,
        })
      );
      navigate('/home');
    } else {
      console.log(resultAction);
      console.error('Failed to authenticate user');
    }
  };

  const handleLogout = () => {
    googleLogout();
    console.log('logging out');
    dispatch(logOut());

    localStorage.removeItem('token');
    navigate('/');
  };
  return (
    <>
      {/* Login Form */}
      <form onSubmit={handleSubmit(onLogin)}>
        <div className='login-form'>
          <label htmlFor='email'>Email</label>
          <input type='email' className='form-input' {...register('email')} required />
        </div>
        <div className='login-form'>
          <label htmlFor='password'>Password</label>
          <input type='password' className='form-input' {...register('password')} required />
        </div>
        <button type='submit' className='submit-button'>
          Login
        </button>
      </form>
      {/* Signup Form */}
      <form onSubmit={handleSubmit(onSignup)}>
        <div className='login-form'>
          <label htmlFor='email'>Email</label>
          <input type='email' className='form-input' {...register('email')} required />
        </div>
        <div className='login-form'>
          <label htmlFor='password'>Password</label>
          <input type='password' className='form-input' {...register('password')} required />
        </div>{' '}
        <button type='submit' className='submit-button'>
          Sign Up
        </button>
      </form>

      <GoogleLogin
        onSuccess={handleCredentialResponse}
        // onSuccess={(credentialResponse) => {
        //   console.log(credentialResponse);
        // }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
      <button onClick={handleLogout} className='logout-button'>
        Logout
      </button>
    </>
  );
};

export default Login;

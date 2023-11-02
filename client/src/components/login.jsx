import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { authenticateUser, setCredentials } from '../slices/authSlice';
import './login.css';
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

  return (
    <div className='splash-container'>
      <div className='auth-container'>
        {/* Login Form */}
        <form onSubmit={handleSubmit(onLogin)} className='auth-form'>
          <h2>Login</h2>
          <div className='input-group'>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' className='form-input' {...register('email')} required />
          </div>
          <div className='input-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              className='form-input'
              {...register('password')}
              required
            />
          </div>
          <button type='submit' className='auth-button'>
            Login
          </button>
        </form>

        {/* Signup Form */}
        <form onSubmit={handleSubmit(onSignup)} className='auth-form'>
          <h2>Sign Up</h2>
          <div className='input-group'>
            <label htmlFor='signup-email'>Email</label>
            <input
              type='email'
              id='signup-email'
              className='form-input'
              {...register('email')}
              required
            />
          </div>
          <div className='input-group'>
            <label htmlFor='signup-password'>Password</label>
            <input
              type='password'
              id='signup-password'
              className='form-input'
              {...register('password')}
              required
            />
          </div>
          <button type='submit' className='auth-button'>
            Sign Up
          </button>
        </form>
        {/* Google Auth */}
        <GoogleLogin
          onSuccess={handleCredentialResponse}
          onError={() => {
            console.log('Login Failed');
          }}
          className='google-login-button'
        />
      </div>

      <div className='info-container'>
        {/* <div className='header-gif'>
          <img src='path-to-your-gif.gif' alt='Animated GIF' />
        </div> */}
        <h1>Welcome to Job Tracker</h1>
        <p>Your personal tool for tracking job applications and interviews.</p>
        <ul>
          <li>Organize your job search</li>
          <li>Track your application statuses</li>
          <li>Schedule interviews and follow-ups</li>
          {/* More features */}
        </ul>
      </div>
    </div>
  );
};

export default Login;

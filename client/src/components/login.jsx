import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { authenticateUser, setCredentials } from '../slices/authSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { manualLogin, signupUser } from '../slices/authSlice';
import './login.css';
const Login = () => {
  const { control: loginControl, handleSubmit: handleLoginSubmit } = useForm();

  const { control: signupControl, handleSubmit: handleSignupSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = (credentials) => {
    dispatch(manualLogin(credentials))
      .unwrap()
      .then((result) => {
        console.log('Login successful:', result);
        navigate('/home');
      })
      .catch((error) => {
        console.error('Login failed:', error);
        const formElement = document.querySelector('.auth-form');
        formElement.classList.add('shake-animation');

        formElement.addEventListener(
          'animationend',
          () => {
            formElement.classList.remove('shake-animation');
          },
          { once: true }
        );
      });
  };

  const onSignup = (signupData) => {
    console.log('signupData', signupData);
    dispatch(signupUser(signupData))
      .unwrap()
      .then((result) => {
        console.log('Signup successful:', result);
        navigate('/home');
      })
      .catch((error) => {
        console.error('Signup failed:', error);
      });
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
        <form
          onSubmit={handleLoginSubmit((data) => {
            onLogin(data);
          })}
          className='auth-form'
        >
          <h2>Login</h2>

          <div className='input-group'>
            <label htmlFor='email'>Email</label>
            <Controller
              name='email'
              control={loginControl}
              defaultValue=''
              rules={{ required: true }}
              render={({ field }) => (
                <input type='email' id='email' className='form-input' {...field} />
              )}
            />
          </div>

          <div className='input-group'>
            <label htmlFor='password'>Password</label>
            <Controller
              name='password'
              control={loginControl}
              defaultValue=''
              rules={{ required: true }}
              render={({ field }) => (
                <input type='password' id='password' className='form-input' {...field} />
              )}
            />
          </div>

          <button type='submit' className='auth-button'>
            Login
          </button>
        </form>

        {/* Signup Form */}
        <form
          onSubmit={handleSignupSubmit((data) => {
            console.log('Form submitted with data:', data);
            onSignup(data);
          })}
          className='auth-form'
        >
          <h2>Sign Up</h2>

          <div className='input-group'>
            <label htmlFor='email'>Email</label>
            <Controller
              name='signup_email'
              control={signupControl}
              defaultValue=''
              rules={{ required: true }}
              render={({ field }) => (
                <input type='email' id='signup_email' className='form-input' {...field} />
              )}
            />
          </div>

          <div className='input-group'>
            <label htmlFor='password'>Password</label>
            <Controller
              name='signup_password'
              control={signupControl}
              defaultValue=''
              rules={{ required: true }}
              render={({ field }) => (
                <input type='password' id='signup_password' className='form-input' {...field} />
              )}
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
        <h1>Welcome to ByunDL</h1>
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

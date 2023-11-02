import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { authenticateUser, setCredentials } from '../slices/authSlice';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = (data) => {
    console.log(data);
  };

  const onSignup = (data) => {
    console.log(data);
  };

  const handleCredentialResponse = async (response) => {
    const googleData = {
      tokenId: response.credential,
    };

    const resultAction = dispatch(authenticateUser(googleData));

    if (authenticateUser.fulfilled.match(resultAction)) {
      const userData = resultAction.payload;
      dispatch(
        setCredentials({
          user: userData.user,
          accessToken: userData.accessToken,
        })
      );
      navigate('/home');
    } else {
      console.error('Failed to authenticate user');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  return (
    <>
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

      {/* Google Login Button */}
      {
        <GoogleLogin
          onSuccess={handleCredentialResponse}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      }
    </>
  );
};

export default Login;

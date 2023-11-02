import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store.js';

import Login from './components/login.jsx';

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<Login />} />
        {/* <Route path='/signup' element={<Signup />} />
      <Route path='/mainpage' element={<MainPage />} />
      <Route path='/userpage' element={<UserPersonalItenerary />} /> */}
      </Routes>
    </Provider>
  );
};

export default App;

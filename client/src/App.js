import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store.js';

import Login from './components/login.jsx';
import Home from './components/home.jsx';

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/home' element={<Home />} /> */}
      </Routes>
    </Provider>
  );
};

export default App;

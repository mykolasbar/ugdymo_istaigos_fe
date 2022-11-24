import logo from './logo.svg';
import './App.css';
import React, { useContext, useState, useEffect }  from 'react';
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import Customer from './Customer';
import Schools from './Schools';
import Requests from './Requests';
import Login from './login';
import Register from './register';
import Admin from './Admin';
import Order from './Order';
// import Protected from './protected';
import { AuthContext, AuthProvider } from './Auth';


function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Customer/>} />
            <Route path='/customer' element={<Customer/>} />
            <Route path='/addpupil' element={<Order/>} />
            <Route path='/admin' element={<Admin/>}>
                <Route path='editschools' default element={<Schools/>} />
                <Route path='editrequests' element={<Requests/>} />
                {/* <Route path='newhotel' element={<NewHotel/>} />
                <Route path='orders' element={<Orders/>} /> */}
                <Route index element={<Schools/>} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>

    </>
  );
}

export default App;

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
import EditSchool from './EditSchool';
import NewSchool from './NewSchool';
import Protected from './Protected';
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
            <Route path='/addpupil' element={<Protected><Order/></Protected>} />
              <Route path='/admin' element={<Protected ><Admin /></Protected>}>
                  <Route path='editschools' default element={<Schools/>} />
                  <Route path='editrequests' element={<Requests/>} />
                  <Route path ='newschool' element = {<NewSchool />}/>
                  <Route index element={<Schools/>} />
              </Route>
            <Route path ='editschool/:id' element = {<Protected><EditSchool /></Protected>}/>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>

    </>
  );
}

export default App;

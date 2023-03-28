import logo from './logo.svg';
import './App.css';
import React, { useContext, useState, useEffect }  from 'react';
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Customer from './Customer';
import Schools from './Schools';
import Requests from './Requests';
import Login from './login';
import Register from './register';
import Admin from './Admin';
import Order from './Order';
import EditSchool from './EditSchool';
import NewSchool from './NewSchool';
import Customer2 from './Customer2';
import RegisterPupil from './RegisterPupil';
import MyPupils from './MyPupils';
import MyOrders from './MyOrders';
import Protected from './Protected';
import AdminProtected from './AdminProtected';
import UserSidebar from './UserSidebar';
import Header from './header';
import Notification from './Notification';
import EditPupil from './EditPupil';
import AccountSettings from './accountSettings';
// import Protected from './protected';
import { AuthContext, AuthProvider } from './Auth';
import { NotifProvider, NotifContext } from './NotifContext';
import Footer from './footer';

function App() {
  return (
    <>
    <CookiesProvider>
      <BrowserRouter>
        <AuthProvider>
          <NotifProvider>
          <Routes>
            <Route path="/" element={<Customer2/>} />
            <Route path='/customer' element={<Customer2/>} />
            <Route path='/addpupil' element={<Order/>} />
            {/* <Route path="/mypupils" element={<MyPupils />} />
            <Route path="/myorders" element={<MyOrders />} /> */}
            <Route path="/updatepupil/:id" element={<EditPupil />} />
            <Route path='/registerpupil/:id' element={<RegisterPupil/>} />
            <Route path='/admin' element={<AdminProtected ><Admin /></AdminProtected>}>
                <Route path='editschools' default element={<Schools/>} />
                <Route path='editrequests' element={<Requests/>} />
                <Route path ='newschool' element = {<NewSchool />}/>
                <Route index element={<Schools/>} />
            </Route>
            <Route path='/user' element={<Protected><UserSidebar /></Protected>}>
                <Route path="/user/mypupils" element={<MyPupils />} />
                <Route path="/user/myorders" element={<MyOrders />} />
                <Route path="/user/accountsettings" element={<AccountSettings />} />
                <Route index element={<MyPupils/>} />
            </Route>
            <Route path ='editschool/:id' element = {<AdminProtected><EditSchool /></AdminProtected>}/>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
          </NotifProvider>
        </AuthProvider>
      </BrowserRouter>
    </CookiesProvider>
    </>
  );
}

export default App;

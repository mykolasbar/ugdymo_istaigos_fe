import React, { useState, useEffect, useContext, useRef }  from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth"
import Header from './header';

const UserSidebar = () => {
    return (
        <>
        <Header />
        <div style={{display:"flex", flexDirection:"row"}}>
            <nav className="sidebar" style = {{width:"200px", position: "fixed", backgroundColor: "blue", height:"100vh"}}>
                    <div className="d-flex justify-content-between w-100">
                        <ul className="navbar-nav p-3">
                            <li className="nav-item active p-2">
                                <Link className="nav-link" to="/user/mypupils">Mano pridėti mokiniai</Link>
                            </li>
                            <li className="nav-item p-2">
                                <Link className="nav-link" to="/user/myorders">Mano užsakymai</Link>
                            </li>
                            {/* <li className="nav-item p-2">
                                <Link className="nav-link" to="/admin/newschool">Nauja mokykla</Link>
                            </li> */}
                        </ul>
                    </div>
                </nav>
        <Outlet />
        </div>

        
        </>
    );
};

export default UserSidebar;
import React, { useState, useEffect, useContext, useRef }  from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth"
import Header from './header';
import Header2 from './header2';

const Admin = () => {
    return (
        <>
        <Header2 />
        <nav className="navbar-expand-lg navbar-light bg-primary p-2 w-100 d-flex flex-row align-items-center" style = {{height:"80px"}}>
                <div className="d-flex justify-content-between w-100">
                    <ul className="navbar-nav p-3">
                        <li className="nav-item active p-2">
                            <Link className="nav-link" to="/admin/editschools">Mokyklos</Link>
                        </li>
                        <li className="nav-item p-2">
                            <Link className="nav-link" to="/admin/editrequests">Prašymai</Link>
                        </li>
                        <li className="nav-item p-2">
                            <Link className="nav-link" to="/admin/newschool">Nauja mokykla</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        <Outlet />

        
        </>
    );
};

export default Admin;
import React, { useState, useEffect, useContext, useRef }  from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth"
import Header from './header';

const Admin = () => {
    return (
        <>
        <Header />
        <nav className="navbar-expand-lg navbar-light bg-primary p-2 w-100 d-flex flex-row align-items-center">
                <div className="d-flex justify-content-between w-100">
                    <ul className="navbar-nav p-3">
                        <li className="nav-item active p-2">
                            <Link className="nav-link" to="/admin/editschools">Mokyklos</Link>
                        </li>
                        <li className="nav-item p-2">
                            <Link className="nav-link" to="/admin/editrequests">Prašymai</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        <Outlet />

        
        </>
    );
};

export default Admin;
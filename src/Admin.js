import React, { useState, useEffect, useContext, useRef }  from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth"
import Header from './header';
import Header2 from './header2';
import Footer from './footer';

const Admin = () => {
    return (
            <div>
                <div>
                    <Header2 />
                    <div id="sidebarcontainer">
                        <div id="sidebar" style = {{backgroundColor:"blue"}}>
                            <nav id="sidebarlist" >
                                <div id="usersidebar" className="nav-item p-2">
                                    <Link className="nav-link" to="/admin/editschools">Mokyklos</Link>
                                </div>
                                <div id="usersidebar" className="nav-item p-2">
                                    <Link className="nav-link" to="/admin/editrequests">Prašymai</Link>
                                </div>
                                <div id="usersidebar" className="nav-item p-2">
                                    <Link className="nav-link" to="/admin/newschool">Nauja mokykla</Link>
                                </div>
                            </nav>
                        </div>
                        <Outlet />
                    </div>
                </div>
                <Footer />
            </div>
    );
};

export default Admin;
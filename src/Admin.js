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
                    <div id="sidebarcontainer" style = {{width:"100vw"}}>
                        <div id="sidebar" style = {{backgroundColor:"blue", color:"white", fontWeight:"bold"}}>
                            <nav id="sidebarlist" >
                                <div id="adminsidebar" className="nav-item p-3">
                                    <Link className="nav-link" to="/admin/editschools">Mokyklos</Link>
                                </div>
                                <div id="adminsidebar" className="nav-item p-3">
                                    <Link className="nav-link" to="/admin/editrequests">Prašymai</Link>
                                </div>
                                <div id="adminsidebar" className="nav-item p-3">
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
import React, { useState, useEffect, useContext, useRef }  from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth"
import Header from './header';
import Header2 from './header2';

const UserSidebar = () => {
    let auth = useContext(AuthContext)

    return (
        <>
            <Header2 />
            {/* <Header /> */}
            
            <div style={{display:"flex", flexDirection:"row", width:"100%"}}>
                <div>
                    <nav className="sidebar" style = {{backgroundColor: "#c42727", height:"50vw"}}>
                        <div className="d-flex w-100">
                            <ul className="navbar-nav justify-content-between">
                                <li id="usersidebar" style={{backgroundColor:"#630702", color: "white", display:"flex", flexDirection:"row"}} className="nav-item active p-2">
                                    <div style={{padding:"5px"}}><span class="material-symbols-outlined">account_circle</span></div>
                                    <div style={{padding:"5px"}}><b>{auth.getUser()?.name}</b></div>
                                </li>
                                <li id="usersidebar" className="nav-item active p-2">
                                    <Link className="nav-link" to="/user/mypupils" style={{display:"flex", flexDirection:"row"}}><div className="material-symbols-outlined">chevron_right</div><div>Mano pridėti mokiniai</div></Link>
                                </li>
                                <li id="usersidebar" className="nav-item p-2">
                                    <Link className="nav-link" to="/user/myorders" style={{display:"flex", flexDirection:"row"}}><div className="material-symbols-outlined">chevron_right</div><div>Mano užsakymai</div></Link>
                                </li>
                                <li id="usersidebar" className="nav-item p-2">
                                    <Link className="nav-link" to="/user/accountsettings" style={{display:"flex", flexDirection:"row"}}><div className="material-symbols-outlined">chevron_right</div><div>Paskyros nustatymai</div></Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <Outlet />
            </div>
        </>
    );
};

export default UserSidebar;
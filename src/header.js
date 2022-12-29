import React, { useState, useEffect, useRef, useContext }  from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from "./Auth"
import { NotifProvider, NotifContext } from './NotifContext';
import BurgerMenu from './BurgerMenu';

import Notification from './Notification';
import AccountDropdown from './AccountDropdown';

const Header = () => {
let auth = useContext(AuthContext)
let [showNotif, setShowNotif] = useState(false)
let [showAccountDropdown, setShowAccountDropdown] = useState(false)
let [viewed, setViewed] = useState(false)
const [phoneSize, setPhoneSize] = useState(false)
const buttonRef = useRef()
const dropdownRef = useRef()

let handleResize = () => {
    console.log(window.innerWidth)
    window.innerWidth <= 479 && setPhoneSize(true)
    window.innerWidth >= 479 && setPhoneSize(false)
}

window.addEventListener('resize', handleResize)



window.addEventListener('click', (e)=>{if (e.target != buttonRef.current && showAccountDropdown === true) setShowAccountDropdown(false); else if(e.target != dropdownRef.current && showNotif === true){setShowNotif(false)}})

    return (
        <>
        <nav className="navbar-expand-lg navbar-light bg-black text-light w-100 align-items-center">
            <div className = "container w-75 d-flex flex-row align-items-center">
                <Link to="/customer"><img src = { require("./ikona_be_fono.png") } alt="logo" style = {{ width:"40px", margin: "20px", filter: "brightness(1000%)"}}  /></Link>
                <Link className="navbar-brand" to="/customer"><h2>Ugdymo įstaigos</h2></Link>
                <div className="navbar-expand-lg d-block d-sm-block d-md-none justify-content-end navbar-light bg-black text-light w-100 p-4"><BurgerMenu/></div>
                <div className="d-none d-sm-none d-md-flex justify-content-between w-100 flex-row align-items-center">
                            <ul className="navbar-nav p-3">
                                <li className="nav-item active p-2">
                                    <Link className="nav-link" to="/customer">Klientams</Link>
                                </li>
                        {auth.isLoggedinAdmin() ? (
                            <>
                                <li className="nav-item p-2">
                                    <Link className="nav-link" to="/admin">Administravimas</Link>
                                </li>
                            </>
                            ) : ("")}
                            </ul>
                        {!auth.isLoggedin() && !auth.isLoggedinAdmin() ? (
                            <ul className="navbar-nav p-3">
                                <li className="nav-item p-2">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item p-2">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </ul>
                                ) : (
                            <ul className="navbar-nav p-3">
                                <li className="nav-item">           
                                    <div style = {{display:"flex", flexDirection:"row"}} >
                                        <span className="nav-link">You are logged in as <Link to="/user" style={{textDecoration:"none", color:"white", position: "relative"}}><strong>{auth.getUser().name}</strong></Link></span><span ref = {buttonRef} className="material-symbols-outlined" style={{cursor:"pointer", marginTop:"10px", position: "relative"}} onClick={()=>{setShowAccountDropdown(!showAccountDropdown)}}>expand_more {showAccountDropdown ? <AccountDropdown /> : "" }</span>

                                    </div>
                                    
                                </li>
                                <li className="nav-item">
                                    <div style = {{display:"flex", flexDirection:"row", padding:"10px", paddingRight: "20px"}}>
                                        <span className="material-symbols-outlined" style={{cursor:"pointer"}} ref = {dropdownRef} onClick = {()=>{setShowNotif(!showNotif); setViewed(!viewed)}}>notifications</span>
                                        <div style = {{backgroundColor:"red", borderRadius:"50%", width:"10px", height:"10px"}}></div>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <Link style={{textColor: "black"}} className="nav-link" to="/login" onClick={() => auth.logout()}>Logout</Link>
                                </li>
                            </ul>
                    )}
                </div>
            </div>
        </nav>

        {showNotif ? <Notification viewed = {viewed}/> : "" }
        
        </>
    );
};

export default Header;
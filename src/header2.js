import React, { useState, useEffect, useRef, useContext }  from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from "./Auth"
import { NotifProvider, NotifContext } from './NotifContext';
import BurgerMenu from './BurgerMenu';

import Notification from './Notification';
import AccountDropdown from './AccountDropdown';

const Header2 = () => {
let auth = useContext(AuthContext)
let notif = useContext(NotifContext)

let [showNotif, setShowNotif] = useState(false)
let [showAccountDropdown, setShowAccountDropdown] = useState(false)
let [viewed, setViewed] = useState(false)
let [showMainDropdown, setShowMainDropdown] = useState(false)
const buttonRef = useRef()
const dropdownRef = useRef()


window.addEventListener('click', (e)=>{if (e.target != buttonRef.current && showAccountDropdown === true) setShowAccountDropdown(false); else if(e.target != dropdownRef.current && showNotif === true){setShowNotif(false)}})

    return (
        <>
        <nav id="mainnav">
            <div id = "container">
                <div id = "headersmall">
                    <div><Link to="/customer"><img id = "logo" src = { require("./ikona_be_fono.png") } alt="logo" /></Link></div>
                    <Link to="/customer" id="title"><h2>Ugdymo įstaigos</h2></Link>
                    <div onClick = {()=>{setShowMainDropdown(!showMainDropdown); console.log(showMainDropdown)}}><BurgerMenu/></div>
                    <div id="notificationsmallscreen">
                        <span className="material-symbols-outlined" style={{cursor:"pointer", color:"white"}} ref = {dropdownRef} onClick = {()=>{setShowNotif(!showNotif)}}>notifications</span>
                        <div style = {{backgroundColor:"red", borderRadius:"50%", width:"10px", height:"10px"}}></div>
                    </div>
                </div>
                <div id="allbuttonsnav" style = {{display: showMainDropdown && "flex"}}>
                    <div id="leftmenu">
                        <div>
                            <Link to="/customer" id="mainmenuitem">Klientams</Link>
                        </div>
                        {auth.isLoggedinAdmin() ? (
                        <div>
                            <Link to="/admin" id="mainmenuitem">Administravimas</Link>
                        </div>
                        ) : ("")}
                    </div>
                    {!auth.isLoggedin() && !auth.isLoggedinAdmin() ? (
                    <div id="rightmenu">
                        <div id="mainmenuitem">
                            <Link to="/login">Login</Link>
                        </div>
                        <div id="mainmenuitem">
                            <Link to="/register">Register</Link>
                        </div>
                    </div>
                    ) : (
                    <div id="rightmenu">
                        <div style={{flexDirection:"column"}}>
                            <div id="mainmenuitem"><Link  to="/user" style={{textDecoration:"none"}}><strong style={{color:"white"}}>{auth.getUser().name}</strong></Link>
                            <span ref = {buttonRef} className="material-symbols-outlined" style={{cursor:"pointer"}} onClick={()=>{setShowAccountDropdown(!showAccountDropdown)}}>expand_more</span></div>
                            <div style = {{display: showAccountDropdown ? "block" : "none"}} id = "dropdownContainer">{<AccountDropdown/>}</div>
                        </div>
                        <div style={{flexDirection:"column"}}>
                            <div id="notificationbigscreen">
                                <span className="material-symbols-outlined" style={{cursor:"pointer"}} ref = {dropdownRef} onClick = {()=>{setShowNotif(!showNotif); setViewed(true)}}>notifications</span>
                                <div style = {{backgroundColor:"red", borderRadius:"50%", width:"10px", height:"10px"}}></div>
                            </div>
                            <div style = {{display: showNotif ? "block" : "none"}} id = "dropdownContainer">{<Notification viewed = {viewed}/>}</div>
                        </div>
                        {/* <div id="mainmenuitem">
                            <Link style={{textColor: "black"}} to="/login" onClick={() => auth.logout()}>Logout</Link>
                        </div> */}
                    </div>
                    )}
                </div>
            </div>
        </nav>
        </>
    );
};

export default Header2;
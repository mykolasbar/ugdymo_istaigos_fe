import React, { useState, useEffect, useRef, useContext }  from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from "./Auth"
import { NotifProvider, NotifContext } from './NotifContext';
import BurgerMenu from './BurgerMenu';

import Notification from './Notification';
import AccountDropdown from './AccountDropdown';

const Header2 = () => {
let auth = useContext(AuthContext)
let [showNotif, setShowNotif] = useState(false)
let [showAccountDropdown, setShowAccountDropdown] = useState(false)
let [viewed, setViewed] = useState(false)
let [showMainDropdown, setShowMainDropdown] = useState(false)
// const [phoneSize, setPhoneSize] = useState(false)
const buttonRef = useRef()
const dropdownRef = useRef()


// let handleResize = () => {
//     console.log(window.innerWidth)
//     window.innerWidth <= 700 && setPhoneSize(true)
//     window.innerWidth >= 700 && setPhoneSize(false)
// }

// window.addEventListener('resize', handleResize)



window.addEventListener('click', (e)=>{if (e.target != buttonRef.current && showAccountDropdown === true) setShowAccountDropdown(false); else if(e.target != dropdownRef.current && showNotif === true){setShowNotif(false)}})

    return (
        <>
        <nav id="mainnav">
            <div id = "container">
                <div id = "headersmall">
                    <div><Link to="/customer"><img id = "logo" src = { require("./ikona_be_fono.png") } alt="logo" /></Link></div>
                    <Link to="/customer" id="title"><h2>Ugdymo įstaigos</h2></Link>
                    <div onClick = {()=>{setShowMainDropdown(!showMainDropdown); console.log(showMainDropdown)}}><BurgerMenu/></div>
                </div>
                <div id="allbuttonsnav" style = {{display: showMainDropdown && "flex"}}>
                            <ul id="leftmenu">
                                <li id="mainmenuitem">
                                    <Link to="/customer">Klientams</Link>
                                </li>
                        {auth.isLoggedinAdmin() ? (
                            <>
                                <li id="mainmenuitem">
                                    <Link to="/admin">Administravimas</Link>
                                </li>
                            </>
                            ) : ("")}
                            </ul>
                        {!auth.isLoggedin() && !auth.isLoggedinAdmin() ? (
                            <ul id="rightmenu">
                                <li id="mainmenuitem">
                                    <Link to="/login">Login</Link>
                                </li>
                                <li id="mainmenuitem">
                                    <Link to="/register">Register</Link>
                                </li>
                            </ul>
                                ) : (
                            <ul id="rightmenu">
                                <li id="mainmenuitem">           
                                    <div>
                                        <span>You are logged in as <Link to="/user" style={{textDecoration:"none", color:"white", position: "relative"}}><strong>{auth.getUser().name}</strong></Link></span>
                                        <div ref = {buttonRef} className="material-symbols-outlined" style={{cursor:"pointer"}} onClick={()=>{setShowAccountDropdown(!showAccountDropdown)}}>expand_more {showAccountDropdown ? <AccountDropdown /> : "" }</div>
                                    </div>
                                </li>
                                <li id="mainmenuitem">
                                    <div style = {{display:"flex", flexDirection:"row"}}>
                                        <span className="material-symbols-outlined" style={{cursor:"pointer"}} ref = {dropdownRef} onClick = {()=>{setShowNotif(!showNotif); setViewed(!viewed)}}>notifications</span>
                                        <div style = {{backgroundColor:"red", borderRadius:"50%", width:"10px", height:"10px"}}></div>
                                    </div>
                                </li>
                                <li id="mainmenuitem">
                                    <Link style={{textColor: "black"}} to="/login" onClick={() => auth.logout()}>Logout</Link>
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

export default Header2;
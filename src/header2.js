import React, { useState, useEffect, useRef, useContext }  from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from "./Auth"
import { NotifProvider, NotifContext } from './NotifContext';
import BurgerMenu from './BurgerMenu';
import CookiesPropt from './cookiesPropt';

import Notification from './Notification';
import AccountDropdown from './AccountDropdown';

const Header2 = () => {
let auth = useContext(AuthContext)
let notif = useContext(NotifContext)

let [showNotif, setShowNotif] = useState(false)
let [showAccountDropdown, setShowAccountDropdown] = useState(false)
let [viewed, setViewed] = useState(false)
let [showMainDropdown, setShowMainDropdown] = useState(false)
let [showCookiesPrompt, setShowCookiesPrompt] = useState(false)
let [resetNotifs, setResetNotifs] = useState(0)
const buttonRef = useRef()
const dropdownRef = useRef()

useEffect(()=>{notif.setNotifications()}, [auth.getUser()?.name])

useEffect(()=>{
    let timer = setTimeout(() => {setShowCookiesPrompt(true)}, 4000)
    return () => clearTimeout(timer)
}, [])


window.addEventListener('click', (e)=>{if (e.target != buttonRef.current && showAccountDropdown === true) setShowAccountDropdown(false); else if(e.target != dropdownRef.current && showNotif === true){setShowNotif(false)}})

    return (
        <>
        <nav id="mainnav">
            <div id = "container">
                <div id = "headersmall">
                    <div><Link to="/customer"><img id = "logo" src = { require("./ikona_be_fono.png") } alt="logo" /></Link></div>
                    <Link to="/customer" id="title"><h2>Ugdymo įstaigos</h2></Link>
                    <div onClick = {()=>{setShowMainDropdown(!showMainDropdown)}}><BurgerMenu/></div>
                    <div id="notificationsmallscreen">
                        <span className="material-symbols-outlined" style={{cursor:"pointer", color:"white"}} ref = {dropdownRef} onClick = {()=>{setShowNotif(!showNotif)}}>notifications</span>
                        {notif.getNotifsArray().length !== 0 && <div style = {{color:"red"}}>{notif.getNotifsArray().length}</div>}
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
                        <div>
                            <Link to="/login" id="mainmenuitem">Prisijungti</Link>
                        </div>
                        <div>
                            <Link to="/register" id="mainmenuitem">Registruotis</Link>
                        </div>
                    </div>
                    ) : (
                    <div id="rightmenu">
                        <div style={{flexDirection:"column"}}>
                            <div id="mainmenuitem" style={{minWidth:"140px"}}><Link to="/user" style={{textDecoration:"none"}}><strong style={{color:"white"}}>{auth.getUser().name}</strong></Link>
                            <span ref = {buttonRef} className="material-symbols-outlined" style={{cursor:"pointer"}} onClick={()=>{setShowAccountDropdown(!showAccountDropdown)}}>expand_more</span></div>
                            <div style = {{display: showAccountDropdown ? "block" : "none"}} id = "dropdownContainer">{<AccountDropdown/>}</div>
                        </div>
                        <div style={{flexDirection:"column"}}>
                            <div id="notificationbigscreen">
                                <span className="material-symbols-outlined" style={{cursor:"pointer"}} ref = {dropdownRef} onClick = {()=>{setShowNotif(!showNotif); setResetNotifs(resetNotifs+1)}}>notifications</span>
                                {/* <div style = {{backgroundColor:"red", borderRadius:"50%", width:"10px", height:"10px"}}></div> */}
                                {notif.getNotifsArray().length > 0 && <div style = {{color:"red", fontSize:'12px'}}><b>{notif.getNotifsArray().length}</b></div>}
                            </div>
                            <div style = {{display: showNotif ? "block" : "none"}} id = "dropdownContainer">{<Notification resetNotifs = {resetNotifs}/>}</div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </nav>
        {showCookiesPrompt && <CookiesPropt />}
        </>
    );
};

export default Header2;
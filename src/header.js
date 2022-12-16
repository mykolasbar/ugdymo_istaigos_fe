import React, { useState, useEffect, useRef, useContext }  from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from "./Auth"
import Notification from './Notification';
import AccountDropdown from './AccountDropdown';

const Header = () => {
let auth = useContext(AuthContext)
let [showNotif, setShowNotif] = useState(false)
let [showAccountDropdown, setShowAccountDropdown] = useState(false)
const buttonRef = useRef()
const dropdownRef = useRef()


window.addEventListener('click', (e)=>{console.log(e); if (e.target != buttonRef.current && showAccountDropdown === true) setShowAccountDropdown(false); else if(e.target != dropdownRef.current && showNotif === true){setShowNotif(false)}})

    return (
        <>
        <nav className="navbar-expand-lg navbar-light bg-black text-light p-2 w-100 d-flex flex-row align-items-center" style = {{height:"80px"}}>
            <Link to="/customer"><img src = { require("./ikona_be_fono.png") } alt="logo" style = {{ width:"40px", margin: "20px", filter: "brightness(1000%)"}}  /></Link>
            <Link className="navbar-brand" to="/customer"><h2>Ugdymo įstaigos</h2></Link>
                {/* <button className="navbar-toggler" type="button" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> */}
            <div className="d-flex justify-content-between w-100">
                        <ul className="navbar-nav p-3">
                            <li className="nav-item active p-2">
                                <Link className="nav-link" to="/customer">Klientams</Link>
                            </li>
                    {/* {auth.isLoggedin() ? (<li className="nav-item active p-2">
                                <Link className="nav-link" to="/addpupil">Pridėti naują mokinį</Link>
                            </li>) : ("")} */}
                    {auth.isLoggedinAdmin() ? (
                        <>
                            <li className="nav-item p-2">
                                <Link className="nav-link" to="/admin">Admin</Link>
                            </li>
                            <li className="nav-item active p-2">
                                <Link className="nav-link" to="/addpupil">Pridėti naują mokinį</Link>
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
                                <div style = {{display:"flex", flexDirection:"row"}}>
                                    <span className="nav-link">You are logged in as <Link to="/user"><strong>{auth.getUser().name}</strong></Link></span><span ref = {buttonRef} class="material-symbols-outlined" style={{cursor:"pointer", marginTop:"10px"}} onClick={()=>{setShowAccountDropdown(!showAccountDropdown)}}>expand_more</span>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div style = {{display:"flex", flexDirection:"row", padding:"10px", paddingRight: "20px"}}>
                                    <span className="material-symbols-outlined" style={{cursor:"pointer"}} ref = {dropdownRef} onClick = {()=>{setShowNotif(!showNotif)}}>notifications</span>
                                    <div style = {{backgroundColor:"red", borderRadius:"50%", width:"10px", height:"10px"}}></div>
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link style={{textColor: "black"}} className="nav-link" to="/login" onClick={() => auth.logout()}>Logout</Link>
                            </li>
                        </ul>
                )}
            </div>
        </nav>
        {showNotif ? <Notification /> : "" }
        {showAccountDropdown ? <AccountDropdown /> : "" }
        </>
    );
};

export default Header;
import React, { useState, useEffect, useRef, useContext }  from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from "./Auth"

const Header = () => {
let auth = useContext(AuthContext)

    return (
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
                    {auth.isLoggedin() ? (<li className="nav-item active p-2">
                                <Link className="nav-link" to="/addpupil">Pridėti naują mokinį</Link>
                            </li>) : ("")}
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
                                <span className="nav-link mx-4">You are logged in as <strong>{auth.getUser().name}</strong></span>
                            </li>
                            <li className="nav-item">
                                <Link style={{textColor: "black"}} className="nav-link" to="/login" onClick={() => auth.logout()}>Logout</Link></li>
                        </ul>
                )}
            </div>
        </nav>
    );
};

export default Header;
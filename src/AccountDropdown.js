import React from 'react';
import { Link } from "react-router-dom";


const AccountDropdown = () => {
    return (
        <ul style = {{listStyle: "none", fontSize: "15px", fontFamily: "Helvetica", backgroundColor: "#4A4646", color: "white", padding: "10px", position: "absolute", border: "1px solid grey", zIndex: "+1000"}}>
            <li>
                <Link style={{textColor: "black"}} className="nav-link" to="/user/myorders">Mano užsakymai</Link>
            </li>
            <li>
                <Link style={{textColor: "black"}} className="nav-link" to="/user/mypupils">Mano pridėti mokiniai</Link>
            </li>
        </ul>
    );
};

export default AccountDropdown;
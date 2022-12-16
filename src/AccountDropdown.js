import React from 'react';
import { Link } from "react-router-dom";


const AccountDropdown = () => {
    return (
        <ul style = {{listStyle: "none", backgroundColor: "#4A4646", color: "white", padding: "10px", position: "absolute", zIndex: "+1000", left: "80%", top: "10.5%"}}>
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
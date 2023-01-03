import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from "./Auth"


const AccountDropdown = (props) => {
    let auth = useContext(AuthContext)

    return (
        <div style = {{justifyContent:"center", flexDirection:"column", listStyle: "none", fontSize: "15px", fontFamily: "Helvetica", backgroundColor: "black", color: "white", position: "absolute", zIndex: "+1000"}}>
            <div id = "dropdownitem" >
                <Link className="nav-link" to="/user/myorders">Mano užsakymai</Link>
            </div>
            <div id = "dropdownitem">
                <Link className="nav-link" to="/user/mypupils">Mano pridėti mokiniai</Link>
            </div>
            <div id = "dropdownitem">
                <Link to="/login" onClick={() => auth.logout()} style={{textDecoration:"none", color:"white"}}>Atsijungti</Link>
            </div>
        </div>
    );
};

export default AccountDropdown;
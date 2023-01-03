import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from "./Auth"


const AccountDropdown = (props) => {
    let auth = useContext(AuthContext)
    let [tab, setTab] = useState('')
  

    return (
        <div style = {{justifyContent:"center", flexDirection:"column", listStyle: "none", fontSize: "15px", fontFamily: "Helvetica", backgroundColor: "black", color: "white", position: "absolute", zIndex: "+1000"}}>
            <div id = "dropdownitem" onClick = {()=>{setTab('tab1')}}>
                <Link className="nav-link" to="/user/mypupils" state="tab1">Mano pridėti mokiniai</Link>
            </div>
            <div id = "dropdownitem" onClick = {()=>{setTab('tab2')}}>
                <Link className="nav-link" to="/user/myorders" state="tab2">Mano užsakymai</Link>
            </div>
            <div id = "dropdownitem" onClick = {()=>{setTab('tab3')}}>
                <Link className="nav-link" to="/user/accountsettings" state="tab3">Paskyros nustatymai</Link>
            </div>
            <div id = "dropdownitem">
                <Link to="/login" onClick={() => auth.logout()} style={{textDecoration:"none", color:"white"}}>Atsijungti</Link>
            </div>
        </div>
    );
};

export default AccountDropdown;
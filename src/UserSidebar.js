import React, { useContext, useState, useNavigate, useEffect }  from 'react';
import { Link, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "./Auth"
import Header2 from './header2';

const UserSidebar = () => {
    let location = useLocation()
    const tab = location.state

    let auth = useContext(AuthContext)

    let [activeTab, setActiveTab] = useState('tab1')

    useEffect(()=>{tab !== null && setActiveTab(activeTab = tab)}, [tab])

    return (
        <>
            <Header2 />
            <div style={{display:"flex", flexDirection:"row", width:"100%"}}>
                <div>
                    <nav className="sidebar" style = {{backgroundColor: "#c42727", minHeight:"100vh", height:"100%"}}>
                        <div className="d-flex w-100">
                            <ul className="navbar-nav justify-content-between">
                                <li id="usersidebar" style={{backgroundColor:"#630702", color: "white", display:"flex", flexDirection:"row"}} className="nav-item active p-2">
                                    <div style={{padding:"5px"}}><span class="material-symbols-outlined">account_circle</span></div>
                                    <div style={{padding:"5px"}}><b>{auth.getUser()?.name}</b></div>
                                </li>
                                <li id="usersidebar" className="nav-item p-2" onClick = {()=>{setActiveTab('tab1')}} style = {{ backgroundColor: activeTab === "tab1" && "#d44646" }}>
                                    <Link className="nav-link" to="/user/mypupils" style={{display:"flex", flexDirection:"row"}}><div className="material-symbols-outlined">chevron_right</div><div>Mano pridėti mokiniai</div></Link>
                                </li>
                                <li id="usersidebar" className="nav-item p-2" onClick = {()=>{setActiveTab('tab2')}} style = {{ backgroundColor: activeTab === "tab2" && "#d44646" }}>
                                    <Link className="nav-link" to="/user/myorders" style={{display:"flex", flexDirection:"row"}}><div className="material-symbols-outlined">chevron_right</div><div>Mano užsakymai</div></Link>
                                </li>
                                <li id="usersidebar" className="nav-item p-2" onClick = {()=>{setActiveTab('tab3')}} style = {{ backgroundColor: activeTab === "tab3" && "#d44646" }}>
                                    <Link className="nav-link" to="/user/accountsettings" style={{display:"flex", flexDirection:"row"}}><div className="material-symbols-outlined">chevron_right</div><div>Paskyros nustatymai</div></Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                {console.log(activeTab)}
                <Outlet />
            </div>
        </>
    );
};

export default UserSidebar;
import React, { useState, useEffect, useContext }  from 'react';
import { AuthContext, AuthProvider } from "./Auth"
import { NotifProvider, NotifContext } from './NotifContext';

const Notifications = (props) => {
    let auth = useContext(AuthContext)
    let notif = useContext(NotifContext)
    let [notificationArray, setNotificationArray] = useState([])
    let [userId, setUserId] = useState()


    useEffect(() => {
        if (props.resetNotifs == 2)
        fetch("https://ugdymoistaigosbe.herokuapp.com/api/makeviewed/" + auth.getUser()?.id, {method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.getToken()}` }})
        .then(()=>notif.setNotifications())
    }, [props.resetNotifs]);


    return (
        <>
            {notif.getNotifsArray().length === 0 ? 
            <div style = {{justifyContent:"center", flexDirection:"column", listStyle: "none", fontSize: "15px", fontFamily: "Helvetica", backgroundColor: "black", color: "white", position: "absolute", zIndex: "+1000", right:"0%"}}>
                <div id = "dropdownitem">Naujų pranešimų nėra</div> 
            </div>    
                :
            <div style = {{justifyContent:"center", flexDirection:"column", listStyle: "none", fontSize: "15px", fontFamily: "Helvetica", backgroundColor: "black", color: "white", position: "absolute", zIndex: "+1000"}}>
                { notif.getNotifsArray().map((order) => 
                    <div key = {order.id} id = "dropdownitem" > 
                        Patvirtinta jūsų registracija į mokyklą: <b>{order.schools.title}</b>
                    </div>) 
                }
            </div>
            }
        </>
    );
};

export default Notifications;

// results.map((result)=>{(result.confirmed && !result.viewed) && notificationArray.push(result.schools.title)})
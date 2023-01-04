import React, { useState, useEffect, useContext }  from 'react';
import { AuthContext, AuthProvider } from "./Auth"
import { NotifProvider, NotifContext } from './NotifContext';

const Notifications = (props) => {
    let auth = useContext(AuthContext)
    let notif = useContext(NotifContext)
    let [notificationArray, setNotificationArray] = useState([])
    let [userId, setUserId] = useState()


    // useEffect(()=>{
    //     setUserId(auth.getUser()?.id)
    //     console.log(userId)
    // }, [auth.getUser()?.id])

    useEffect(() => {
        console.log(auth.getUser()?.id)
        fetch("http://127.0.0.1:8000/api/userorders/" + auth.getUser()?.id, {method: 'GET'})
        .then(response => {return response.json()})
        .then(response => {setNotificationArray(notificationArray = response)})
        .then(() => {console.log(notificationArray)})
        }, [notif.getNotifsArray()]);

    useEffect(() => {
        if (props.viewed === true)
        fetch("http://127.0.0.1:8000/api/makeviewed/", {method: 'PUT'})
    }, [props.viewed]);


    return (
        <>
            {notif.getNotifsArray().length === 0 ? 
            <div style = {{justifyContent:"center", flexDirection:"column", listStyle: "none", fontSize: "15px", fontFamily: "Helvetica", backgroundColor: "black", color: "white", position: "absolute", zIndex: "+1000"}}>
                <div id = "dropdownitem">Naujų pranešimų nėra</div> 
            </div>    
                :
            <div style = {{justifyContent:"center", flexDirection:"column", listStyle: "none", fontSize: "15px", fontFamily: "Helvetica", backgroundColor: "black", color: "white", position: "absolute", zIndex: "+1000"}}>
                { notif.getNotifsArray().map((order) => 
                    <div key = {order.id} id = "dropdownitem" > 
                        Patvirtinta jūsų registracija į mokyklą: {order}
                    </div>) 
                }
            </div>}
        </>
    );
};

export default Notifications;

// results.map((result)=>{(result.confirmed && !result.viewed) && notificationArray.push(result.schools.title)})
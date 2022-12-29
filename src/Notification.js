import React, { useState, useEffect, useContext }  from 'react';
import { AuthContext, AuthProvider } from "./Auth"
import Header from './header';

const Notifications = (props) => {
    let auth = useContext(AuthContext)
    let [notificationArray, setNotificationArray] = useState([])
    let [userId, setUserId] = useState()


    useEffect(()=>{
        setUserId(auth.getUser()?.id)
    })

    useEffect(() => {
        // let id = auth.getUser()?.id;
        fetch("http://127.0.0.1:8000/api/userorders/" + userId, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
        .then((results) => {setNotificationArray(notificationArray = results)})
        .then(() => {console.log(notificationArray)})
        }, [userId]);

    useEffect(() => {
        if (props.viewed === true)
        fetch("http://127.0.0.1:8000/api/makeviewed/", {method: 'PUT'})
    }, [props.viewed]);


    return (
        <>
            { notificationArray.map((order) => 
                <div key = {order.id} style = {{backgroundColor: "#4A4646", color: "white", padding: "5px", zIndex: "+1100", position:"absolute"}}> 
                    {order.confirmed && !order.viewed ? "Patvirtintas jūsų prašymas mokyklai: " + order.schools.title : "Naujų pranešimų nėra"}
                    {/* Patvirtintas jūsų prašymas mokyklai: " { order.schools.title } */}
                </div>) 
            }
        </>
    );
};

export default Notifications;

// results.map((result)=>{(result.confirmed && !result.viewed) && notificationArray.push(result.schools.title)})
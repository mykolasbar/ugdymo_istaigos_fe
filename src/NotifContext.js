import React, { createContext, useState, useEffect, useContext }  from 'react';
import { AuthContext } from "./Auth"
import Header from './header';
import Notification from './Notification';


export let NotifContext = createContext()

export let NotifProvider = ({children}) => {
    let auth = useContext(AuthContext)
    let [notifsArray, setNotifsArray] = useState([])
    let [requestsConfirmed, setRequestsConfirmed] = useState(false)

    
    let setNotifications = () => {
        if (auth.getUser()?.id != null) {
            fetch("https://ugdymoistaigosbe.herokuapp.com/api/userorders/" + auth.getUser()?.id, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
            .then(response => response.json())
            .then(result => setNotifsArray(notifsArray = result.filter(order => {
                return order.confirmed == true && order.viewed == false;
            })))
            // setNotifsArray(notifsArray => [...notifsArray, newNotif])
            .then(()=>console.log(notifsArray))}
    }
    let newRequests = () => {setRequestsConfirmed(!requestsConfirmed)}
    let requestsAdded = () => requestsConfirmed
    let getNotifsArray = () => notifsArray;
    let testing = () => "aaaaaaaaaaa"

    return (
        <NotifContext.Provider value={{ getNotifsArray, setNotifications, testing, newRequests, requestsAdded }}>{children}</NotifContext.Provider>
    );
}

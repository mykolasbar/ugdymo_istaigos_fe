import React, { createContext, useState, useEffect, useContext }  from 'react';
import { AuthContext } from "./Auth"
import Header from './header';
import Notification from './Notification';


export let NotifContext = createContext()

export let NotifProvider = ({children}) => {
    let auth = useContext(AuthContext)
    // let [userId, setUserId] = useState()
    let [notifsArray, setNotifsArray] = useState()
    let [newNotifs, setNewNotifs] = useState(false)


    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/userorders/"', + auth.getUser()?.id, {method: "GET", headers: {Authorization: `Bearer ${auth.getToken()}`}})
        .then(response => response.json())
        .then((result)=>{setNotifsArray(result)})
        .then(() => console.log(notifsArray))
    }, [newNotifs])

    
    let displayNotifs = ()=> {};
    
    let getNotifsArray = ()=> notifsArray;
    let testing = () => "aaa"

    return (
        <NotifContext.Provider value={{ getNotifsArray, testing }}>{children}</NotifContext.Provider>
    );

}

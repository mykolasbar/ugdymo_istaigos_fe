import React, { useState, useEffect, useContext, useRef, useCallback }  from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth"
import { NotifProvider, NotifContext } from './NotifContext';

const Requests = () => {

    let [orders, setOrders] = useState([])
    let [data, setData] = useState({})
    let [refresh, setRefresh] = useState(false)
    let auth = useContext(AuthContext)
    let notif = useContext(NotifContext)
    let [reversed, setReversed] = useState(false)
    let [orderId, setOrderId] = useState('')


    useEffect(() => {
        fetch("https://ugdymo-istaiga.fly.dev/api/showallrequests", {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
        .then((result) => {setOrders(orders = result); console.log(orders)})
    }, [refresh]);

    let confirmReservation = (orderId) => {
        // event.preventDefault()
        fetch("https://ugdymo-istaiga.fly.dev/api/confirmrequest/" + orderId, {method: 'PUT', headers: { Authorization: `Bearer ${auth.getToken()}` }})
        .then(() => {
            notif.setNotifications()
            notif.newRequests()
            setData({})
            setRefresh(!refresh)})
    }

    let sortByX = () => {
        setReversed(!reversed)
        orders.sort((a, b) => {return reversed ? a.price-b.price : b.price-a.price})
        setOrders([...orders])
    }

    return (
        <>
            {orders.length == 0? <div style = {{padding:"30px"}}>Šiuo metu prašymų nėra. Kai atsiras naujų prašymų, juos matysite čia.</div> : 
            <table className = "table-borderless m-3">
                <thead>
                    <tr><td>Visi prašymai <span className = "text-primary">({orders.length})</span></td></tr>
                    <tr><td><b>Prašymo ID</b></td><td onClick={()=>sortByX()}><b>Mokinys</b></td><td><b>Mokykla</b></td><td><b>Statusas</b></td></tr>
                </thead>
                <tbody>
                    {orders.map((order) => 
                    <tr id = "adminrow" key = {order.id} style = {{fontSize: "1rem", height: "60px"}} className = "m-2"> 
                        <td className = "w-25 p-2">{order.id}</td>
                        <td className = "w-25 p-2">{order.requests.name}</td>
                        <td className = "w-25 p-2">{order.schools.title}</td>
                        <td className = "w-25 p-2">{(order.confirmed == 0) ? <input name = {order.id} type = "submit" value = "Patvirtinti užsakymą" className="btn btn-dark btn-sm m-2" onClick={(event) => {confirmReservation(order.id, order.schools.title)}}></input> : <strong>Patvirtinta</strong>}</td>    
                    </tr>)}
                    <tr></tr>
                </tbody>
            </table>}
        </>
    );
};

export default Requests;
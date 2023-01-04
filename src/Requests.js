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
        fetch("http://127.0.0.1:8000/api/showallrequests/", {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
        .then((result) => {setOrders(orders = result); console.log(orders)})
    }, [refresh]);

    let confirmReservation = (orderId, schoolTitle) => {
        // event.preventDefault()
        fetch("http://127.0.0.1:8000/api/confirmrequest/" + orderId, {method: 'PUT'})
        // .then(console.log(JSON.stringify(data)))
        .then(() => {
            notif.setNotifications(schoolTitle)
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
            <table className = "table-borderless m-3">
                <thead><tr><td>Visi prašymai <span className = "text-primary">({orders.length})</span></td></tr></thead>
                <tbody>
                <tr><td><b>Prašymo ID</b></td><td onClick={()=>sortByX()}><b>Mokinys</b></td><td><b>Mokykla</b></td><td><b>Statusas</b></td></tr>
                {orders.map((order) => 
                <tr id = "adminrow" key = {order.id} style = {{fontSize: "1rem", height: "110px"}} className = "m-2 p-2"> 
                    <td className = "w-25 m-2 p-3">{order.id}</td>
                    <td className = "w-25 m-2">{order.requests.name}</td>
                    <td className = "w-25 m-2">{order.schools.title}</td>
                    <td className = "w-25 m-2">{(order.confirmed == 0) ? <td><input name = {order.id} type = "submit" value = "Patvirtinti užsakymą" className="btn btn-dark btn-sm m-2" onClick={(event) => {confirmReservation(order.id, order.schools.title)}}></input></td> : <strong>Patvirtinta</strong>}</td>    
                </tr>)}
                </tbody>
            </table>
        </>
    );
};

export default Requests;
import React, { useState, useEffect, useContext }  from 'react';
import { AuthContext, AuthProvider } from "./Auth"
import { NotifProvider, NotifContext } from './NotifContext';
import Header from './header';

const MyOrders = () => {
    let auth = useContext(AuthContext)
    let notif = useContext(NotifContext)
    const [loading, setLoading] = useState(false)
    let [orders, setOrders] = useState([])
    let [userId, setUserId] = useState()


    useEffect(()=>{
        setUserId(auth.getUser()?.id)
    })

    useEffect(() => {
        setLoading(true)
        let id = auth.getUser()?.id;
        fetch("https://ugdymoistaigosbe.herokuapp.com/api/userorders/" + userId, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
        .then((result) => {setOrders(orders = result); notif.setNotifications()})
        .then(()=>setLoading(false))
        }, [userId, notif.requestsAdded()]);

    return (
        <>
            {loading ? <div style = {{height:"50vw", width: "100%", display:"flex", justifyContent:"center", alignItems:"center"}}>Turinys kraunasi <span className="material-symbols-outlined">hourglass_top</span></div> :
            (orders.length > 0 ? 
            <table className = "p-4 w-100">
                <thead style={{fontWeight:"bold", backgroundColor:"#e38e84"}}><tr><td style={{padding:"12px"}}>Užsakymo ID</td><td>Mokinio vardas, pavardė</td><td>Mokinio asmens kodas</td><td>Mokinio klasė</td><td>Užsakymo statusas</td></tr></thead>
                <tbody>
                { orders.map((order) => 
                <tr id = "adminrow" className = "m-4" key = {order.id}> 
                    <td style={{padding:"24px"}}>{order.id}</td><td>{order.requests.name}</td><td>{order.requests.idnumber}</td><td>{order.requests.class}</td><td>{order.confirmed ? "Patvirtinta" : "Laukiama patvirtinimo"}</td>
                </tr>) 
                }<tr></tr></tbody>
            </table> : 
            <div style={{padding:"10px"}}>Kol kas nepadarėte jokių užsakymų.</div>)}
        </>
    );
};

export default MyOrders;
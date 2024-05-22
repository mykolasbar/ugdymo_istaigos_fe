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
        fetch("https://ugdymo-istaiga.fly.dev/api/userorders/" + userId, {method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.getToken()}` }})
        .then(response => response.json())
        .then((result) => {setOrders(orders = result); notif.setNotifications()})
        .then(()=>setLoading(false))
        }, [userId, notif.requestsAdded()]);

    return (
        <>
            {loading ? <div style = {{height:"50vw", width: "100%", display:"flex", justifyContent:"center", alignItems:"center"}}>Turinys kraunasi <span className="material-symbols-outlined">hourglass_top</span></div> :
            (orders.length > 0 ?
            <div style={{width:"100%", display:"inline-grid", flexWrap:"wrap", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gridAutoRows:"200px", rowGap:"20px", justifyItems:"center"}}>
                {orders.map((order, index) =>
                    <div key = {order.id} style = {{margin: "8px", backgroundSize: "cover", backgroundPosition: "center", maxWidth:"300px"}}>
                        <div style ={{padding:"8px", backgroundColor: "#ebfaf9", borderRadius: "10px 10px 10px 10px", minHeight:"200px", }}>
                            <b>Užsakymo ID: </b> {order.id} <br/> <b>Mokinio vardas, pavardė: </b>{order.requests.name} <br/> <b>Mokinio asmens kodas: </b>{order.requests.idnumber} <br/> <b>Klasė: </b>{order.requests.class} <br /><b>Užsakymo statusas:</b> {order.confirmed ? "Patvirtinta" : "Laukiama patvirtinimo"}
                        </div>
                    </div>)}
            </div>
            : 
            <div style={{padding:"10px"}}>Kol kas nepadarėte jokių užsakymų.</div>)}
        </>
    );
};

export default MyOrders;
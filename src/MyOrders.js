import React, { useState, useEffect, useContext }  from 'react';
import { AuthContext, AuthProvider } from "./Auth"
import Header from './header';

const MyOrders = () => {
    let auth = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    let [orders, setOrders] = useState([])
    let [userId, setUserId] = useState()


    useEffect(()=>{
        setUserId(auth.getUser()?.id)
    })


    useEffect(() => {
        setLoading(true)
        let id = auth.getUser()?.id;
        fetch("http://127.0.0.1:8000/api/userorders/" + userId, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
        .then((result) => {setOrders(orders = result)})
        .then(()=>setLoading(false))
        .then(() => {console.log(orders)})
        }, [userId]);

    return (
        <>
            {loading ? <div style = {{height:"50vw", display:"flex", justifyContent:"center", alignItems:"center"}}>Turinys kraunasi <span className="material-symbols-outlined">hourglass_top</span></div> :
            <table className = "p-4 w-100">
                <thead style={{fontWeight:"bold", backgroundColor:"#e38e84"}}><td style={{padding:"12px"}}>Užsakymo ID</td><td>Mokinio vardas, pavardė</td><td>Mokinio asmens kodas</td><td>Mokinio klasė</td><td>Užsakymo statusas</td></thead>
            { orders.map((order) => 
                <tr className = "m-4" key = {order.id}> 
                    <td style={{padding:"24px"}}>{order.id}</td> <td>{order.requests.name}</td> <td>{order.requests.idnumber}</td> <td>{order.requests.class}</td> <td>{order.confirmed ? "Patvirtinta" : "Laukiama patvirtinimo"}</td>
                </tr>) 
                    }
            </table>}
        </>
    );
};

export default MyOrders;
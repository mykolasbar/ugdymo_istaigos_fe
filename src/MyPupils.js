import React, { useState, useEffect, useContext }  from 'react';
import Header from './header';
import { AuthContext, AuthProvider } from "./Auth"


const MyPupils = () => {
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
        fetch("http://127.0.0.1:8000/api/userpupils/" + userId, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
        .then((result) => {setOrders(orders = result)})
        .then(()=>setLoading(false))
        .then(() => {console.log(orders)})
        }, [userId]);

    return (
        <>
            {loading ? <div style = {{height:"50vw", display:"flex", justifyContent:"center", alignItems:"center"}}>Turinys kraunasi <span className="material-symbols-outlined">hourglass_top</span></div> :
            <table className = "p-4 w-100">
                <thead style={{fontWeight:"bold", backgroundColor:"#42e3f5"}}><td style={{padding:"12px"}}>Mokinio ID sistemoje</td><td>Mokinio vardas, pavardė</td><td>Mokinio asmens kodas</td><td>Mokinio klasė</td></thead>
            { orders.map((order) => 
                <tr className = "m-4" key = {order.id}> 
                    <td style={{padding:"12px"}}>{order.id}</td> <td>{order.name}</td> <td>{order.idnumber}</td> <td>{order.class}</td>
                </tr>) 
                    }
            </table>}
        </>
    );
};

export default MyPupils;
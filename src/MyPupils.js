import React, { useState, useEffect, useContext }  from 'react';
import { Link, useNavigate } from "react-router-dom";
import Header from './header';
import { AuthContext, AuthProvider } from "./Auth"
import EditPupil from './EditPupil';
import DeletePrompt from './deletePrompt';


const MyPupils = () => {
    let auth = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    let [orders, setOrders] = useState([])
    let [userId, setUserId] = useState()
    let [refresh, setRefresh] = useState(false)
    let [showEditModal, setShowEditModal] = useState(false)
    let [showDeleteModal, setShowDeleteModal] = useState(false)
    let [pupilData, setPupilData] = useState({})
    let [deletionId, setDeletionId] = useState(false)

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
        }, [userId, refresh]);

    let closeModal = () => {
        showEditModal && setShowEditModal(false)
        showDeleteModal && setShowDeleteModal(false)
    }

    let refreshing = () => {
        const timer = setTimeout(() => {setRefresh(!refresh)}, 1500);
        return () => clearTimeout(timer);
    }

    return (
        <>
            {(showDeleteModal === true || showEditModal === true) && <div style={{width:"100vw", height:"100vh", position:"fixed", backgroundColor:"grey", opacity:"0.6", zIndex:"4000"}}></div>}
            {loading ? (<div style = {{height:"50vw", width: "100%", display:"flex", justifyContent:"center", alignItems:"center"}}>Turinys kraunasi <span className="material-symbols-outlined">hourglass_top</span></div>) :
                (orders.length > 0 ? <table className = "p-4 w-100" style={{zIndex:"3000"}}>
                    <thead style={{fontWeight:"bold", backgroundColor:"#42e3f5"}}><td style={{padding:"12px"}}>Mokinio ID sistemoje</td><td>Mokinio vardas, pavardė</td><td>Mokinio asmens kodas</td><td>Mokinio klasė</td><td></td><td></td></thead>
                    {orders.map((order) => 
                    <tr id = "adminrow" className = "m-4" key = {order.id}> 
                        <td style={{padding:"12px"}}>{order.id}</td> 
                        <td>{order.name}</td> <td>{order.idnumber}</td> 
                        <td>{order.class}</td> 
                        <td><input className="btn btn-danger btn-sm m-2 rounded-0" type = "button" onClick = {() => {setDeletionId(deletionId=order.id); setShowDeleteModal(true)}} value = "Trinti mokinį"></input></td>
                        <td><button className="btn btn-dark btn-sm m-2 rounded-0" onClick={()=>{setPupilData(pupilData=order); setShowEditModal(true)}}>Atnaujinti mokinio duomenis</button></td>
                    </tr>
                    )
                }
                </table> : <div style={{padding:"10px"}}>Pridėtų mokinių nėra.</div>)}
                {showEditModal && <EditPupil pupilData={pupilData} closeModal = {closeModal} refreshing = {refreshing}/>}
                {showDeleteModal && <DeletePrompt deletionId={deletionId} closeModal = {closeModal} refreshing = {refreshing}/>}

        </>
    );
};

export default MyPupils;
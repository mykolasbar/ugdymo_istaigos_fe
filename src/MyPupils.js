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
        fetch("https://ugdymoistaigosbe.herokuapp.com/api/userpupils/" + userId, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
        .then((result) => {setOrders(orders = result)})
        .then(()=>setLoading(false))
        }, [userId, refresh]);

    let closeModal = () => {
        showEditModal && setShowEditModal(false)
        showDeleteModal && setShowDeleteModal(false)
    }

    let refreshing = () => {
        const timer = setTimeout(() => {setRefresh(!refresh)}, 1500);
        return () => clearTimeout(timer);
    }

    let disableScroll = () => {
        document.body.classList.add("stop-scrolling");
    }
    
    let enableScroll = () => {
        document.body.classList.remove("stop-scrolling");
    }

    return (
        <>
            {(showDeleteModal === true || showEditModal === true) && <div style={{width:"100vw", height:"100vh", position:"fixed", backgroundColor:"grey", top: "0%", opacity:"0.6", zIndex:"1000"}}></div>}
            {loading ? (<div style = {{height:"50vw", width: "100%", display:"flex", justifyContent:"center", alignItems:"center"}}>Turinys kraunasi <span className="material-symbols-outlined">hourglass_top</span></div>) :
                (orders.length > 0 ? 
                <table className = "p-4 w-100" style={{zIndex:"900"}} id = "itemstable">
                    <thead style={{fontWeight:"bold", backgroundColor:"#42e3f5"}}><tr><td style={{padding:"12px"}}>Mokinio ID sistemoje</td><td>Mokinio vardas, pavard??</td><td>Mokinio asmens kodas</td><td>Mokinio klas??</td><td></td><td></td></tr></thead>
                    <tbody>
                        {orders.map((order) => 
                        <tr id = "adminrow" className = "m-4" key = {order.id}> 
                            <td style={{padding:"12px"}}>{order.id}</td> 
                            <td>{order.name}</td><td>{order.idnumber}</td> 
                            <td>{order.class}</td> 
                            <td><input className="btn btn-danger btn-sm m-3 rounded-0" type = "button" onClick = {() => {setDeletionId(deletionId=order.id); setShowDeleteModal(true); disableScroll()}} value = "Trinti mokin??"></input></td>
                            <td><button className="btn btn-dark btn-sm m-3 rounded-0" onClick={()=>{setPupilData(pupilData=order); setShowEditModal(true); disableScroll()}}>Atnaujinti mokinio duomenis</button></td>
                        </tr>
                        )
                        }<tr></tr>
                    </tbody>
                </table> : 
                <div style={{padding:"10px"}}>Prid??t?? mokini?? n??ra.</div>)}
                {showEditModal && <EditPupil pupilData={pupilData} closeModal = {closeModal} refreshing = {refreshing} enableScroll = {enableScroll}/>}
                {showDeleteModal && <DeletePrompt deletionId={deletionId} closeModal = {closeModal} refreshing = {refreshing} enableScroll = {enableScroll}/>}

        </>
    );
};

export default MyPupils;
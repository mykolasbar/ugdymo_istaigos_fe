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
        fetch("https://ugdymoistaigosbe.herokuapp.com/api/userpupils/" + userId, {method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.getToken()}` }})
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
                <div style={{width:"100%", display:"inline-grid", flexWrap:"wrap", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gridAutoRows:"270px", rowGap:"20px", justifyItems:"center"}}>
                    {orders.map((order, index) =>
                        <div key = {order.id} style = {{margin: "8px", backgroundSize: "cover", backgroundPosition: "center", minWidth:"200px", maxWidth:"600px"}}>
                            <div style = {{backgroundColor: "black", color: "white", borderRadius: "10px 10px 0 0", padding: "8px", width: "100%"}}>{order.name}</div>
                            <div style ={{padding:"8px", backgroundColor: "#ebfaf9", borderRadius: "0 0 10px 10px", minHeight:"240px", }}>
                                <div style={{minHeight:"120px"}}><b>Mokinio vardas, pavardė: </b> {order.name} <br/> <b>Mokyklos adresas: </b>{order.idnumber} <br/> <b>Gimimo data: </b>{order.dateofbirth} <br/> <b>Klasė: </b>{order.class} </div> 
                                <input className="btn btn-danger btn-sm mt-2 rounded-0" type = "button" onClick = {() => {setDeletionId(deletionId=order.id); setShowDeleteModal(true); disableScroll()}} value = "Trinti mokinį"></input>
                                <button className="btn btn-dark btn-sm mt-2 rounded-0" onClick={()=>{setPupilData(pupilData=order); setShowEditModal(true); disableScroll()}}>Atnaujinti mokinio duomenis</button>
                            </div>
                        </div>
                    )}
                </div>
                : 
                <div style={{padding:"10px"}}>Pridėtų mokinių nėra.</div>)}
                {showEditModal && <EditPupil pupilData={pupilData} closeModal = {closeModal} refreshing = {refreshing} enableScroll = {enableScroll}/>}
                {showDeleteModal && <DeletePrompt deletionId={deletionId} closeModal = {closeModal} refreshing = {refreshing} enableScroll = {enableScroll}/>}

        </>
    );
};

export default MyPupils;
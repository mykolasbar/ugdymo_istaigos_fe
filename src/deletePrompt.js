import React, { useState, useEffect, useContext }  from 'react';
import { AuthContext, AuthProvider } from "./Auth"


const DeletePrompt = (props) => {

    let auth = useContext(AuthContext)
    let [deleteSuccess, setDeleteSuccess] = useState(false)

    let handleDelete = (id) => {
        console.log(id)
        fetch("https://ugdymoistaigosbe.herokuapp.com/api/deletepupil/" + props.deletionId, {method: 'DELETE', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.getToken()}` }})
        .then(()=>setDeleteSuccess(true))
        .then(()=>props.enableScroll())
        .then(()=>{props.refreshing()})
    }

    useEffect(() => {
        const timer = setTimeout(() => {deleteSuccess && props.closeModal()}, 1500);
        return () => clearTimeout(timer);
      }, [deleteSuccess]);


    return (
        <>
        {deleteSuccess ? <div  style = {{padding:"30px 40px", border: "1px solid grey", borderRadius: "10px", position: "fixed", backgroundColor:"white", top:"30%"}}>Mokinys ištrintas iš sistemos</div> :
        <div style = {{width:"320px", padding:"30px 40px", border: "1px solid grey", borderRadius: "10px", position: "fixed", backgroundColor:"white", left:"calc(50vw - 160px)", top:"30%", zIndex:"5000"}}>
            <div>Ar tikrai norite ištrinti mokinį?</div>
            <div style={{display:"flex", flexDirection:"row"}}>
                <input className="btn btn-dark btn-sm m-2 rounded-0" style={{width:"100px"}} onClick = {() => {handleDelete()}} value = "Trinti mokinį"></input>
                <input className="btn btn-danger btn-sm m-2 rounded-0" style={{width:"100px"}} onClick={()=>{props.closeModal(); props.enableScroll()}} value = "Atšaukti"></input>
            </div>
        </div>}
        </>
    );
};

export default DeletePrompt;
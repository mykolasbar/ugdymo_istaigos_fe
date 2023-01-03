import React, { useState, useEffect, useContext, useRef }  from 'react';
import { AuthContext } from "./Auth"
import Header from './header';
import { Link, useNavigate, useParams } from "react-router-dom";

const EditPupil = (props) => {

    let navigate = useNavigate('')
    let [refresh, setRefresh] = useState(false)
    let [schools, setSchools] = useState([])
    let auth = useContext(AuthContext)
    let [data, setData] = useState({})
    let [status, setStatus] = useState('');
    let [showNotif, setShowNotif] = useState(false);
    let { id } = useParams();
    let [pupil, setPupil] = useState([])
    let [deleteSuccess, setDeleteSuccess] = useState(false)


    const handleData = (event) => {
        setData({...data, [event.target.name] : event.target.value, user_id : auth.getUser()?.id})
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://127.0.0.1:8000/api/editpupil/" + props.pupilData.id + "?_method=put", {method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.getToken()}` }, body: JSON.stringify(data)})
        .then(response => response.json())
        .then((response) => {if (response.message ==  "Mokinys pridėtas sėkmingai") {setStatus(status = "Mokinys atnaujintas sėkmingai"); setShowNotif(!showNotif); console.log(status)}; if (response.message ==  "Toks mokinys jau yra") {setStatus(status = "Toks mokinys jau yra"); setShowNotif(!showNotif); console.log(status)}})
        // .then((response) => {if (status == "Mokinys pridėtas sėkmingai") {setTimeout(() => navigate("/user"), 4000)}})
        .then(()=>setDeleteSuccess(true))
        .then(()=>props.enableScroll())
        .then(()=>{props.refreshing()})

    }

    useEffect(() => {
        const timer = setTimeout(() => {
        if (showNotif)
          setShowNotif(false)
        }, 2000);
        return () => clearTimeout(timer);
    }, [status]);

    useEffect(() => {
        const timer = setTimeout(() => {deleteSuccess && props.closeModal()}, 2000);
        return () => clearTimeout(timer);
    }, [deleteSuccess]);

        
    return (
        <>
            <form onSubmit = { handleSubmit } className = "container p-4 mt-5" id = "pupilwindow">
                <span style = {{display: showNotif ? "block" : "none", position: "absolute"}}>{status}</span>
                <span className = "card border-0 mt-4"><h3>Atnaujinti mokinio duomenis</h3></span>
                <div className="form-group mt-2">
                    <input className="form-control" type = "text" defaultValue = {props.pupilData.idnumber} name = "idnumber" onChange={handleData} placeholder = "Asmens kodas"></input>
                </div>
                <div className="form-group mt-2">
                    <input className="form-control h-75" type = "text" defaultValue = {props.pupilData.name} name = "name" onChange={handleData} placeholder = "Vardas, pavardė"></input>
                </div>
                <div className="form-group mt-2">
                    <input className="form-control h-75" type = "text" defaultValue = {props.pupilData.class} name = "class" onChange={handleData}  placeholder = "Klasė"></input>
                </div>
                <input type = "submit" value = "Pridėti" className="btn btn-dark btn-sm m-2" style={{width:"100px"}}></input>
                <input value = "Atšaukti" className="btn btn-danger btn-sm m-2" onClick={()=>{props.closeModal(); props.enableScroll()}} style={{width:"100px"}}></input>
            </form>
        </>
    );
};

export default EditPupil;

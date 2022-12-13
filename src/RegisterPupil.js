import React, { useState, useEffect, useContext, useRef }  from 'react';
import { AuthContext } from "./Auth"
import Header from './header';
import { Link, useNavigate, useParams } from "react-router-dom";

const RegisterPupil = () => {

    let navigate = useNavigate('')
    let [refresh, setRefresh] = useState(false)
    let [schools, setSchools] = useState([])
    let auth = useContext(AuthContext)
    let [data, setData] = useState({})
    let [status, setStatus] = useState('');
    let [showNotif, setShowNotif] = useState(false);
    let [pupils, setPupils] = useState([])
    let [pupilId, setPupilId] = useState('')
    let [pupil, setPupil] = useState([])




    const handleData = (event) => {
        setData({...data, [event.target.name] : event.target.value, user_id : auth.getUser()?.id})
    }

    useEffect(() => {
        let id = auth.getUser()?.id;
        fetch("http://127.0.0.1:8000/api/pupils/" + id, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
        .then((result) => {setPupils(pupils = result)})
        }, [refresh]);

    useEffect(() => {
        if (pupilId != '') {
        fetch("http://127.0.0.1:8000/api/pupil/" + pupilId, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
        .then((result) => {setPupil(pupil = result)})}
        }, [pupilId]);
    

    let handleSubmit = (e) => {
        let id = auth.getUser()?.id;
        e.preventDefault();
        fetch("http://127.0.0.1:8000/api/newpupil/", {method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.getToken()}` }, body: JSON.stringify(data)})
        .then(response => response.json())
        .then((response) => {if (response.message ==  "Mokinys pridėtas sėkmingai") {setStatus(status = "Mokinys pridėtas sėkmingai"); setShowNotif(!showNotif); console.log(status)}; if (response.message ==  "Toks mokinys jau yra") {setStatus(status = "Toks mokinys jau yra"); setShowNotif(!showNotif); console.log(status)}})
        .then((response) => {if (status == "Mokinys pridėtas sėkmingai") {
        setTimeout(() => navigate("/"), 4000)
    }})
    }

    useEffect(() => {
        const timer = setTimeout(() => {
        if (showNotif)
          setShowNotif(false)
        }, 2000);
        return () => clearTimeout(timer);
      }, [status]);

        
    return (
        <>

        <Header />
            <form onSubmit = { handleSubmit } className = "container p-4 mt-5 w-50" style = {{border: "1px solid grey", borderRadius: "10px"}}>
                <label><b>Pasirinkite mokinį</b></label> 
                <select name = "requests_id" className="form-control  mb-2 mt-2" onChange={(event)=>{setPupilId(pupilId = event.target.value); console.log(pupilId); setData({ ...data, 'requests_id': event.target.value })}}>
                    <option value="N/A" className="form-control" ></option>
                    { pupils.map((pupil) => 
                    <option name = "requests_id" className = "m-4" key = {pupil.id} value = {pupil.id}> 
                    {pupil.id} {pupil.name}
                    </option>) 
                    }
                </select> 
                arba
                <span style = {{display: showNotif ? "block" : "none", position: "absolute"}}>{status}</span>
                <span className = "card border-0 mt-1"><b>Pridėkite naują mokinį</b></span>
                <div className="form-group mt-2">
                    <label>Asmens kodas</label>
                    <input className="form-control" type = "text" name = "idnumber" onChange={handleData} placeholder = "Asmens kodas" defaultValue = { pupilId != '' ? pupil.idnumber : "" }></input>
                </div>
                <div className="form-group mt-2">
                    <label>Vardas, pavardė</label>
                    <input className="form-control h-75" type = "text" name = "name" onChange={handleData} placeholder = "Vardas, pavardė" defaultValue = { pupilId != '' ? pupil.name : "" }></input>
                </div>
                <div className="form-group mt-2">
                    <label>Klasė</label>
                    <input className="form-control h-75" type = "text" name = "class" onChange={handleData}  placeholder = "Klasė" defaultValue = { pupilId != '' ? pupil.class : "" }></input>
                </div>
                <input type = "submit" value = "Pridėti" className="btn btn-dark btn-sm m-2"></input>
            </form>
        </>
    );
};

export default RegisterPupil;

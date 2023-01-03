import React, { useState, useEffect, useContext }  from 'react';
import { AuthContext } from "./Auth"
import Header from './header';
import { useNavigate, useParams } from "react-router-dom";

const RegisterPupil = (props) => {

    let navigate = useNavigate()
    let [refresh, setRefresh] = useState(false)
    let [schools, setSchools] = useState([])
    let auth = useContext(AuthContext)
    let [data, setData] = useState({})
    let [status, setStatus] = useState('');
    let [showNotif, setShowNotif] = useState(false);
    let [pupils, setPupils] = useState([])
    let [pupilId, setPupilId] = useState('')
    let [pupil, setPupil] = useState([])
    let [userId, setUserId] = useState()


    useEffect(()=>{
        setUserId(auth.getUser()?.id)
        console.log(props.schoolId)
    })

    const handleData = (event) => {
        setData({...data, [event.target.name] : event.target.value, user_id : auth.getUser()?.id})
    }

    useEffect(() => {
        let id = auth.getUser()?.id;
        fetch("http://127.0.0.1:8000/api/pupils/" + userId, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
        .then((result) => {setPupils(pupils = result)})
        }, [userId]);

    useEffect(() => {
        if (pupilId != '') {
        fetch("http://127.0.0.1:8000/api/pupil/" + pupilId, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
        .then((result) => {setPupil(pupil = result)})}
        }, [pupilId]);
    

    let handleSubmit = (e) => {
        e.preventDefault();
        pupilId !== '' ? 
            fetch("http://127.0.0.1:8000/api/newrequest/", {method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.getToken()}` }, body: JSON.stringify({'requests_id' : pupilId, 'schools_id' : props.schoolId})})
            .then(()=>{setStatus(status = "Mokinys užregistruotas sėkmingai"); setShowNotif(!showNotif)})
            .then(() => {if (status === "Mokinys užregistruotas sėkmingai") {setTimeout(() => {props.closeModal(); props.enableScroll(); navigate('/customer')}, 4000)}})
            :
            fetch("http://127.0.0.1:8000/api/newpupil/", {method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.getToken()}` }, body: JSON.stringify(data)})
            .then(response => response.json())
            .then(response => {if (response.message ==  "Mokinys pridėtas sėkmingai") {
                fetch("http://127.0.0.1:8000/api/newrequest/", {method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.getToken()}` }, body: JSON.stringify({'schools_id' : props.schoolId})})
                setStatus(status = "Mokinys užregistruotas sėkmingai"); setShowNotif(!showNotif)}
                if (response.message ==  "Toks mokinys jau yra") {setStatus(status = "Toks mokinys jau yra")}
            })
            .then(() => {if (status === "Mokinys užregistruotas sėkmingai") {setTimeout(() => {props.closeModal(); props.enableScroll()}, 4000)}})
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
            <form id = "pupilwindow" className = "container p-4 mt-5">
            {showNotif && status}<br/>
                <label><b>Pasirinkite mokinį</b></label> 
                <select name = "requests_id" className="form-control  mb-2 mt-2" onChange={(event)=>{setPupilId(pupilId = event.target.value); console.log(pupilId)}}>
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
                    <input type = "submit" value = "Pridėti" className="btn btn-dark btn-sm m-2" onClick = {handleSubmit}></input>
                    <input type = "submit" value = "Atšaukti" className="btn btn-danger btn-sm m-2" onClick={()=>{props.closeModal(); props.enableScroll()}}></input>
            </form>
        </>
    );
};

export default RegisterPupil;

// ; setData({ ...data, 'requests_id': event.target.value, 'schools_id': id })

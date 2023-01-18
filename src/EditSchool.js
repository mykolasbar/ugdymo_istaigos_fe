import React, { useState, useEffect, useContext, useRef }  from 'react';
import { AuthContext } from "./Auth"
import Header2 from './header2';
import { Link, useNavigate, useParams } from "react-router-dom";


const EditSchool = () => {

    let { id } = useParams();
    let [data, setData] = useState({})
    let [school, setSchool] = useState([])
    let navigate = useNavigate('')
    let [refresh, setRefresh] = useState(false)
    let auth = useContext(AuthContext)
    let [status, setStatus] = useState('')
    let [showNotif, setShowNotif] = useState(false)

    var formData = new FormData();

    let handleSubmit = (event) => {
        event.preventDefault()
        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1])
        }
        fetch("https://ugdymoistaigosbe.herokuapp.com/api/school/" + id + "?_method=put", {method: 'POST', headers: { Authorization: `Bearer ${auth.getToken()}` }, body: formData})
        // .then(response => console.log(response.status))
        // .then(response => response.json())
        .then(response=>{if (response.status) setStatus('Mokykla atnaujinta sėkmingai.'); setShowNotif(true)})
        // .then(() => {
        //     navigate("/admin");
        // });
    }

    useEffect(() => {
        fetch("https://ugdymoistaigosbe.herokuapp.com/api/school/" + id, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
        .then((result) => {setSchool(school = result)})
        }, [refresh]);

 
    return (
        <>            
        <Header2 />
        <div className="d-flex aligns-items-center justify-content-center">   
            <div className=" w-75 m-3">
                <span className = "card border-0 m-2"><h3>Atnaujinti mokyklos duomenis</h3></span>
                {<form onSubmit = { handleSubmit }>
                    <div className="form-group m-2">
                        <input className="form-control" type = "text" defaultValue = {school.title} name = "title" onChange={(event) => formData.append('title', event.target.value)}></input>
                        {/* <input className="form-control"  type = "text" name = "title" onChange={(event) => setData({...data, 'title': event.target.value})} placeholder = "Mokyklos pavadinimas"></input> */}
                    </div>
                    <div className="form-group m-2">
                        <input className="form-control" type = "text" defaultValue = {school.code}  name = "code" onChange={(event) => formData.append('code', event.target.value)}></input>
                        {/* <input className="form-control" type = "text" name = "code" onChange={(event) => setData({...data, 'code': event.target.value})} placeholder = "Mokyklos kodas"></input> */}
                    </div>
                    <div className="form-group m-2">
                        <input className="form-control" type = "file" name = "picture" onChange={(event) => formData.append('picture', event.target.files[0])} placeholder="Nuotrauka"></input>
                    </div>
                    <div className="form-group m-2">
                        <input className="form-control" type = "text"  defaultValue = {school.address} name = "address" onChange={(event) => formData.append('address', event.target.value)}></input>
                    </div>
                    <div className="form-group m-2">
                        <input className="btn btn-dark mt-3 rounded-1" type = "submit" value = "Atnaujinti"></input>
                    </div>
                </form>}
                {showNotif && <span style = {{color:"blue"}} className="m-2 mt-4">{status} <Link to ="/admin">Grįžti į mokyklų sąrašą.</Link></span>}
            </div>
        </div>
    </>
    );
};

export default EditSchool;
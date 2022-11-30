import React, { useState, useEffect, useContext, useRef }  from 'react';
import { AuthContext } from "./Auth"
import Header from './header';
import { Link, useNavigate, useParams } from "react-router-dom";


const EditSchool = () => {

    let { id } = useParams();
    let [data, setData] = useState({})
    let [school, setSchool] = useState([])
    let navigate = useNavigate('')
    let [refresh, setRefresh] = useState(false)

    // var formData = new FormData();

    let handleSubmit = (event) => {
        event.preventDefault()
        console.log(JSON.stringify(data))
        fetch("http://127.0.0.1:8000/api/school/" + id, {method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)})
        .then(response => console.log(response))
        .then(() => {
                // navigate("/admin");
        });
    }

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/school/" + id, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
        .then((result) => {setSchool(school = result)})
        }, [refresh]);

 
    return (
        <>            
        <Header />
        <div className="d-flex aligns-items-center justify-content-center">   
            <div className=" w-75 m-3">
                <span className = "card border-0 m-2"><h3>Atnaujinti mokyklos duomenis</h3></span>
                {<form onSubmit = { handleSubmit }>
                    <div className="form-group m-2">
                        {/* <input className="form-control" defaultValue = { school.title } type = "text" name = "title" onChange={(event) => formData.append('title', event.target.value)}></input> */}
                        <input className="form-control" defaultValue = { school.title } type = "text" name = "title" onChange={(event) => setData({...data, title: event.target.value})}></input>
                    </div>
                    <div className="form-group m-2">
                        <input className="form-control" defaultValue = { school.code } type = "text" name = "code" onChange={(event) => setData({...data, code: event.target.value})}></input>
                    </div>
                    <div className="form-group m-2">
                    </div>
                    <div className="form-group m-2">
                        <input className="form-control" defaultValue = { school.address } type = "text" name = "address" onChange={(event) =>  setData({...data, address: event.target.value})}></input>
                    </div>
                    <div className="form-group m-2">
                    <input className="btn btn-dark mt-3 rounded-1" type = "submit" value = "Išsaugoti mokyklos duomenis"></input>
                    </div>
                </form>}
            </div>
        </div>
    </>
    );
};

export default EditSchool;
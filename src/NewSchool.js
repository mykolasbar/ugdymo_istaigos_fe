import React, { useState, useEffect, useContext, useRef }  from 'react';
import { AuthContext } from "./Auth"
import Header from './header';
import { Link, useNavigate, useParams } from "react-router-dom";

const NewSchool = () => {

    let [data, setData] = useState({})
    let auth = useContext(AuthContext)


    let handleSubmit = (event) => {
        event.preventDefault()
        fetch("http://127.0.0.1:8000/api/addschool/", {method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.getToken()}` }, body: JSON.stringify(data)})
        .then(response=>response.json())
        .then(result => {
            console.log(result)
        setData({})
        })
    }

    return (
        <>
        <div className="d-flex aligns-items-center justify-content-center">   
            <div className=" w-75 m-3">
                <span className = "card border-0 m-2"><h3>Pridėti naują mokyklą</h3></span>
                {<form onSubmit = { handleSubmit }>
                    <div className="form-group m-2">
                        {/* <input className="form-control" defaultValue = { school.title } type = "text" name = "title" onChange={(event) => formData.append('title', event.target.value)}></input> */}
                        <input className="form-control"  type = "text" name = "title" onChange={(event) => setData({...data, 'title': event.target.value})} placeholder = "Mokyklos pavadinimas"></input>
                    </div>
                    <div className="form-group m-2">
                        <input className="form-control" type = "text" name = "code" onChange={(event) => setData({...data, 'code': event.target.value})} placeholder = "Mokyklos kodas"></input>
                    </div>
                    <div className="form-group m-2">
                    </div>
                    <div className="form-group m-2">
                        <input className="form-control" type = "text" name = "address" onChange={(event) =>  setData({...data, 'address': event.target.value})} placeholder = "Mokyklos adresas"></input>
                    </div>
                    <div className="form-group m-2">
                    <input className="btn btn-dark mt-3 rounded-1" type = "submit" value = "Pridėti mokyklą"></input>
                    </div>
                </form>}
            </div>
        </div>

        </>
    );
};

export default NewSchool;
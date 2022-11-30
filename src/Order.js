import React, { useState, useEffect, useContext, useRef }  from 'react';
import { AuthContext } from "./Auth"
import Header from './header';
import { Link, useNavigate, useParams } from "react-router-dom";

const Order = () => {

    let { id } = useParams();
    let [post, setPost] = useState([])
    let navigate = useNavigate('')
    let [refresh, setRefresh] = useState(false)
    let [countries, setCountries] = useState([])
    let [schools, setSchools] = useState([])
    let auth = useContext(AuthContext)
    let [data, setData] = useState({})
    let [status, setStatus] = useState('');
    let [showNotif, setShowNotif] = useState(false);


    const handleData = (event) => {
        setData({...data, [event.target.name] : event.target.value, user_id : auth.getUser()?.id})
    }

    useEffect(() => {
        let url = "http://127.0.0.1:8000/api/schools/";
        fetch(url, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
        .then((result) => {setSchools(schools = result)})
        .then(() => {console.log(schools)})
    }, []);


    let handleSubmit = (event) => {
        let id = auth.getUser()?.id;
        event.preventDefault();
        fetch("http://127.0.0.1:8000/api/newpupil/", {method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.getToken()}` }, body: JSON.stringify(data)})
        .then(response => response.json())
        .then((response) => {if (response.message ==  "Mokinys pridėtas sėkmingai") {setStatus(status = "Mokinys pridėtas sėkmingai"); setShowNotif(!showNotif); console.log(status)}; if (response.message ==  "Toks mokinys jau yra") {setStatus(status = "Toks mokinys jau yra"); setShowNotif(!showNotif); console.log(status)}})
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
        <div className = "card border-1 mt-5 p-2 w-75 rounded-0">
        <span style = {{display: showNotif ? "block" : "none", position: "absolute", padding: "4px"}}>{status}</span>
                        <form onSubmit = { handleSubmit }>
                        <span className = "card border-0 mt-4"><h3>Pridėti naują mokinį</h3></span>
                        <div className="form-group mt-2">
                            <input className="form-control h-100" type = "text" name = "idnumber" onChange={handleData} placeholder = "Asmens kodas"></input>
                        </div>
                        {/* <div className="form-group mt-2">
                            <input className="form-control h-100" type = "text" name = "dateofbirth" onChange={handleData} placeholder = "Gimimo data"></input>
                        </div> */}
                        <div className="form-group mt-2">
                            <input className="form-control h-75" type = "text" name = "name" onChange={handleData} placeholder = "Vardas, pavardė"></input>
                        </div>
                        <div className="form-group mt-2">
                            <input className="form-control h-75" type = "text" name = "class" onChange={handleData}  placeholder = "Klasė"></input>
                        </div>
                            <input type = "submit" value = "Pridėti" className="btn btn-dark btn-sm m-2"></input>
                        </form>
                    </div>
        </>
    );
};

export default Order;
import React, { useState, useEffect, useContext, useRef, useCallback }  from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth"
// import Getmeal from './meal';
import Header from './header';
import Pagination from './Pagination';

const Schools = () => {
    let [reversed, setReversed] = useState(false)
    let [data, setData] = useState({})
    let [refresh, setRefresh] = useState(false)
    let auth = useContext(AuthContext)
    let navigate = useNavigate()
    let [countries, setCountries] = useState([])
    let [countryId, setCountryId] = useState('')
    let [schools, setSchools] = useState([])
    let [query, setQuery] = useState('')
    let [pupils, setPupils] = useState([])
    let [pupilId, setPupilId] = useState('')

    let [currentPage, setCurrentPage] = useState(1)
    let [recordsPerPage, setRecordsPerPage] = useState(6)

    let indexOfLastPost = currentPage * recordsPerPage
    let indexOfFirstPost = indexOfLastPost - recordsPerPage



    const handleData = (event) => {
        setData({...data, [event.target.name] : event.target.value })
    }

    useEffect(() => {
        let url = "http://127.0.0.1:8000/api/schools/";
        fetch(url, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
        .then((result) => {setSchools(schools = result)})


        // setSchools(schools = schools.slice(indexOfFirstPost, indexOfLastPost))
    
    }, [refresh]);

    let handleDelete = (id) => {
        console.log(id)
        fetch("http://127.0.0.1:8000/api/deleteschool/" + id, {method: 'DELETE', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.getToken()}` }})
        .then((response) => {
            setRefresh(!refresh)})
    }

    let handleSubmit = (event) => {
        // event.preventDefault();
        fetch("http://127.0.0.1:8000/api/addschool", {method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.getToken()}` }, body: JSON.stringify(data)})
        .then((result)=>console.log(result))
        .then(() => {
            setRefresh(!refresh)
        })
        
    }


    return (
        <>                    
            <div className = "card border-1 mt-5 p-2 w-75 rounded-0">
                <form onSubmit = { handleSubmit }>
                <span className = "card border-0 mt-4"><h3>Pridėti naują mokyklą</h3></span>
                <div className="form-group mt-2">
                    <input className="form-control h-100" type = "text" name = "title" onChange={handleData} placeholder = "Mokyklos pavadinimas"></input>
                </div>
                <div className="form-group mt-2">
                    <input className="form-control h-100" type = "text" name = "code" onChange={handleData} placeholder = "Mokyklos kodas"></input>
                </div>
                <div className="form-group mt-2">
                    <input className="form-control h-100" type = "text" name = "address" onChange={handleData} placeholder = "Mokyklos adresas"></input>
                </div>
                    <input type = "submit" value = "Pridėti" className="btn btn-dark btn-sm m-2"></input>
                </form>
            </div>
                    <table className = "table-borderless m-2 w-75">
                        <thead><tr><td>Visos mokyklos <span className = "text-primary">({schools.length})</span></td></tr></thead>
                        <tbody>
                        <tr><td><b>Pavadinimas</b></td>
                        <td name = "kaina"><b>Kodas</b></td>
                        <td name = "nuotrauka" ><b>Adresas</b></td>
                        </tr>
                        {schools.map((school, index) => 
                        <tr key = {school.id} style = {{fontSize: "1rem", height: "110px"}}> 
                            <td>{school.title}</td>
                            <td>{school.code}</td>
                            <td>{school.address}</td>
                            <td><input className="btn btn-danger btn-sm m-2 rounded-0" type = "button" onClick = {() => {handleDelete(school.id)}} value = "Pašalinti mokyklą"></input></td>
                            <td><button className="btn btn-dark btn-sm m-2 rounded-0"><Link to={'/editschool/' + school.id} style={{textDecorationLine: "none"}}>Atnaujinti mokyklos duomenis</Link></button></td>
                        </tr>)}
                        <Pagination />
                        </tbody>
                    </table>
        </>
    );
};

export default Schools;
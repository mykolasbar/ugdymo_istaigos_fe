import React, { useState, useEffect, useContext, useRef, useCallback }  from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth"
// import Getmeal from './meal';
import Header from './header';
import Order from './Order';

const Customer = () => {
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

    var formData = new FormData();

    useEffect(() => {
        let url = "http://127.0.0.1:8000/api/schools/";
        fetch(url, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
        .then((result) => {setSchools(schools = result)})
        .then(() => {console.log(schools)})
    }, [countryId]);

    useEffect(() => {
            let id = auth.getUser()?.id;
            fetch("http://127.0.0.1:8000/api/pupils/" + id, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
            .then(response => response.json())
            .then((result) => {setPupils(pupils = result)})
            }, [refresh]);

    let handleSubmit = (event) => {
        event.preventDefault()
        fetch("http://127.0.0.1:8000/api/newrequest", {method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.getToken()}` }, body: JSON.stringify(data)})
        .then(() => {
            console.log(data)
        setData({})
        setRefresh(!refresh)})
    }

    let handleSerch = (event) => {
        // event.preventDefault()
        console.log(query)
        fetch("http://127.0.0.1:8000/api/search?query=" + query, {method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.getToken()}` }})
        .then(response => response.json())
        // .then((response) => {
        //     console.log(response)})
        .then((result) => {setSchools(schools = result)})
        .then(console.log(schools))
    }
        
    return (
        <>
        <Header />
            <div className="d-flex flex-column">
                <div className = "m-3">
                    <div>
                        {/* <label className = "m-3"><span>Filtruoti: &nbsp;</span></label>
                             <select onChange={(event)=>{setCountryId(event.target.value); if (event.target.value === "visos") setCountryId(''); console.log(countryId)}} name = "countries_id">
                                <option default value = "visos">Visos</option>
                                { countries.map((country) => 
                                <option name = "restaurants_id" className = "m-4" key = {country.id} value = {country.id}> 
                                    {country.id} {country.name} 
                                </option>) }
                            </select> */}
                        <label className = "m-3" htmlFor="site-search">Ieškoti mokyklos: &nbsp;</label>
                        <input type="search" id="site-search" name="query" onChange={(event) => {setQuery(event.target.value); console.log(query)}}></input>
                        <button type="submit" className="btn btn-dark btn-sm m-2" onClick={(event) => {handleSerch()}}>Search</button>
                    </div>
                    <form onSubmit = { handleSubmit }>
                    <table className = "table-borderless m-2 w-75">
                        <thead><tr><td>Visos mokyklos <span className = "text-primary">({schools.length})</span></td></tr></thead>
                        <tbody>
                        <tr><td><b>Pavadinimas</b></td>
                        <td name = "kaina"><b>Kodas</b></td>
                        <td name = "nuotrauka" ><b>Adresas</b></td>
                        {/* <td name = "trukme" onClick={(e)=>sortByX(e.target.name)}><b>Kelionės trukmė</b></td> */}
                        {auth.isLoggedin() ? (<td><b>Užsakymas</b></td>) : ("")}</tr>
                        {schools.map((school, index) => 
                        <tr key = {school.id} style = {{fontSize: "1rem", height: "110px"}}> 
                            <td>{school.title}</td>
                            <td>{school.code}</td>
                            {/* <td>{hotel.picture !== "" || null ? <img src= {'http://localhost:8000/' + hotel.picture}  alt = {hotel.picture} style = {{maxWidth: "200px", maxHeight: "100px", border: "1px solid"}}/> : "Nuotraukos nėra"}</td> */}
                            <td>{school.address}</td>
                            {auth.isLoggedin() ? (<td>
                                <select name = "requests_id" className="form-control" onChange={(event)=>{setData({ ...data, 'requests_id': event.target.value })}}>
                                <option value="N/A" className="form-control" ></option>
                            { pupils.map((pupil) => 
                                <option name = "requests_id" className = "m-4" key = {pupil.id} value = {pupil.id}> 
                                    {pupil.id} {pupil.name}
                                </option>) 
                            }
                            </select> 
                            <input type = "submit" name = {school.id} value = "Rezervuoti" className="btn btn-dark btn-sm m-2" onClick={(event) => {setData({ ...data, 'schools_id': school.id }); console.log(data)}}></input></td>) : ("")}
                        </tr>)}
                        </tbody>
                    </table>
                    </form>
                </div> 
            </div>
        </>
    );
};

export default Customer;

{/* <AverageEvaluation mealId = {meal.id} restaurantId = {restaurantId}/> */}

{/* <td><Getmeal id = {meal.id} /></td> */}
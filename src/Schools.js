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
    let [schools, setSchools] = useState([])
    let [query, setQuery] = useState('')
    let [pupils, setPupils] = useState([])
    let [pupilId, setPupilId] = useState('')

    let [page, setPage] = useState(1)
    let [recordsPerPage, setRecordsPerPage] = useState(5)
    let [schoolsPage, setSchoolsPage] = useState([])

    let setCurrentPage = (pageNumber) => {
        setPage(page = pageNumber)
    }
    let indexOfLastPost = page * recordsPerPage
    let indexOfFirstPost = indexOfLastPost - recordsPerPage
    let [totalPages, setTotalPages] = useState()

    const handleData = (event) => {
        setData({...data, [event.target.name] : event.target.value })
    }

    useEffect(() => {
        let url = "https://ugdymoistaigosbe.herokuapp.com/api/schools";
        fetch(url, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
        .then((result) => {setSchools(schools = result)})
        .then(() => {setTotalPages(totalPages = Math.ceil(schools.length / recordsPerPage))})
        .then(result => setSchoolsPage(schoolsPage = schools.slice(indexOfFirstPost, indexOfLastPost)), console.log(indexOfLastPost))    
    }, [refresh, page, totalPages]);

    let handleDelete = (id) => {
        console.log(id)
        fetch("https://ugdymoistaigosbe.herokuapp.com/api/deleteschool/" + id, {method: 'DELETE', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.getToken()}` }})
        .then((response) => {
            setRefresh(!refresh)})
    }

    let handleSubmit = (event) => {
        // event.preventDefault();
        fetch("https://ugdymoistaigosbe.herokuapp.com/api/addschool", {method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.getToken()}` }, body: JSON.stringify(data)})
        .then((result)=>console.log(result))
        .then(() => {
            setRefresh(!refresh)
        })
    }


    return (
        <div style={{display:"flex", flexDirection:"column", width:"100%"}}>  
            <div className = "card border-0 m-3 mt-2 p-2 w-75 rounded-0">
                <Link to = {'/admin/newschool/'} style={{color: "black"}}>Pridėti naują mokyklą</Link>
            </div>
                <table className = "table-borderless m-3 w-50">
                    <thead><tr><td>Visos mokyklos <span className = "text-primary">({schools.length})</span></td></tr></thead>
                    <tbody>
                    <tr><td><b>Pavadinimas</b></td>
                        <td name = "kaina"><b>Kodas</b></td>
                        <td name = "nuotrauka" ><b>Adresas</b></td>
                    </tr>
                    {schoolsPage.map((school, index) => 
                    <tr id = "adminrow" key = {school.id} style = {{fontSize: "1rem", height: "60px"}}> 
                        <td className = "w-20 m-2 p-3">{school.title}</td>
                        <td className = "w-20 m-2">{school.code}</td>
                        <td className = "w-20 m-2">{school.address}</td>
                        <td className = "w-20 m-2"><input className="btn btn-danger btn-sm m-2 rounded-0" type = "button" onClick = {() => {handleDelete(school.id)}} value = "Pašalinti mokyklą"></input></td>
                        <td className = "w-20 m-2"><button className="btn btn-dark btn-sm m-2 rounded-0"><Link to={'/editschool/' + school.id} style={{textDecorationLine: "none", color: "white"}}>Atnaujinti mokyklos duomenis</Link></button></td>
                    </tr>)}
                    </tbody>
                </table>
                <Pagination totalPages = {totalPages} setCurrentPage = {setCurrentPage} page = {page} />
        </div>
    );
};

export default Schools;
import React, { useState, useEffect, useContext, useRef, useCallback }  from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth"
// import Getmeal from './meal';
import Header from './header';
import Slidinggallery from './slidinggallery';
import Pagination from './Pagination';
import Order from './Order';

const Customer2 = () => {
    let [reversed, setReversed] = useState(false)
    let [data, setData] = useState({})
    let [refresh, setRefresh] = useState(false)
    let auth = useContext(AuthContext)
    let navigate = useNavigate()
    let [schools, setSchools] = useState([])
    let [query, setQuery] = useState('')
    let [showSearchResults, setShowSearchResults] = useState(false)
    let [pupils, setPupils] = useState([])
    let [pupilId, setPupilId] = useState('')

    let [page, setPage] = useState(1)
    let [recordsPerPage, setRecordsPerPage] = useState(6)
    let [schoolsPage, setSchoolsPage] = useState([])
    let [pageNumbers, setPageNumbers] = useState([])

    let indexOfLastPost = page * recordsPerPage
    let indexOfFirstPost = indexOfLastPost - recordsPerPage
    let [totalPages, setTotalPages] = useState()
    let [test, setTest] = useState()

    let [showSchoolInfo, setShowSchoolInfo] = useState(false)

    const images = [
        {src: "mokykla1.jpg"},
        {src: "mokykla2.jpg"},
        {src: "mokykla3.jpg"},
        {src: "mokykla4.jpg"}
    ]


    var formData = new FormData();

    let setCurrentPage = (pageNumber) => {
        setPage(page = pageNumber)
    }

    useEffect(() => {
        let url = "http://127.0.0.1:8000/api/schools/";

        fetch(url, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
        .then((result) => {setSchools(schools = result)})
        .then(() => setTotalPages(totalPages = Math.ceil(schools.length / recordsPerPage)))
        .then(result => setSchoolsPage(schoolsPage = schools.slice(indexOfFirstPost, indexOfLastPost)), console.log(totalPages))
    }, [page]);

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
        setShowSearchResults(!showSearchResults)
        // event.preventDefault()
        console.log(query)
        fetch("http://127.0.0.1:8000/api/search?query=" + query, {method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.getToken()}` }})
        .then(response => response.json())
        .then((result) => {setSchools(schools = result)})
        .then(console.log(schools))
    }

    let demo = React.createElement(
        "h1", { style: { color: "green" } }, "Welcome to GeeksforGeeks"
    )

    return (
        <>
        <Header />
        <Slidinggallery images = {images}/>

        <form onSubmit = { handleSubmit }>
            <div className = "container w-75 p-2">
                <div style = {{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}><div>Visos mokyklos <span className = "text-primary">({schools.length})</span></div>
                    <div className="d-flex justify-content-end">
                        <div >
                        <label className = "m-3" htmlFor="site-search">Ieškoti mokyklos: &nbsp;</label>
                        <input type="search" id="site-search" name="query" onChange={(event) => {setQuery(event.target.value); console.log(query)}}></input>
                        <button type="submit" className="btn btn-dark btn-sm m-2" onClick={(event) => {handleSerch()}}>Ieškoti</button>
                    </div>
                </div>
                </div>
                <div id = "schoolsBox" className = "d-flex flex-wrap mt-4">
                    {!showSearchResults ?
                    schoolsPage.map((school, index) =>
                        <div id = "schoolBox"><div style = {{backgroundColor: "black", color: "white", borderRadius: "10px 10px 0 0", padding: "5px", width: "100%" }}>{school.title}</div> 
                            <div onMouseEnter={(event) => {event.target.style.fontSize = "16px"; event.target.style.backgroundImage = "none"; console.log(event.target.childNodes)}} onMouseLeave={(event) => {event.target.style.backgroundImage = "URL(http://localhost:8000/" + school.picture + ")"; event.target.style.fontSize = "0"}} style = {{padding: "5px", backgroundImage: "URL(http://localhost:8000/" + school.picture + ")", backgroundSize: "cover", backgroundPosition: "center", backgroundColor: "#CCE5FF", height: "150px", fontSize: "0", borderRadius: "0 0 10px 10px"}}> 
                                <span><b>Mokyklos kodas: </b> {school.code} <br/> <b>Mokyklos adresas: </b>{school.address}</span> <br/>
                                <Link to={'/registerpupil/' + school.id} style={{textDecorationLine: "none"}} className="btn btn-dark btn-sm mt-2">Užregistruoti</Link>
                            </div>
                        </div>
                    )
                    :
                    schools.map((school, index) =>
                    <div id = "schoolBox"><div style = {{backgroundColor: "black", color: "white", borderRadius: "10px 10px 0 0", padding: "5px", width: "100%" }}>{school.title}</div> 
                        <div onMouseEnter={(event) => {event.target.style.fontSize = "16px"; event.target.style.backgroundImage = "none"; console.log(event.target.childNodes)}} onMouseLeave={(event) => {event.target.style.backgroundImage = "URL(http://localhost:8000/" + school.picture + ")"; event.target.style.fontSize = "0"}} style = {{padding: "5px", backgroundImage: "URL(http://localhost:8000/" + school.picture + ")", backgroundSize: "cover", backgroundPosition: "center", backgroundColor: "#CCE5FF", height: "150px", fontSize: "0", borderRadius: "0 0 10px 10px"}}> 
                            <span><b>Mokyklos kodas: </b> {school.code} <br/> <b>Mokyklos adresas: </b>{school.address}</span> <br/>
                            <Link to={'/registerpupil/' + school.id} style={{textDecorationLine: "none"}} className="btn btn-dark btn-sm mt-2">Užregistruoti</Link>
                        </div>
                    </div>)
                    }
                </div>
            <Pagination totalPages = {totalPages} setCurrentPage = {setCurrentPage} page = {page}/>
            </div>
            {test}
        </form>
        
        </>
    );
};

export default Customer2;
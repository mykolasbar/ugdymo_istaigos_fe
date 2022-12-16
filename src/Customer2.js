import React, { useState, useEffect, useContext, useRef, useCallback }  from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth"
import Header from './header';
import Slidinggallery2 from './slidinggallery2';
import Pagination from './Pagination';
import ShowSchool from './ShowSchool';

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
    const [loading, setLoading] = useState(false)


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
        setLoading(true)
        let url = "http://127.0.0.1:8000/api/schools/";

        fetch(url, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
        .then((result) => {setSchools(schools = result)})
        .then(() => setTotalPages(totalPages = Math.ceil(schools.length / recordsPerPage)))
        .then(result => {setLoading(false); setSchoolsPage(schoolsPage = schools.slice(indexOfFirstPost, indexOfLastPost)); console.log(totalPages)})
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
        .then((result) => {setLoading(false); setSchools(schools = result)})
        .then(console.log(schools))
    }

    return (
        <>
        <Header />
        <Slidinggallery2 images = {images}/>

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
                {loading && <div style = {{height:"50vw", display:"flex", justifyContent:"center", alignItems:"center"}}>Turinys kraunasi <span className="material-symbols-outlined">hourglass_top</span></div>}
                <div id = "schoolsBox" className = "d-flex flex-wrap mt-4">
                    {!showSearchResults ?
                    schoolsPage.map((school, index) =>
                        <ShowSchool title = {school.title} picture = {school.picture}>
                            <div key = {school.id} style = {{padding: "5px", backgroundSize: "cover", backgroundPosition: "center", backgroundColor: "#CCE5FF", height: "150px", borderRadius: "0 0 10px 10px"}}> 
                                <span><b>Mokyklos kodas: </b> {school.code} <br/> <b>Mokyklos adresas: </b>{school.address}</span> <br/>
                                <Link to={'/registerpupil/' + school.id} style={{textDecorationLine: "none"}} className="btn btn-dark btn-sm mt-2">Užregistruoti</Link>
                            </div>
                        </ShowSchool>)
                    :
                    schools.map((school, index) =>
                    <ShowSchool title = {school.title} picture = {school.picture}>
                        <div key = {school.id} style = {{padding: "5px", backgroundSize: "cover", backgroundPosition: "center", backgroundColor: "#CCE5FF", height: "150px", borderRadius: "0 0 10px 10px"}}> 
                            <span><b>Mokyklos kodas: </b> {school.code} <br/> <b>Mokyklos adresas: </b>{school.address}</span> <br/>
                            <Link to={'/registerpupil/' + school.id} style={{textDecorationLine: "none"}} className="btn btn-dark btn-sm mt-2">Užregistruoti</Link>
                        </div>
                    </ShowSchool>
                    )
                    }
                </div>
            <Pagination totalPages = {totalPages} setCurrentPage = {setCurrentPage} page = {page}/>
            </div>
        </form>
        
        </>
    );
};

export default Customer2;
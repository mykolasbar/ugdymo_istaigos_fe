import React, { useState, useEffect, useContext, useRef, useCallback }  from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth"
import Slidinggallery2 from './slidinggallery2';
import Pagination from './Pagination';
import ShowSchool from './ShowSchool';
import RegisterPupil from './RegisterPupil';
import Header2 from './header2';
import Footer from './footer';

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
    const [phoneSize, setPhoneSize] = useState(false)
    let [schoolId, setSchoolId] = useState()
    let [picture, setPicture] = useState()


    let [page, setPage] = useState(1)
    let [recordsPerPage, setRecordsPerPage] = useState(6)
    let [schoolsPage, setSchoolsPage] = useState([])
    let [pageNumbers, setPageNumbers] = useState([])

    let indexOfLastPost = page * recordsPerPage
    let indexOfFirstPost = indexOfLastPost - recordsPerPage
    let [totalPages, setTotalPages] = useState()
    let [showRegistrationModal, setShowRegistrationModal] = useState(false)    

    let [showSchoolInfo, setShowSchoolInfo] = useState(false)
    let [error, setError] = useState(null)

    const images = [
        {id: 1, src: "mokykla1.jpg"},
        {id: 2, src: "mokykla2.jpg"},
        {id: 3, src: "mokykla3.jpg"},
        {id: 4, src: "mokykla4.jpg"}
    ]

    var formData = new FormData();

    let setCurrentPage = (pageNumber) => {
        setPage(page = pageNumber)
    }

    console.log(auth.isLoggedinAdmin())

    useEffect(() => {
        setLoading(true)
        let url = "https://ugdymo-istaiga.fly.dev/api/schools";

        fetch(url, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then((response) => {if (response.ok) return response.json(); else throw Error("Serverio klaida")})
        .then((result) => {setSchools(schools = result)})
        .then(() => {setTotalPages(totalPages = Math.ceil(schools.length / recordsPerPage)); setSchoolsPage(schoolsPage = schools.slice(indexOfFirstPost, indexOfLastPost))})
        .then(result => {setLoading(false)})
        .catch((err) => {console.log(err.message); setError(err.message)})
    }, [page]);

    let handleSubmit = (event) => {
        event.preventDefault()
        fetch("https://ugdymo-istaiga.fly.dev/api/newrequest", {method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.getToken()}` }, body: JSON.stringify(data)})
        .then(() => {
            console.log(data)
        setData({})
        setRefresh(!refresh)})
    }

    let handleSerch = (event) => {
        setShowSearchResults(!showSearchResults)
        // event.preventDefault()
        console.log(query)
        fetch("https://ugdymo-istaiga.fly.dev/api/search?query=" + query, {method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.getToken()}` }})
        .then(response => response.json())
        .then((result) => {setLoading(false); setSchools(schools = result)})
        .then(console.log(schools))
    }

    let closeModal = () => {
        showRegistrationModal && setShowRegistrationModal(false)
    }

    let disableScroll = () => {
        document.body.classList.add("stop-scrolling");
    }
    
    let enableScroll = () => {
        document.body.classList.remove("stop-scrolling");
    }


    return (
        <div style = {{display:"flex", flexDirection:"column", minHeight:"100vh", justifyContent:"space-between"}}>
            {showRegistrationModal && <div style={{width:"100vw", height:"100vh", position:"fixed", backgroundColor:"grey", opacity:"0.6", zIndex:"1500"}}></div>}
            <div>
                <Header2 />
                <Slidinggallery2 images = {images}/>
                {error ? <div  style = {{display:"flex", justifyContent:"center", alignItems:"center"}}><h2>{error}</h2></div> : 
                <form onSubmit = { handleSubmit } style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <div id = "body" style={{marginBottom:"100px"}}>
                        <div className="customertop">
                            <div>Visos mokyklos <span className = "text-primary">({schools.length})</span></div>
                            <div className="d-flex justify-content-end">
                                <div>
                                    <label className = "mt-2" htmlFor="site-search">Ieškoti mokyklos: &nbsp;</label>
                                    <div style={{display:"flex", flexDirection:"row"}}>
                                        <input type="search" id="site-search" name="query" className="mt-2 mb-2" onChange={(event) => {setQuery(event.target.value); console.log(query)}}></input>
                                        <button type="submit" className="btn btn-dark btn-sm m-2" onClick={(event) => {handleSerch()}}>Ieškoti</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {loading && <div style = {{height:"50vw", display:"flex", justifyContent:"center", alignItems:"center"}}>Turinys kraunasi <span className="material-symbols-outlined">hourglass_top</span></div>}
                        <div id = "schoolsBox" className = "d-flex flex-wrap mt-4">
                            {!showSearchResults ?
                            schoolsPage.map((school, index) =>
                                <ShowSchool title = {school.title} picture = {school.picture} key = {school.id} >
                                    <div key = {school.id} style = {{padding: "5px", backgroundSize: "cover", backgroundPosition: "center", backgroundColor: "#CCE5FF", height: "150px", borderRadius: "0 0 10px 10px"}}> 
                                        <span><b>Mokyklos kodas: </b> {school.code} <br/> <b>Mokyklos adresas: </b>{school.address}</span> <br/>
                                        <div style={{textDecorationLine: "none"}} className="btn btn-dark btn-sm mt-2" onClick={()=>{setShowRegistrationModal(true); setSchoolId(school.id); setPicture(school.picture); disableScroll()}}>Užregistruoti</div>
                                    </div>
                                </ShowSchool>)
                            :
                            schools.map((school, index) =>
                            <ShowSchool title = {school.title} picture = {school.picture}>
                                <div key = {school.id} style = {{padding: "5px", backgroundSize: "cover", backgroundPosition: "center", backgroundColor: "#CCE5FF", height: "150px", borderRadius: "0 0 10px 10px"}}> 
                                    <span><b>Mokyklos kodas: </b> {school.code} <br/> <b>Mokyklos adresas: </b>{school.address}</span> <br/>
                                    <div style={{textDecorationLine: "none"}} className="btn btn-dark btn-sm mt-2" onClick={()=>{setShowRegistrationModal(true); setSchoolId(school.id); disableScroll()}}>Užregistruoti</div>
                                </div>
                            </ShowSchool>
                            )
                            }
                        </div>
                    <Pagination totalPages = {totalPages} setCurrentPage = {setCurrentPage} page = {page}/>
                    {showRegistrationModal && <RegisterPupil closeModal = {closeModal} schoolId = {schoolId} picture={picture} enableScroll={enableScroll}/>}
                    </div>
                </form>}
            </div>
            <Footer />
        </div>
    );
};

export default Customer2;
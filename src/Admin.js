import React, { useState, useEffect, useContext, useRef }  from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth"
import Header from './header';

const Admin = () => {
    // let [posts, setPosts] = useState([])
    // let [data, setData] = useState({})
    // let [refresh, setRefresh] = useState(false)
    // let auth = useContext(AuthContext)
    // let navigate = useNavigate()

    // if (!auth.isLoggedinAdmin()) {navigate("/customer");}

    // const handleData = (event) => {
    //     setData({...data, [event.target.name] : event.target.value })
    // }

    // useEffect(() => {
    //     fetch("http://127.0.0.1:8000/api/restaurants?embed=meals")
    //     .then(response => response.json())
    //     .then((result) => {setPosts(posts = result); console.log(posts)})
    // }, [refresh]);

    // let handleSubmit = (event) => {
    //     event.preventDefault();
    //     fetch("http://127.0.0.1:8000/api/restaurants", {method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.getToken()}` }, body: JSON.stringify(data)})
    //     .then(console.log(JSON.stringify(data)))
    //     .then(() => {
    //         // setData({})
    //         setRefresh(!refresh)
    //     })
    // }

    // let deletePost = (id, event) => {
    //     console.log(id)
    //     fetch("http://127.0.0.1:8000/api/restaurants/" + id, {method: 'DELETE', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.getToken()}` }})
    //     .then((response) => {
    //         setRefresh(!refresh)
    //     })
    // }


    return (
        <>
        <Header />
        <nav className="navbar-expand-lg navbar-light bg-primary p-2 w-100 d-flex flex-row align-items-center">
                <div className="d-flex justify-content-between w-100">
                    <ul className="navbar-nav p-3">
                        <li className="nav-item active p-2">
                            <Link className="nav-link" to="/admin/edithotels">Viešbučiai</Link>
                        </li>
                        <li className="nav-item p-2">
                            <Link className="nav-link" to="/admin/editcountries">Šalys</Link>
                        </li>
                        <li className="nav-item active p-2">
                            <Link className="nav-link" to="/admin/newhotel">Naujas viešbutis</Link>
                        </li>
                        <li className="nav-item active p-2">
                            <Link className="nav-link" to="/admin/orders">Užsakymai</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        <Outlet />

        
        </>
    );
};

export default Admin;
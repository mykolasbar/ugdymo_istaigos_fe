import React, { useState, useEffect, useRef, useContext }  from 'react';
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "./Auth"


const Login = () => {

    let [data, setData] = useState({})
    let navigate = useNavigate()
    let auth = useContext(AuthContext)


    const handleData = (event) => {
        setData({...data, [event.target.name] : event.target.value })
    }

    let handleSubmit = (event) => {
        event.preventDefault();
        fetch("http://127.0.0.1:8000/api/login", {method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        // .then(console.log(JSON.stringify(data)))
        .then(response => response.json())
        .then((response) => {
            console.log(response)
            auth.login(response.user, response.token, response.user.role);
            if (response.user.role === "admin")
            navigate("/admin");
            if (response.user.role === "user")
            navigate("/customer");
        });
};


    return (
        <>
                <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-lg-12 col-xl-11">
                    <div className="card text-black border-0">
                    <div className="card-body p-md-5">
                        <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

                            <form className="mx-1 mx-md-4" onSubmit = { handleSubmit }>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                <div className="form-outline flex-fill mb-0">
                                <input onChange={ handleData } type="email" name="email" className="form-control" />
                                <label className="form-label" htmlFor="email">Your Email</label>
                                </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                <div className="form-outline flex-fill mb-0">
                                <input onChange={ handleData } type="password" name="password" className="form-control" />
                                <label className="form-label" htmlFor="password">Password</label>
                                </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <span className = "m-3">Dont have an account? <Link to="/register">Register</Link></span>.
                            </div>

                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button type="submit" className="btn btn-primary btn-lg">Log in</button>
                            </div>

                            </form>
                        </div>
                        {/* <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                            <img src={"https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"}
                            className="img-fluid" alt="Sample image">
                            </img>
                        </div> */}
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
};

export default Login;
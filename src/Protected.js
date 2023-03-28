import React, { useContext, useState, useEffect }  from 'react';
import { AuthContext } from "./Auth"
import { Link, Navigate, useNavigate } from "react-router-dom";


const Protected = ({ children }) => {

    let auth = useContext(AuthContext)
    let [loaded, setLoaded] = useState(false)

    useEffect(()=>{setLoaded(true)},[auth.isLoggedin()])

    if (loaded) {
        if (auth.isLoggedin()) {
            return children;
            }

        if (auth.isLoggedin() === false) {
            return <Navigate to="/" replace />;
            }
        }
    };

export default Protected;
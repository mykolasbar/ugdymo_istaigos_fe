import React, { useState, useEffect, useContext, useRef }  from 'react';
import { AuthContext } from "./Auth"
import Header from './header';
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

const AdminProtected = ({ children }) => {

    let auth = useContext(AuthContext)
    let [loaded, setLoaded] = useState(false)

    useEffect(()=>{setLoaded(true)},[auth.isLoggedin()])

    if (loaded) {
        if (auth.isLoggedinAdmin() === false) {
            return <Navigate to="/" replace />;
        }
        else {
            return children;
        }
    }


};

export default AdminProtected;
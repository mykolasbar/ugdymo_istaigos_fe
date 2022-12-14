import React, { useState, useEffect, useContext, useRef }  from 'react';
import { AuthContext } from "./Auth"
import Header from './header';
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";


const Protected = ({ children }) => {

    let auth = useContext(AuthContext)

    if (auth.isLoggedin() || auth.isLoggedinAdmin()) {
        return children;
        }

    if (!auth.isLoggedin() || !auth.isLoggedinAdmin()) {
        return <Navigate to="/" replace />;
        }
    
    };

export default Protected;
import React, { useState, useEffect, useContext, useRef }  from 'react';
import { AuthContext } from "./Auth"
import Header from './header';
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

const AdminProtected = ({ children }) => {

    let auth = useContext(AuthContext)

    if (!auth.isLoggedinAdmin()) {

        return <Navigate to="/" replace />;
    }
    

    return children;
};

export default AdminProtected;
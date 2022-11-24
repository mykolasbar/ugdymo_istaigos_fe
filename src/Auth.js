import React, { createContext, useState, useEffect }  from 'react';
import { useNavigate } from "react-router-dom";

export let AuthContext = createContext()

export let AuthProvider = ({children}) => {
    let [user, setUser] = useState(null)
    let [admin, setAdmin] = useState(null)
    let [role, setRole] = useState(null)

    let [token, setToken] = useState(null)
    let navigate = useNavigate

    useEffect(() => {
        setUser(user = JSON.parse(localStorage.getItem("user")))
        setToken(token = JSON.parse(localStorage.getItem("token")))
        if (user != null){
            setRole(role = user.role)
            console.log(user.role)}
    }, []);

    let login = (user, token, role) => {
        if (user != null){
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        console.log(user);
        setRole(role = user.role)
        setToken(token);}

    };

    let adminLogin = (admin, token) => {
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("admin", JSON.stringify(admin));
        setAdmin(admin);
        setToken(token);
    };

    let logout = () => {
        fetch('http://localhost:8000/api/logout', {method: "POST", headers: { Accept: "application/json", Authorization: `Bearer ${token}` }})
        .then(
            (response) => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                localStorage.removeItem("admin");
                setUser(null);
                setAdmin(null);
                setToken(null);
                navigate("/user");
            },
            (err) => {}
        );
    };

    let getUser = () => user;
    let getAdmin = () => admin;
    let getToken = () => token;
    let isLoggedin = () => (user ? true : false);
    let isLoggedinAdmin = () => (role === "admin" ? true : false);


    return (
        <AuthContext.Provider value={{ login, isLoggedin, logout, getUser, getToken, adminLogin, getAdmin, isLoggedinAdmin }}>{children}</AuthContext.Provider>
    );


}
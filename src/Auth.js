import React, { createContext, useState, useEffect }  from 'react';
import { useNavigate } from "react-router-dom";

export let AuthContext = createContext()

export let AuthProvider = ({children}) => {
    let [user, setUser] = useState(null)
    let [admin, setAdmin] = useState(null)
    let [role, setRole] = useState(null)
    let [userId, setUserId] = useState(null)

    let [token, setToken] = useState(null)
    let navigate = useNavigate

    useEffect(() => {
        setUser(user = JSON.parse(localStorage.getItem("user")))
        setToken(token = JSON.parse(localStorage.getItem("token")))
        if (user != null){
            setRole(role = user.role)
            setUserId(userId = user.id)
            console.log(userId)
        }
    }, []);

    let login = (user, token, role) => {
        if (user != null){
            localStorage.setItem("token", JSON.stringify(token));
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
            console.log(user);
            setRole(role = user.role)
            setToken(token);
            setUserId(userId = user.id)
            console.log(userId)
        }
    };

    // let adminLogin = (admin, token) => {
    //     localStorage.setItem("token", JSON.stringify(token));
    //     localStorage.setItem("admin", JSON.stringify(admin));
    //     setAdmin(admin);
    //     setToken(token);
    // };

    let logout = () => {
        fetch('https://ugdymoistaigosbe.herokuapp.com/api/logout', {method: "POST", headers: { Accept: "application/json", Authorization: `Bearer ${token}` }})
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
    
    let getUserId = ()=> userId;

    let getUser = () => user;
    let getAdmin = () => admin;
    let getToken = () => token;
    let isLoggedin = () => (user && role === "user" ? true : false);
    let isLoggedinAdmin = () => (user && role === "admin" ? true : false);


    return (
        <AuthContext.Provider value={{ login, isLoggedin, logout, getUser, getToken, getAdmin, isLoggedinAdmin, getUserId }}>{children}</AuthContext.Provider>
    );


}
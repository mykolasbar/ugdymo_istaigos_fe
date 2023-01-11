import React, { useState } from 'react';

const ShowSchool = ({title, picture, children}) => {

    let [isActive, setIsActive] = useState(false)

    return (
        <div id = "schoolBox" onMouseEnter={() => {setIsActive(true)}} onMouseLeave={(event) => {setIsActive(false)}}><div style = {{backgroundColor: "black", color: "white", borderRadius: "10px 10px 0 0", padding: "5px", width: "100%" }}>{title}</div> 
            { !isActive ? <div style = {{ padding: "5px", backgroundSize: "cover", backgroundPosition: "center", backgroundImage: "URL(https://ugdymoistaigosbe.herokuapp.com/images/mokykla3.jpg)", backgroundColor: "#CCE5FF", height: "150px", fontSize: "0", borderRadius: "0 0 10px 10px"}}>aa</div> : children }
        </div>
    );
};

export default ShowSchool;

// " + picture + "
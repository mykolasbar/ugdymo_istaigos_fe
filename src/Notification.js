import React from 'react';

const Notification = () => {
    return (
        <div style = {{backgroundColor: "#4A4646", color: "white", padding: "10px", position: "absolute", zIndex: "+1000", left: "85%"}}>
            <span>Patvirtinta registracija į mokyklą: </span>
        </div>
    );
};

export default Notification;
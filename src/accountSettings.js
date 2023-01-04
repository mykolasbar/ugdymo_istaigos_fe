import React, { useState, useEffect, useContext, useRef, useCallback }  from 'react';
import { AuthContext } from "./Auth"

const AccountSettings = () => {
    let auth = useContext(AuthContext)

    return (
        <table style = {{margin:"20px", height: "180px"}}>
            <tr>
                <td style = {{padding:"10px"}}>Naudotojo vardas: </td><td style = {{padding:"10px"}}><b>{auth.getUser()?.name}</b></td>
            </tr>
                <td style = {{padding:"10px"}}>El. paštas: </td><td><b style = {{padding:"10px"}}>{auth.getUser()?.email}</b></td>
            <tr>
                <td style = {{padding:"10px"}}>Paskyra sukurta: </td><td style = {{padding:"10px"}}><b>{new Date(auth.getUser()?.created_at).toLocaleDateString('lt-LT')}</b></td>
            </tr>
            <tr>
                <td style = {{padding:"10px"}}>Slaptažodis: </td><td style = {{padding:"10px"}}><input type="button" value="Atnaujinti slaptažodį"></input></td>
            </tr>
            <tr>
                <td style = {{padding:"10px"}}>Paskyros trynimas: </td><td style = {{padding:"10px"}}><input type="button" value="Trinti paskyrą"></input></td>
            </tr>
        </table>
    );
};

export default AccountSettings;

// new Date(post.created_at).toLocaleDateString('lt-LT')} </i>{new Date(auth.getUser()?.created_at).toLocaleTimeString('lt-LT')

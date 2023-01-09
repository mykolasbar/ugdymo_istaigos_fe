import React, { useEffect, useState } from 'react';
import { CookiesProvider, useCookies } from "react-cookie";

const CookiesPropt = () => {
    let [cookiesConfirmed, setCookiesConfirmed] = useState(false)
    const [confirmationCookie, setCookie] = useCookies(["CookieConsent"]);

    useEffect(() => {(confirmationCookie.CookieConsent !== null && confirmationCookie.CookieConsent === "true") && setCookiesConfirmed(true)}, [])

    let handleCookie = ()=>{
        setCookie("CookieConsent", "true", {
            path: "/"
          });
        setCookiesConfirmed(true)
    }

    return (
        <>
            {!cookiesConfirmed &&
            <div id="cookiesPromptWindow">
                <div style={{display:"flex", flexDirection:"row", width:"100%", justifyContent:"flex-end", padding:"15px 20px 0 0"}}><span class="material-symbols-outlined" style={{cursor:"pointer"}} onClick={()=>setCookiesConfirmed(true)}>close</span></div>
                <div style = {{padding:"0 20px 25px 25px"}}>
                    <div style={{padding:"5px"}}>Paspausdama(s) "Sutinku" arba toliau naršydama(s) šią svetainę, neprieštarauju kad mano įrenginyje dėl naršymo patirties pagerinimo būtų išsaugomi slapukai.</div>
                    <div style={{display:"flex", flexDirection:"row", width:"100%", alignItems:"center", justifyContent:"center"}}><input type="button" value="Sutinku" onClick={()=>{handleCookie()}} className="btn btn-warning"></input></div>
                </div>
            </div>}
        </>
    );
};

export default CookiesPropt;
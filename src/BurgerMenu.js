import React from 'react';

const BurgerMenu = () => {
    return (<>
        {/* <div style={{margin:"20px"}}> */}
            <div className = "burgrmenu" style = {{margin:"20px 20px 20px 20px", cursor:"pointer"}} id = "burgermenu">
                <div className = "burgerlayer"></div>
                <div className = "burgerlayer"></div>
                <div className = "burgerlayer"></div>
            </div>
        {/* </div> */}
        {/* <div>
            <div className = "burgermenuactive">
                <div className = "burgerlayeractive1"></div>
                <div className = "burgerlayeractive2"></div>
            </div>
        </div> */}
        </>
    );
};

export default BurgerMenu;
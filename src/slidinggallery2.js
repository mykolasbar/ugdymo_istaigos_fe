import React, { useState, useEffect, useContext, useRef, useCallback }  from 'react';
import Button from 'react-bootstrap/Button';
import Fade from 'react-bootstrap/Fade';

const Slidinggallery2 = (props) => {
    let [imgindex, setImgIndex] = useState(0)

    useEffect(() => {
        setTimeout(() => {
            setImgIndex(imgindex+=1)
            if (imgindex == props.images.length)
                {setImgIndex(imgindex = 0)
            }
        }, 3000);
      }, [imgindex]);


    return (
        <Fade in={imgindex}>
        <div className = "container-fluid w-75 p-3 d-flex align-items-center" style={{height: "300px"}}>
            <div className = "container-fluid w-100 h-100" style = {{backgroundImage: "URL(" + props.images[imgindex].src + ")", backgroundSize: "cover", backgroundPosition: "center"}}>
                {/* <img src = {props.images[imgindex].src} className = "img-fluid w-75 p-3" /> */}
            </div>
        </div>
        </Fade>
    );
};

export default Slidinggallery2;
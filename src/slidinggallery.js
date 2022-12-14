import React, { useState, useEffect, useContext, useRef, useCallback }  from 'react';

const Slidinggallery = (props) => {
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
        <div className = "container-fluid w-75 p-3 d-flex align-items-center" style={{height: "300px"}}>
            {/* <span className="material-symbols-outlined">arrow_back_ios</span> */}
            <div className = "container-fluid w-100 h-100" style = {{backgroundImage: "URL(" + props.images[imgindex].src + ")", backgroundSize: "cover", backgroundPosition: "center"}}>
                {/* <img src = {props.images[imgindex].src} className = "img-fluid w-75 p-3" /> */}
            </div>
            {/* <span className="material-symbols-outlined">arrow_forward_ios</span> */}
        </div>
    );
};

export default Slidinggallery;
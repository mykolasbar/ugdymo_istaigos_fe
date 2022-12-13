import React, { useState, useEffect, useContext, useRef, useCallback }  from 'react';

const Slidinggallery2 = (props) => {
    let [imgindex, setImgIndex] = useState(0)
    let [percentage, setPercentage] = useState(0)

    useEffect(() => {
        setTimeout(() => {
            setImgIndex(imgindex+=1)
            setPercentage(percentage += 25)
            if (imgindex == props.images.length)
                {setImgIndex(imgindex = 0)
                setPercentage(percentage = 0)
            }
        }, 3000);
    }, [imgindex]);
    


    return (
        <div style={{overflow:"hidden", width: "75%", margin: "15px auto"}}>
            <div style={{width:"400%", display:"inline-flex", flexDirection:"row", flexWrap:"nowrap", whiteSpace: "no-wrap", transition:"transform 0.3s", transform: "translateX(-" + percentage + "%)"}}>
                {props.images.map((image) => <div style = {{backgroundImage: "URL(" + image.src + ")", backgroundSize: "cover", backgroundPosition: "center", display:"inline-flex", height: "220px", width:"100%"}}></div>)}
            </div>
        </div>

        // <div className = "container-fluid w-75 p-3 d-flex align-items-center" style={{height: "300px"}}>
        //     <div className = "container-fluid w-100 h-100" style = {{backgroundImage: "URL(" + props.images[imgindex].src + ")", backgroundSize: "cover", backgroundPosition: "center"}}>
        //     </div>
        // </div>
    );
};

export default Slidinggallery2;
import React, { useState, useEffect, useContext, useRef, useCallback }  from 'react';


const Pagination = (props) => {
    let [pageNumbers, setPageNumbers] = useState([])

    useEffect(() => {
        console.log(props.totalPages)
        for (let i = 1; i <= props.totalPages; i++) {
            pageNumbers.push(i);
            console.log(i)
        }
    
        }, [props.totalPages]);
        

    return (
        <>
            <ul className="pagination">
                {props.page == 1 ?
                <li className="page-item disabled">
                    <a className="page-link" href="#" tabIndex="-1">Previous</a>
                </li> : 
                <li className="page-item">
                <a className="page-link" href="#" tabIndex="-1" onClick={() => {props.setCurrentPage(props.page - 1)}}>Ankstesnis</a>
            </li>}
                {pageNumbers.map((pageNumber)=><li className="page-item" key = {pageNumber}><a a href = "#" className="page-link" onClick={() => {props.setCurrentPage(pageNumber); console.log(pageNumber)}}>{pageNumber}</a></li>)}
                {props.page == props.totalPages ?
                <li className="page-item disabled">
                    <a className="page-link">Sekantis</a>
                </li> :
                <li className="page-item">
                <a className="page-link" href="#" onClick={() => {props.setCurrentPage(props.page + 1)}}>Sekantis</a>
            </li>}
            </ul>
        </>
    );
};

export default Pagination;
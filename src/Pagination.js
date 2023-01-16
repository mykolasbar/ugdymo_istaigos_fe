import React, { useState, useEffect, useContext, useRef, useCallback }  from 'react';


const Pagination = (props) => {
    let [pageNumbers, setPageNumbers] = useState([])

    useEffect(() => {
        for (let i = 1; i <= props.totalPages; i++) {
            // pageNumbers.push(i);
            setPageNumbers(pageNumbers => [...pageNumbers, i])
        }
        }, [props.totalPages]);
        

    return (
        <div id = "paginationcontainer">
            <ul className="pagination">
                {props.page == 1 ?
                <li className="page-item disabled">
                    <a className="page-link" style={{cursor:"pointer"}} tabIndex="-1">Ankstesnis</a>
                </li> : 
                <li className="page-item">
                    <a className="page-link" tabIndex="-1" style={{cursor:"pointer"}} onClick={() => {props.setCurrentPage(props.page - 1)}}>Ankstesnis</a>
                </li>}
                {pageNumbers.map((pageNumber)=><li className="page-item" key = {pageNumber}><a a style={{cursor:"pointer"}} className="page-link" onClick={() => {props.setCurrentPage(pageNumber); console.log(pageNumber)}}>{pageNumber}</a></li>)}
                {props.page == props.totalPages ?
                <li className="page-item disabled">
                    <a className="page-link">Sekantis</a>
                </li> :
                <li className="page-item">
                    <a className="page-link" style={{cursor:"pointer"}} onClick={() => {props.setCurrentPage(props.page + 1)}}>Sekantis</a>
                </li>}
            </ul>
        </div>
    );
};

export default Pagination;
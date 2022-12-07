import React, { useState, useEffect, useContext, useRef, useCallback }  from 'react';


const Pagination = (props) => {
    let [pageNumbers, setPageNumbers] = useState([])

    // let [currentPage, setCurrentPage] = useState(1)
    // let [recordsPerPage, setRecordsPerPage] = useState(10)

    // let indexOfLastPost = currentPage * recordsPerPage
    // let indexOfFirstPost = indexOfLastPost - recordsPerPage
    // let currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

    useEffect(() => {
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
                <a className="page-link" href="#" tabIndex="-1">Previous</a>
            </li>}
                {pageNumbers.map((pageNumber)=><li className="page-item" key = {pageNumber}><a a href = "#" className="page-link" onClick={() => {props.setCurrentPage(pageNumber); console.log(pageNumber)}}>{pageNumber}</a></li>)}
                <li className="page-item">
                    <a className="page-link" href="#">Next</a>
                </li>

            </ul>
        </>
    );
};

export default Pagination;
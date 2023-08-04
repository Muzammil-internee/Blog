import React from 'react'
import { useNavigate } from "react-router-dom"


function PageNotFound() {
    const navigate = useNavigate();
    return (
        <div>
            <h2 className='d-flex justify-content-center text-danger mt-5 fs-1'>404 Page Not Found</h2>
            <div className='d-flex justify-content-center mt-5'>
            <button className='btn btn-outline-danger ps-5 pe-5 fw-bold' onClick={() => {navigate(-1)}}>Back</button>
            </div>
        </div>
    )
}

export default PageNotFound
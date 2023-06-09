import React from 'react'
import '../../styles/resources/ResourcesCalComp.css'
import { useNavigate } from 'react-router-dom'
// import Calculator from '../../pages/Calculator';

function ResourcesCalComp() {
    const navigate = useNavigate()
    return (
        <div className=''>
            <div className='resCC-main-div' >

                <div className='container-fluid px-4 px-md-5 pb-4'>

                    <div className="resCC-about-head py-3 py-sm-4 d-flex justify-content-center">
                        <p>CALCULATOR</p>
                    </div>
                    <div className='d-lg-flex  row pb-4 align-items-center resCC-about-text-content justify-content-around '>
                        <p className='resCC-head text-center mb-lg-0 mb-sm-4 align-self-stretch py-5 px-4'>Calculate your carbon emissions and make small changes for a big impact.</p>
                        <button className='resourcesCalcBtn' onClick={() => navigate("/approach/calculator/home")}> Calculate</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ResourcesCalComp
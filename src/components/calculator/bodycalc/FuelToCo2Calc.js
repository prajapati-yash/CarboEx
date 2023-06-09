import React from 'react'
import '../../../styles/calculator/bodycalc/PublicTransitCalc.css'
import axios from 'axios'
import { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function FuelToCo2Calc({ onValueChange, props }) {
    const navigate = useNavigate();
    const [btnloading, setbtnloading] = useState(false)
    const [btndisable, setbtndisable] = useState(false);
    const [ftcData1, setftcData] = useState({
        ftcType: null,
        ftcLitres: null
    })

    // var data = JSON.stringify(`{\n      "type": ${ftcData1.ftcType},\n      "litres": ${ftcData1.ftcLitres}\n      }: ''`);
    const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMWU3MzVmMTgzYWJjYTkzMWIzMWM4NDNhMTFhZmYxMWM0MGQ4NzlmMDVjNzM0ZTMzMjQ5MzI5Y2MwZTkxYmUyMWYyNTVjZjIzYTRlMjBiNmYiLCJpYXQiOjE2ODE1NTg3OTUsIm5iZiI6MTY4MTU1ODc5NSwiZXhwIjoxNzEzMTgxMTk1LCJzdWIiOiI0MTM0Iiwic2NvcGVzIjpbXX0.ZVntnNAix7jwIa4YfecWb0IjI_KK4aDEp0ZTF1ihYxs-121_3lD2px_B3EVSW28hzHIjn3Ctz8gP-j9r_-f9gw";

    // useEffect(() => {
    //     console.log(ftcData1);
    // }, [ftcData1]);

    const ftcSubmitData = async () => {
        var data = {
            type: ftcData1.ftcType,
            litres: ftcData1.ftcLitres,
        };
        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://app.trycarbonapi.com/api/fuelToCO2e?type=${ftcData1.ftcType}&litres=${ftcData1.ftcLitres}`,
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: data
        };
        // console.log(`${ftcData1.ftcType} ${ftcData1.ftcLitres}`)
        // const ftcResult2 = await console.log(ftcResult);
        // console.log(ftcResult2)

        try {
            setbtndisable(true)
            toast.info('Calculating', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setbtnloading(true)
            const response = await axios.request(config);
            const ftcResult = JSON.stringify(response.data.carbon);
            alert(`Carbon Emission: ${ftcResult}`);
            navigate('/approach/calculator/cartravel')
            console.log(`Carbon Emission: ${ftcResult}`);
            const numbers = ftcResult.match(/\d+(\.\d+)?/g);
            // console.log(numbers[0]);
            const demo = numbers[0];
            // alert(demo)
            setbtnloading(false)
            console.log(demo)
            // const value = ftcResult
            const value = demo
            onValueChange(value);
        } catch (error) {
            console.log(error);
            setbtnloading(false)
            setbtndisable(false)
        }
    };

    return (
        <>
            <div className='publicTransit-form'>
                <div className='form-content1'>
                    {/* <label className='publicT-form__label'> */}
                    <b className='title-te-class-main'>Fuel To CO2e</b>
                    {/* </label> */}
                    <div className='formMain'>
                        <div className='form-group bottom35'>
                            <label className='publicT-form__label1'>Transform liters of Diesel, Petrol or LPG into CO2 Equivalent in Kg.</label>
                        </div>
                        <div className='traditionalCountry-ip'>
                            <div className='form-group '>
                                <label className='publicT-form__label2 '>Litres:</label>
                                <input className='form-control' type='text' placeholder='The number of litres to calculate from.' required id='last_name' name='last_name' onChange={(e3) => {
                                    setftcData({ ...ftcData1, ftcLitres: e3.target.value })
                                }} />
                            </div>
                        </div>
                        <div className='traditionalCountry-dd'>
                            <div className='form-group bottom35'>
                                <label className='publicT-form__label2'>Type:</label>

                                <div className="dropdown">
                                    <select className='form-control' id='pt-type' name='pt-type' onChange={(e3) => {
                                        setftcData({ ...ftcData1, ftcType: e3.target.value })
                                    }}>
                                        <option value='Default'>Select type</option>
                                        <option value='Petrol'>Petrol</option>
                                        <option value='Diesel'>Diesel</option>
                                        <option value='LPG'>LPG</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center align-items-center'>
                            <div className='pTbtn col-sm-12 mt-4'>
                                <button type='submit' className='publicT-form__button primary p-2' id='submit_btn' style={{ width: 'fit-content' }} onClick={() => ftcSubmitData()}>
                                    {btnloading ? (
                                        <svg
                                            className="animate-spin button-spin-svg-pic"
                                            version="1.1"
                                            id="L9"
                                            xmlns="http://www.w3.org/2000/svg"
                                            x="0px"
                                            y="0px"
                                            viewBox="0 0 100 100"
                                            style={{ width: "40%" }}
                                        >
                                            <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"></path>
                                        </svg>
                                    ) : (<>Calculate</>)}
                                </button>
                                <ToastContainer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FuelToCo2Calc
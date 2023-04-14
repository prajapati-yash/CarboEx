import React, { useEffect, useState } from 'react'
import '../styles/DAOMember/MainProposalDashboard.css'
import ProposalDashboard from './ProposalDashboard';
import ProposalOrders from './ProposalOrders';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { companyInstance } from '../components/Contracts';

import { useAccount } from 'wagmi';


function MainProposalDashboard() {
    const [logoImg, setLogoImg] = useState();
    const [companyName, setCompanyName] = useState();
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const { address } = useAccount();




    const MainPropPageData = {
        logo: logoImg,
        name: companyName,
        userName: userName,
        email: email,
        availableCredits: "",
    };


    const [activeComponent, setActiveComponent] = useState('proposalDashboard');
    const navigate = useNavigate();
    const handleProposalClick = (e) => {
        e.preventDefault();
        navigate('/user-dashboard');
        setActiveComponent('proposalDashboard');
    };

    const handleOrdersClick = (e) => {
        e.preventDefault();
        navigate('/user-dashboard/orders-dashboard');
        setActiveComponent('proposalOrders');
    };

    const renderComponent = () => {
        switch (activeComponent) {
            case 'proposalDashboard':
                return <ProposalDashboard />;
            case 'proposalOrders':
                return <ProposalOrders />;
            default:
                return <ProposalDashboard />;
        }
    };
    useEffect(() => {
        getUserAccountDetails();
    }, [])

    const getUserAccountDetails = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                if (!provider) {
                    console.log("Metamask is not installed, please install!");
                }
                const con = await companyInstance();
                const userData = await con.getUser(address);
                console.log(userData)
                console.log(userData[5])
                setLogoImg(userData[5])
                setCompanyName(userData[3])
                setUserName(userData[1])
                setEmail(userData[2])
                return userData;
                // console.log(userData[4])
                // console.log(con);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // const receivedData = getUserAccountDetails();

    return (
        <>
            <div className="container-fluid main-prop-dash-Main">
                <div className="row justify-content-center">
                    <div className="col-lg-2 col-md-3 col-sm-4 DAO-Member-logo-class">
                        <img src={"https://" + `${MainPropPageData.logo}` + ".ipfs.w3s.link"} alt="Logo" className="DAO-Member-logo img-fluid" />
                    </div>
                    <div className="col-lg-8 col-md-6 col-sm-4 DaoMemberDetails-class">
                        <div className="row">
                            <div className="col-lg-6 col-md-12 mb-3">
                                <label className="PropHeadLabel">Company Name:</label>
                                <input type="text" className="form-control prop-dash-data-bg" value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    readOnly={!isEditing} />
                            </div>
                            <div className="col-lg-6 col-md-12 mb-3">
                                <label className="PropHeadLabel">Username:</label>
                                <input type="text" className="form-control prop-dash-data-bg" value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    readOnly={!isEditing} />
                            </div>
                            <div className="col-lg-6 col-md-12 mb-3">
                                <label className="PropHeadLabel">Email:</label>
                                <input type="email" className="form-control prop-dash-data-bg" value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    readOnly={!isEditing} />
                            </div>
                            <div className="col-lg-6 col-md-12 mb-3">
                                <label className="PropHeadLabel">Credits Available:</label>
                                <input type="text" className="form-control prop-dash-data-bg" value={MainPropPageData.availableCredits} readOnly />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-3 col-sm-4 d-flex justify-content-end">
                        <div className='DMember-db-btns d-flex justify-content-center align-items-center col-8 mx-auto'>
                            <div className='DMember-db-btns-body '>
                                <div className='DMember-db-btns-ES d-flex justify-content-center align-items-center'>
                                    <button
                                        className='DMember-edit-save-btn rounded-pill'
                                        onClick={() => setIsEditing(!isEditing)}
                                    >
                                        {isEditing ? 'SAVE' : 'EDIT'}
                                    </button>
                                </div>
                                <div className='DMember-db-btns-ES'>
                                    <button className='PData-sell-btn  rounded-pill'>SELL</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='Member-prop-orders-class'>
                    <div className="Member-prop-orders-Btns row">
                        <button type="button" className="Member-prop-Btn col-12 col-md-5" onClick={handleProposalClick}>My proposals</button>
                        <button type="button" className="Member-orders-Btn col-12 col-md-5" onClick={handleOrdersClick}>My orders</button>
                    </div>
                </div>
                <>
                    {renderComponent()}
                </>
            </div>
            {/* <button onClick={getUserAccountDetails}>Click to get data</button> */}
            {/* {console.log(receivedData)} */}
        </>
    )
}

export default MainProposalDashboard
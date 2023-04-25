import React, { useEffect, useState } from "react";
import "../../styles/proposal/proposalDashboard.css";
import { ethers } from "ethers";
import { daoInstance } from "../Contracts";
import { useAccount } from 'wagmi';


function ProposalDashComponent() {
  const [showModal, setShowModal] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [enlargedImageSrc, setEnlargedImageSrc] = useState("0");
  const [btnloading, setbtnloading] = useState(false)
  const { address } = useAccount();
  const [allData, setAllData] = useState();
  const [userProp, setUserProp] = useState([]);

  const getUserIDs = async () => {
    try {

      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }
        const con = await daoInstance();
        // console.log(address)
        const getUserID = await con.getUserProposals(address);
        // console.log(getUserID.length)
        let arr = []
        for (let i = 0; i < getUserID.length; i++) {
          const getUserData = await con.getProposal(getUserID[i]._hex);
          arr.push(getUserData);
        }
        // console.log(arr)
        setUserProp(arr);
        setAllData(getUserID);
        return getUserID
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserIDs()
  }, [])


  const getUserDataById = async (e, key) => {
    try {
      setLoadingIndex(key)
      setbtnloading(true)
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }
        const con = await daoInstance();
        const getResult = await con.getProposalResult(e);
        await getResult.wait();
        window.location.reload();
        setbtnloading(false)
        return getResult
      }
    } catch (error) {
      console.log(error);
      setbtnloading(false)
    }
  }

  // useEffect(() => {
  //   getUserDataById()
  // }, [])

  const handleImageClick = (src) => {
    setShowModal(true);
    setEnlargedImageSrc(src.image);
  };

  const handleCloseClick = () => {
    setShowModal(false);
    setEnlargedImageSrc("");
  };

  const modalStyle = {
    display: showModal ? "block" : "none",
  };


  function hexToTimestamp(hex) {
    const unixTimestamp = parseInt(hex, 16);
    const date = new Date(unixTimestamp * 1000);
    const localDate = date.toLocaleString('en-US');
    return localDate;
  }

  return (
    <>
      <div className="proposalContainer">
        <div className="myProposals-head-title py-sm-4 d-flex justify-content-center">
          <p className="myProposals-head-title-name">PROPOSALS MADE BY YOU</p>
        </div>
        <div className="proposalDetails">
          {userProp.map((details, key) => (
            <div className="proposal-company-wrapper" key={key}>
              <div className="proposal-dash">
                <div className="proposal-dash-info">
                  <div className="">
                    {" "}
                    <span className="proposal-dash-label">Type: </span>{" "}
                    <p className="proposal-dash-output-Bg ">{details[3] ? "Emission" : "Offset"}</p>
                  </div>
                  <div className=" ">
                    <span className="proposal-dash-label">Description: </span>
                    <p className="proposal-dash-output-Bg proposal-dash-title scroll-bar ">
                      {details[1]}
                    </p>
                  </div>
                  <div className="mb-3">
                    <span className="proposal-dash-label">Certificate:</span>
                    <div
                      className="proposal-dash-output-Bg proposal-dash-image"
                      style={{ width: "fit-content" }}
                    >
                      {" "}
                      <a
                        onClick={() => {
                          handleImageClick({ image: `https://ipfs.io/ipfs/${details[2]}` })
                        }}
                      >
                        <img
                          src={`https://ipfs.io/ipfs/${details[2]}`}
                          className="img-thumbnail"
                          alt="thumbnail"
                          style={{ height: "150px", width: "150px" }}
                        />
                      </a>
                    </div>
                  </div>
                  <div className="">
                    <span className="proposal-dash-label">Status: </span>{" "}
                    <p className="proposal-dash-output-Bg">{details[10] ? details[10] : "pending"}</p>
                  </div>
                  <div className="">
                    <span className="proposal-dash-label">Proposed at:</span>{" "}
                    <p className="proposal-dash-output-Bg">{hexToTimestamp(details[8]._hex)}</p>
                  </div>
                  <div className="">
                    <span className="proposal-dash-label">Proposal Expire Time:</span>{" "}
                    <p className="proposal-dash-output-Bg">{hexToTimestamp(details[9]._hex)}</p>
                  </div>
                  <div className="">
                    <span className="proposal-dash-label">Result:</span>{" "}<br />
                    <button className="btn btn-primary" style={{ width: "30%" }} key={key} onClick={() => getUserDataById(details[0], key)}>
                      {btnloading && loadingIndex === key ? (
                        <svg
                          className="animate-spin button-spin-svg-pic"
                          version="1.1"
                          id="L9"
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          viewBox="0 0 100 100"
                          style={{ fill: "#fff", height: "30%", width: "30%" }}
                        >
                          <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"></path>
                        </svg>
                      ) : (
                        <>Get Result</>
                      )}
                    </button>
                    {/* <button className=" btn btn-primary" onClick={""}>Result</button> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* ------ Onclick Enlarged Image ----- */}
          <div className="modal" tabIndex="-1" role="dialog" style={modalStyle} >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-body">
                  <img
                    src={enlargedImageSrc}
                    className="proposal-dash-enlargedImageStyle"
                    alt="enlarged"
                  />
                  <span
                    className="close proposal-dash-closeStyle"
                    onClick={handleCloseClick}
                  >
                    &times;
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* ----------Ends here ---------------- */}
          {/* <button onClick={getUserIDs}>Click</button> */}
        </div>
      </div>
    </>
  );
}

export default ProposalDashComponent;

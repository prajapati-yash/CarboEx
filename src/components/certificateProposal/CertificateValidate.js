import React from "react";
import { useState } from "react";
import "../../styles/certificate/CertificateValidation.css"
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { daoInstance } from "../Contracts";
import { Web3Storage } from "web3.storage";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAccount } from 'wagmi';


function CertificateValidate() {
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState(false);
  const [domain, setDomain] = useState();
  const [emission, setEmission] = useState("");
  const [proposal, setProposal] = useState("");
  const { address } = useAccount();
  const [btnloading, setbtnloading] = useState(false);
  const [btndisable, setbtndisable] = useState(false);
  const [showText, setShowText] = useState(false);

  const handleMouseEnter1 = () => {
    setShowText(true);
  };
  const handleMouseLeave1 = () => {
    setShowText(false);
  };


  const handleCertificateChange = (e) => {
    setCertificate(e.target.value);
  };

  // const handleDomainChange = (e) => {
  //   if (e === "Emission") {
  //     setDomain(true);
  //   } else if (e === "Offset") {
  //     setDomain(false)
  //   }
  // };


  const handleEmissionChange = (e) => {
    setEmission(e.target.value);
  };

  const handleProposalChange = (e) => {
    setProposal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      certificate,
      domain,
      emission,
      proposal,
    });
  };

  const client = new Web3Storage({
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEEzNmM2ODkwYTNhZTJEMDRjZkMwNjNERjJjNjliNjY2Y0JlRkY4ZTYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODEzMTIxMDk4OTksIm5hbWUiOiJDYXJib0VYIn0.aR-kLKB8sNL2GAKAwq-iaBI0hoxAkxIW1hnJMsOLzC8",
    // token: process.env.REACT_APP_LOGO_IMG_UPLOAD_TOKEN,
  });

  const uploadImage = async () => {
    const fileInput = document.querySelector('input[type="file"]');
    // Pack files into a CAR and send to web3.storage
    const certCID = await client.put(fileInput.files, {
      name: certificate.name,
      maxRetries: 3,
    });
    return certCID + "/" + fileInput.files[0].name;
    // console.log(img);
    // const res = await client.get(certCID); // Web3Response
    // const files = await res.files(certificate); // Web3File[]
    // for (const file of files) {
    //   // setCid(file.cid)
    //   console.log(file.cid);
    //   return file.cid;
    // }
  };


  const createProposalMain = async () => {
    try {
      console.log("domain " + domain)
      if (certificate === '' || domain === '' || emission === '' || proposal === '') {
        toast.error('Enter the required details', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        setbtndisable(true)
        toast.info('Process is in Progress', {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setbtnloading(true)
        const c = await uploadImage();
        const cids = c;
        const { ethereum } = window;
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          if (!provider) {
            console.log("Metamask is not installed, please install!");
          }
          const conDAO = await daoInstance();
          console.log(conDAO)
          // console.log(proposal, cids, domain, emission)
          const value = await conDAO.getConfigs()
          console.log(value)
          console.log(proposal, cids, domain, emission)
          const isDAOMember = conDAO.isMemberMapping(address)
          const CPTx = await conDAO.createProposal(proposal, cids, domain, emission, { value: String(value[0]) })
          await CPTx.wait();
          setbtnloading(false)
          navigate("/member/dao-member-proposals")
          setbtndisable(false)
          console.log(CPTx)
        }
      }
    } catch (error) {
      console.log(error);
      setbtndisable(false)
      setbtnloading(false)
      // if(error ==="")
    }
  }

  const checkDAOMember = async () => {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      if (!provider) {
        console.log("Metamask is not installed, please install!");
      }
      const conDAO = await daoInstance();
      const isDAOMember = await conDAO.isMemberMapping(address)
      console.log(isDAOMember)
      return isDAOMember;
    }
  }

  return (
    <>
      <div className="certiPageBg">
        <div className="certiBg">
          <div className="text-center">
            <div className="d-flex justify-content-center align-items-center">
              <p className="certiHead">Certificate Validation</p>

            </div>
            <p className="text-center certiSubHead ">You must be a DAO Member to upload the Certificate for Validation</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="certificate" className="form-label certiLabel">
                Upload your certificate:
              </label>
              <input
                type="file"
                className="form-control certiInput"
                id="certificate"
                onChange={handleCertificateChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="domain" className="form-label certiLabel">
                Select your domain:
              </label>
              <select
                className="form-select certiInput"
                id="domain"
                onChange={(e) => {
                  if (e.target.value === "Emission") {
                    setDomain(true);
                  } else if (e.target.value === "Offset") {
                    setDomain(false)
                  }
                }}
                defaultValue={domain}
              >
                <option value="">Select domain</option>
                <option value="Emission">Emission</option>
                <option value="Offset">Offset</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="emission" className="form-label certiLabel">
                Enter the value of Emission/Offset (in tons):
              </label>
              <input
                type="text"
                className="form-control certiInput emissionInput"
                placeholder="in tons"
                id="emission"
                onChange={handleEmissionChange}
                value={emission}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="proposal" className="form-label">
                <span className="proposalText"> For Proposal </span> <br /> <span className="detailsText">Enter your details</span>
              </label>
              <textarea
                className="form-control certiInput"
                placeholder="Description"
                id="proposal"
                rows="3"
                onChange={handleProposalChange}
                value={proposal}
              ></textarea>
            </div>
            <button type="submit" className=" rounded-pill certiSubmit mt-3"
              disabled={btndisable}
              onClick={async () => {
                console.log("Button CLicked")
                const isAllowed = await checkDAOMember();
                console.log(isAllowed)
                if (!isAllowed) {
                  setbtndisable(false)
                  toast.error(`You are not a DAO Member`, {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                } else {
                  createProposalMain()
                }
              }


              }>
              {btnloading ? (
                <svg
                  className="animate-spin button-spin-svg-pic"
                  version="1.1"
                  id="L9"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 100 100"
                  style={{ fill: "#fff" }}
                >
                  <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"></path>
                </svg>
              ) : (<>Submit</>)}
            </button>
            <ToastContainer />
          </form>
        </div>
      </div>
      {/* <button onClick={() => checkDAOMember()}> Click to get true/false</button> */}
    </>
  );
}

export default CertificateValidate;

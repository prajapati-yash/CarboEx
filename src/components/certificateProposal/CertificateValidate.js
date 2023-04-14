import React from "react";
import { useState } from "react";
import "../../styles/certificate/CertificateValidation.css"
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { daoInstance } from "../Contracts";
import { Web3Storage } from "web3.storage";

function CertificateValidate() {
  const [certificate, setCertificate] = useState("");
  const [domain, setDomain] = useState("");
  const [emission, setEmission] = useState("");
  const [proposal, setProposal] = useState("");

  const handleCertificateChange = (e) => {
    setCertificate(e.target.value);
  };

  const handleDomainChange = (e) => {
    setDomain(e.target.value);
  };

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
    const rootCid = await client.put(fileInput.files, {
      name: certificate.name,
      maxRetries: 3,
    });
    // console.log(img);
    const res = await client.get(rootCid); // Web3Response
    const files = await res.files(certificate); // Web3File[]
    for (const file of files) {
      // setCid(file.cid)
      console.log(file.cid);
      return file.cid;
    }
  };


  const createProposalMain = async () => {
    const c = await uploadImage();
    const cids = c;
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }
        const conDAO = await daoInstance();
        console.log(conDAO)
        const CPTx = await conDAO.createProposal(proposal, cids, domain, emission)
        console.log(CPTx)
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="certiPageBg">
        <div className="certiBg">
          <div className="text-center certiHead">Certificate Validation</div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="certificate" className="form-label certiLabel">
                Upload your certificate
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
                onChange={handleDomainChange}
                value={domain}
              >
                <option value="">Select domain</option>
                <option value="true">Emission</option>
                <option value="false">Offset</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="emission" className="form-label certiLabel">
                Enter the value of emission
              </label>
              <input
                type="text"
                className="form-control certiInput emissionInput"
                placeholder="tons"
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
            <button type="submit" className=" rounded-pill certiSubmit mt-3" onClick={createProposalMain}>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CertificateValidate;
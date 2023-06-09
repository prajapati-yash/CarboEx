import React, { useEffect, useState } from "react";
import "../../styles/navbar/Navbar.css";
import { NavLink, useLocation } from "react-router-dom";
import ConnectButtonCustom from "../ConnectButtonCustom";
import { useAccount } from 'wagmi';
import { ethers } from "ethers";
import { companyInstance } from "../Contracts";
import { link, useNavigate } from "react-router-dom";
import SignUp from "../../pages/SignUp";

function Navbar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { address, isConnected } = useAccount();
  const location = useLocation();
  const isMember = location.pathname === '/become-member'

  const verifyUserAccount = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }
        const con = await companyInstance();
        const verifyUser = await con.isCompaniesAddMapping(address)
        // console.log(verifyUser)
        return verifyUser;
      }
    } catch (error) {
      console.log(error);
    }
  }

  // const verifyNavbar = async () => {
  //   if (address) {
  //     const tx = await verifyUserAccount();
  //     if (tx) {
  //       setIsAuthenticated(true)
  //     } else {
  //       setIsAuthenticated(false)
  //     }
  //   }
  // }
  const verifyNavbar = async () => {
    try {
      if (address) {
        const tx = await verifyUserAccount();
        if (tx) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    verifyNavbar()
  }, [isAuthenticated])
  const title = "member"
  const verify = "member" ? true : false;

  const navigation = [
    // {
    //   title: "Resources",
    //   link: "/Resources",
    // },

    {
      title: "Explore",
      link: "/buy-carbon-credits",
      auth: true,
      // isActive:"${isExplo ? 'active':''}",
      className: "explore"
    },
    {
      title: "Member",
      link: "",
      auth: true,
      // isActive:`auth === "Member"?'notMember':'mainMember'}`,
      className: "member",
      submenu: [
        { title: "Become a DAO Member", link: "/become-member", className: "member" },
        { title: "All Proposals", link: "/dao-member-proposals", className: "member" },
      ],
    },
    {
      title: "Our Approach",
      link: "",
      className: "approach",
      auth: true,
      submenu: [
        { title: "Add Your Proposal", link: "/certificate-validation-proposal" },
        { title: "Calculate Carbon Footprints", link: "/calculator" },
      ],
    },
    {
      title: "Know More",
      link: "",
      className: "knowMore",
      submenu: [
        {
          title: "About Us",
          link: "/about"
        },
        {
          title: "Resources",
          link: "/resources"
        }
      ]
    },
    {
      title: "Contact",
      link: "/contact",
      className: "contact"
    },
    {
      title: "Dashboard",
      link: "/user-dashboard",
      auth: true,
      className: "dashboard"
    },
  ];




  const hasSubmenu = (item) => {
    return item.submenu && item.submenu.length > 0;
  };

  return (
    <>
      {/* <button onClick={verifyUserAccount}></button> */}
      <nav
        className="navbar navbar-expand-lg navbar-light sticky-top"
        role="navigation"
      >
        <div id="container" className="container-fluid px-4 px-md-5  ">
          <NavLink className="navbar-brand" to="/">
            <img
              src="../assets/logo/carboEx_Logo.png"
              height="100px"
              width="150px"
              className="img-fluid d-inline-block align-top justify-content-between"
              alt=""
              style={{ borderRadius: "50%" }}
            />
          </NavLink>

          <buttons
            type="button"
            className="navbar-toggler collapsed d-flex d-lg-none flex-column justify-content-around"
            data-bs-toggle="collapse"
            data-bs-target="#navbarRightAlignExample"
            aria-controls="navbarRightAlignExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="toggler-icon top-bar"></span>
            <span className="toggler-icon middle-bar"></span>
            <span className="toggler-icon bottom-bar"></span>
          </buttons>
          <div
            className="collapse navbar-collapse justify-content-end nav-height"
            id="navbarRightAlignExample"
          >
            <ul className="navbar-nav  ml-auto align-items-center mb-2 mb-lg-0">
              {navigation.map((item, index) => {
                // <NavLink1 body={item} key={index} />

                if (item.auth && !isAuthenticated) {
                  return null;
                }
                return (
                  <li className="nav-item" key={index}>
                    {hasSubmenu(item) ? (
                      <div className="dropdown">
                        <NavLink
                          className={"nav-link dropdown-toggle p-0  " + `${item.isActive}`}
                          aria-current="page"
                          to={item.link}
                          id={`nav-link-${index}`}
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        // onClick={() => {
                        //   console.log(window.innerWidth)
                        //   if (window.innerWidth < 1000) {
                        //     const navbarToggler =
                        //       document.querySelector(".navbar-toggler");
                        //     if (navbarToggler) {
                        //       navbarToggler.click();
                        //     }
                        //   }
                        // }}
                        >
                          {item.title}
                        </NavLink>

                        <ul
                          className="dropdown-menu"
                          aria-labelledby={`dropdown-${index}`}
                        >
                          {item.submenu.map((subitem, subindex) => (
                            <li key={subindex}>
                              <NavLink aria-current="page" to={subitem.link} className={"sub-item dropdown-item p-0 " + `${subitem.className}`}>
                                {subitem.title}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <NavLink to={item.link} className={"nav-link " + `${item.className} ${item.isActive}`}>
                        {item.title}
                      </NavLink>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="ps-lg-3 ps-4 d-flex align-items-center justify-content-center">
              <ConnectButtonCustom />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

// function NavLink1({ body },{index}) {
//   return (
//     <>
{
  /* <li className="nav-item">
        <NavLink
          className="nav-link p-0 active"
          aria-current="page"
          to={body.link}
          onClick={() => {
            // console.log(window.innerWidth)
            if (window.innerWidth < 1000) {
              const navbarToggler = document.querySelector('.navbar-toggler');
              if (navbarToggler) {
                navbarToggler.click();
              }
            }
          }}
        >
          {body.title}
        </NavLink>
      </li> */
}
{
  /* 
      <li className="nav-item">
      {hasSubmenu(item)?(
        <div className="dropdown">
          <NavLink
          className="nav-link dropdown-toggle p-0 active"
          aria-current="page"
          to={body.link}
          id={`nav-link-${index}`}
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {body.title}
        </NavLink>

        <ul 
        className="dropdown-menu"
         aria-labelledby={`dropdown-${index}`}>
            {body.submenu.map((subitem, subindex) => (
              <li key={subindex} className="nav-item dropdown-item">
                <NavLink
                  className="sub-item dropdown-item p-0 active"
                  aria-current="page"
                  key={subindex}
                  to={subitem.link}
                >
                  {subitem.title}
                </NavLink>
             </li>
            ))}

        </ul>

        </div>
      ): (
        <a href={body.link} className="nav-link">
          {body.title}
        </a>
      )}
    </li>
        
    </>
  );
} */

}

export default Navbar;
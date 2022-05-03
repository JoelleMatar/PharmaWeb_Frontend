import React, { useEffect, useState } from "react";
import ResponsiveMenu from "react-responsive-navbar";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import "./Navbar.css";
import Logo from "../../../src/assets/test.png";
import AccountPopover from "./AccountPopover";

export default function (props) {
    const [isLogged, setisLogged] = useState(false);

    // const loggedUser = localStorage.getItem("profile");

    // if(loggedUser) {
    //     setisLogged(true);
    // }

    var loggedUser;

    useEffect(() => {
        loggedUser = localStorage.getItem("profile");
        if (loggedUser) {
            setisLogged(true);
        }


    }, []);
    console.log("loggd user", loggedUser);

    return (
        <header className="header">
            <div className="wrap">
                <header >
                    <a href="/home">
                        <img src={Logo} className="logo" />
                    </a>

                </header>
                <nav className="menu">
                    <ResponsiveMenu
                        menuOpenButton={
                            <div className="menu hamburger-menu menu-btn">
                                <MenuIcon sx={{ width: '1.5em', height: '1.5em', }} />
                            </div>
                        }
                        menuCloseButton={
                            <div className="menu hamburger-menu menu-btn">
                                <CloseIcon size={32} />
                            </div>
                        }
                        changeMenuOn="900px"
                        menu={
                            <ul className="menu-list">
                                <li className="menu-item is-active menu-item--play">
                                    <a href="#" className="menu-link" >
                                        Medical Products
                                    </a>
                                </li>
                                <li className="menu-item menu-item--play">
                                    {
                                        window.location.href === "http://localhost:3000/home/pharmacies" ? (
                                            <a href="/home/pharmacies" className="menu-link" style={{ color: '#F8AF86' }}>
                                                Pharmacies
                                            </a>
                                        ) : (
                                            <a href="/home/pharmacies" className="menu-link">
                                                Pharmacies
                                            </a>
                                        )
                                    }

                                </li>
                                <li className="menu-item is-active menu-item--play">
                                    <a href="#" className="menu-link">
                                        Request Drug
                                    </a>
                                </li>
                                <li className="menu-item is-active menu-item--play">
                                    <a href="#" className="menu-link">
                                        Donate Drug
                                    </a>
                                </li>
                                {
                                    isLogged ? (
                                        <li className="menu-item is-active menu-item--play">
                                            <a className="menu-link">
                                                <AccountPopover />
                                            </a>
                                        </li>
                                    ) : (
                                        <li className="menu-item is-active menu-item--play">
                                            <a href="/auth/login" className="menu-link log" style={{ fontWeight: 'bolder', color: '#F8AF86' }}>
                                                Login/Register
                                            </a>
                                        </li>
                                    )
                                }

                            </ul>
                        }
                    />
                </nav>
            </div>
        </header>
    );
}

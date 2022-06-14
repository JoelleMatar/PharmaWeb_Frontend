import React, { useEffect, useState } from "react";
import ResponsiveMenu from "react-responsive-navbar";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import "./Navbar.css";
import Logo from "../../../src/assets/logoPharma.png";
import AccountPopover from "./AccountPopover";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid #00B8B0`,
        padding: '0 4px',
    },
}));

const Navbar = () => {
    const [isLogged, setisLogged] = useState(localStorage.getItem("profile"));

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
                        changeMenuOn="990px"
                        menu={
                            <ul className="menu-list">
                                <li className="menu-item is-active menu-item--play">
                                    {
                                        window.location.href === "http://localhost:3000/home/products" ? (
                                            <a href="/home/products" className="menu-link" style={{ color: '#00B8B0', borderBottomStyle: 'solid', borderBottomBolor: '#00B8B0' }}>
                                                Medical Products
                                            </a>
                                        ) : (
                                            <a href="/home/products" className="menu-link">
                                                Medical Products
                                            </a>
                                        )
                                    }
                                </li>
                                <li className="menu-item menu-item--play">
                                    {
                                        window.location.href === "http://localhost:3000/home/pharmacies" ? (
                                            <a href="/home/pharmacies" className="menu-link" style={{ color: '#00B8B0', borderBottomStyle: 'solid', borderBottomBolor: '#00B8B0' }}>
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
                                    {
                                        window.location.href === "http://localhost:3000/home/request-drug" ? (
                                            <a href="/home/request-drug" className="menu-link" style={{ color: '#00B8B0', borderBottomStyle: 'solid', borderBottomBolor: '#00B8B0' }}>
                                                Request Drug
                                            </a>
                                        ) : (
                                            <a href="/home/request-drug" className="menu-link">
                                                Request Drug
                                            </a>
                                        )
                                    }
                                </li>
                                <li className="menu-item is-active menu-item--play">
                                    <a href="#" className="menu-link">
                                        Donate Drug
                                    </a>
                                </li>
                                <li className="menu-item is-active menu-item--play">
                                    {
                                        window.location.href === "http://localhost:3000/home/cart" ? (
                                            <a href="/home/cart" className="menu-link"  sx={{ marginTop: '20px', borderBottomStyle: 'solid', borderBottomBolor: '#00B8B0' }}>
                                                <StyledBadge badgeContent={4}>
                                                    <ShoppingCartIcon sx={{ color: 'white' }} />
                                                </StyledBadge>
                                            </a>
                                        ) : (
                                            <a href="/home/cart" className="menu-link" sx={{ marginTop: '20px' }}>
                                                <StyledBadge badgeContent={4}>
                                                    <ShoppingCartIcon sx={{ color: 'white' }} />
                                                </StyledBadge>
                                            </a>
                                        )
                                    }
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
                                            <a href="/auth/login" className="menu-link log" style={{ fontWeight: 'bolder', color: '#00B8B0' }}>
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

export default Navbar;
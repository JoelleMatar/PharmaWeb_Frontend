import React from "react";
import ResponsiveMenu from "react-responsive-navbar";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import "./Navbar.css";
import Logo from "../../../src/assets/logo.svg";
import AccountPopover from "./AccountPopover";

export default function(props) {
  return (
    <header className="header">
      <div className="wrap">
        <header >
              <img src={Logo} className="logo" />
        </header>
        <nav className="menu">
          <ResponsiveMenu
            menuOpenButton={
              <div className="menu hamburger-menu menu-btn">
                <MenuIcon sx={{ width: '1.5em', height: '1.5em',}} />
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
                  <a href="#" className="menu-link">
                    Medical Products
                  </a>
                </li>
                <li className="menu-item is-active menu-item--play">
                  <a href="#" className="menu-link">
                    Pharmacies
                  </a>
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
                <li className="menu-item is-active menu-item--play">
                  <a href="#" className="menu-link">
                    <AccountPopover />
                  </a>
                </li>

              </ul>
            }
          />
        </nav>
      </div>
    </header>
  );
}

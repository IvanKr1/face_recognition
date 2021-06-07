import React from "react";
import Logo from "../assets/logo.png";
import "../scss/Header.scss";

const Header = () => {
  return (
    <div className="header__container">
      <img src={Logo} alt="app logo" />
    </div>
  );
};

export default Header;

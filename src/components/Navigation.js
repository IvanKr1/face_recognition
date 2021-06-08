import React from "react";
import "../scss/Navigation.scss";

const Navigation = ({ onSignOut }) => {
  return (
    <div className="nav__container">
      <p onClick={() => onSignOut("signIn")}>Sign Out</p>
    </div>
  );
};

export default Navigation;

import React from "react";
import "../scss/Navigation.scss";

const Navigation = ({ onSignOut, signedIn }) => {
  return (
    <div className="nav__container">
      {signedIn !== "home" ? (
        <p onClick={() => onSignOut("signIn")}>Sign In</p>
      ) : (
        <p onClick={() => onSignOut("signout")}>Sign Out</p>
      )}
      <p onClick={() => onSignOut("register")}>Register</p>
    </div>
  );
};

export default Navigation;

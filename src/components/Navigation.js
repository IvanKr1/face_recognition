import React from "react";
import "../scss/Navigation.scss";

const Navigation = ({ onSignOut, signedIn }) => {
  return (
    <div className="nav__container">
      {signedIn !== "home" ? (
        <React.Fragment>
          <p onClick={() => onSignOut("signIn")}>Sign In</p>
          <p onClick={() => onSignOut("register")}>Register</p>
        </React.Fragment>
      ) : (
        <p onClick={() => onSignOut("signIn")}>Sign Out</p>
      )}
    </div>
  );
};

export default Navigation;

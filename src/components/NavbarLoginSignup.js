import React from "react";
import { Link } from "react-router-dom";

function NavbarLoginSignup(props) {
  return (
    <div className="nav">
      <div className="navLogo">
        <h2>Eat Healthy</h2>
      </div>

      <div className="innerNav">
        <div className="profileNav"></div>
        <Link to="/login" className="navLoginSignup">
          Login
        </Link>
        <Link to="/signup" className="navLoginSignup">
          Signup
        </Link>
      </div>
    </div>
  );
}

export default NavbarLoginSignup;

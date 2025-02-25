import React from "react";
import Logo from "../../../assets/Images/logo.svg";
import "./Logo.css";

const logo: React.FC = () => (
  <img className="logo-shelp" src={Logo} alt="logo" />
);

export default logo;

import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../Logo/Logo";
import AuthServices from "../../../../ApiServices/auth.service";
import { googleLogout } from "@react-oauth/google";
import Search from "../../Search/search";

const Navbar: React.FC = () => {
  const [isLogin, setLogin] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setLogin(true);
    }
  }, []);

  const logout = () => {
    setLogin(false);
    AuthServices.logout();
    googleLogout();
    console.log("logout called");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <NavLink to="/home/all" className="navbar-brand">
        <Logo />
      </NavLink>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fa fa-bars" aria-hidden="true"></i>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item dropdown">
            <a
              href="/"
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Category
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              {[
                { path: "/home/all", label: "All Content" },
                { path: "/home/Web Development", label: "Web Development" },
                { path: "/home/Web Designing", label: "Web Designing" },
                { path: "/home/React", label: "React" },
                { path: "/home/NodeJs", label: "NodeJs" },
                { path: "/home/ML", label: "Machine Learning" },
                { path: "/home/Photography", label: "Photography" },
                { path: "/home/IOT", label: "IOT" },
              ].map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    isActive
                      ? "dropdown-item active-categoryMenu"
                      : "dropdown-item"
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </li>
        </ul>

        <Search />

        {!isLogin ? (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink to="/signup" className="nav-link Signupbtn">
                Signup
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login" className="nav-link Loginbtn">
                Login
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink to="/teacherhome" className="nav-link teachLink">
                Be a Mentor
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/Cart" className="nav-link">
                <i className="fa fa-book" aria-hidden="true">
                  <span id="bookmarkNav"> Bookmark</span>
                </i>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/Profile" className="nav-link">
                <i className="fa fa-user" aria-hidden="true">
                  <span id="profile"> Profile</span>
                </i>
              </NavLink>
            </li>
            <li className="nav-item">
              <button onClick={logout} className="logout-button">
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

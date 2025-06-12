
import React, { useEffect, useState } from "react";
import "./header.css";
import { NavLink } from "react-router-dom";
import axios from "axios"


const Header = () => {
  const [userdata, setUserdata] = useState({});
  console.log("response", userdata);

  const getUser = async () => {
    try {
      // const response = await axios.get("https://quicksign-backend.onrender.com/login/success", { withCredentials: true });
      const response = await axios.get("https://quicksign-backend.onrender.com/login/success", { withCredentials: true });

      setUserdata(response.data.user)
    } catch (error) {
      console.log("error", error);
    }
  }


  const logout = () => {
    window.open("https://quicksign-backend.onrender.com/auth/logout", "_self");

  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <header className="modern-header">
      <nav className="nav-container">
        <div className="brand-section">
          <div className="brand-content">
            <span className="brand-text">QuickSign</span>
          </div>
        </div>
        
        <div className="nav-section">
          {Object?.keys(userdata)?.length > 0 ? (
            <div className="user-nav">
              <NavLink to="/" className="nav-link">
                <span>Home</span>
              </NavLink>
              
              <NavLink to="/dashboard" className="nav-link">
                <span>Dashboard</span>
              </NavLink>
              
              <div className="user-menu">
                <div className="user-info">
                <img 
                    src={userdata?.image || "/img/default-avatar.png"} 
                    alt="Profile" 
                    className="user-avatar"
                  />

                  <span className="user-name">
                    {userdata?.displayName?.split(" ")[0]}
                  </span>
                </div>
                
                <button onClick={logout} className="logout-btn">
                  <svg className="logout-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <NavLink to="/login" className="login-btn">
              <svg className="login-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Login
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

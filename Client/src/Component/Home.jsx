

import React from 'react';
import { Link } from "react-router-dom";
import "./home.css";
import { useNavigate } from 'react-router-dom';
import checkImg from '../assets/check (2).png';





function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard');
  };

  return (
    <>
      <div className='main'>
        <div className="righheading">
          <h1 className='title'>
            Upload, Sign,  <br/> and Share <br/>PDFs in Minutes
          </h1>
          <p className='para'>
            Make signing effortless for you and your team, <br/> with our secure, user-friendly e-signature solution.
          </p>
          
          <button className='button' onClick={handleClick}>
            <span className='button-text'>Try Now</span>
            <svg className='button-icon' width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </button>
        </div>
        
        <div className="leftheading">
          <div className="image-container">
            <img src={checkImg} alt="check-box" className="check-box" />
{/*             <img src="/public/img/check (2).png" alt="check-box" className='check-box'/> */}
            <div className="image-overlay"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

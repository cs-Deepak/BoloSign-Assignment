import React from 'react';
import './dashboard.css';
import ApryseSignApp from '../DashComponent/ApryseSignApp';


function Dashboard() {
  
  return (
    <div className="dashboard-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-gradient">Dashboard</span>
          </h1>

        </div>
      </div>
      <div>

        <ApryseSignApp />
       
       
      </div>
    </div>
  );
}

export default Dashboard;

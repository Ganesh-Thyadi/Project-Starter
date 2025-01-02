import React, { useRef, useState } from "react";
import "./Styles/Content.css";
import BannerScroll from "./BannerScroll";
import CardSection from "./Cards";
import Projects from "./Projects";
import RequestCardSection from "./Request Cards";

const Content = ({ currentTab }) => {
  
  const renderContent = () => {
    switch (currentTab) {
      case "home":
        return (
          <div className="homepage">
            <div className="bannerbox">
              <BannerScroll />
            </div>
            <div className="cardbox1">
              <CardSection rowsToShow={1} />
            </div>
          </div>
        );
      case "projects":
        return (
          <Projects/>
        );
      case "yourProjects":
        return (
          <div className="your-projects">
            <h2 className="">Your Projects</h2>

            <div className="search-bar" style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <input
                type="text"
                placeholder="Search your projects..."
                onChange={(e) => console.log(e.target.value)}
                className="search-input"
                style={{ flex: 1, maxWidth: "500px", padding: "10px", borderRadius: "10px 0 0 10px", border: "none" }}
              />
              <button
                className="search-button"
                style={{ width:'5%', padding: "10px 20px", borderRadius: "0 10px 10px 0", border: "none", backgroundColor: "#007bff", color: "#fff", cursor: "pointer" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </button>
            </div>

            <div className="cardbox2">
              <CardSection rowsToShow={2} />
            </div>
          </div>
        );
      case "projectRequests":
        return <div className="tab-content">
          <div className="request-cardbox">
          <h2>Project Requests</h2>
          <RequestCardSection rowsToShow={2} />
          </div>
          </div>;
      case "account":
        return <div className="tab-content">This is your account information.</div>;
      case "settings":
        return <div className="tab-content">Configure your settings here.</div>;
      case "logout":
        return <div className="tab-content">You have been logged out.</div>;
      default:
        return <div className="tab-content">Welcome to the Dashboard Home!</div>;
    }
  };

  return <div className="content-container">{renderContent()}</div>;
};

export default Content;

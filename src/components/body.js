import React, { useRef, useState } from "react";
import "./Styles/Content.css";
import BannerScroll from "./BannerScroll";
import CardSection from "./Cards";
import Projects from "./Projects";
import RequestCardSection from "./Request Cards";
import FolderViewer from "./supabase";

const Content = ({ currentTab }) => {
  
  const renderContent = () => {
    switch (currentTab) {
      case "home":
        return (
          <div className="homepage">
            {/* <div className="bannerbox">
              <BannerScroll />
            </div> */}
            {/* <div className="cardbox1">
              <CardSection rowsToShow={1} />
            </div> */}
          </div>
        );
      case "projects":
        return (
          <Projects/>
        );
      case "yourProjects":
        return (
          <div className="your-projects" >
            <h2 className="">Your Projects</h2>

            

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
        return <div className="tab-content">
          <FolderViewer/>
        </div>;
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

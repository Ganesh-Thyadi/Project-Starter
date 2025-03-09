import React, { useRef, useState } from "react";
import "./Styles/Content.css";
import Card from "../Card";
import RequestCard from '../Request Card';
import RequestCardForm from "../RequestCardForm";
import FolderViewer from "./supabase";

const Content = ({ currentTab }) => {
  
  const renderContent = () => {
    switch (currentTab) {
      case "projects":
        return (
          <Card/>
        );
      case "projectRequests":
        return (
            <RequestCard/>
        );
      // case "account":
      //   return <div className="tab-content">
      //     <FolderViewer/>
      //   </div>;

      // case "logout":
      //   return <div className="tab-content">You have been logged out.</div>;
      default :
        return (<Card/>)
          
          
    }
  };

  return <div className="content-container">{renderContent()}</div>;
};

export default Content;

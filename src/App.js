import logo from './logo.svg';
import React, { useState } from "react";
import Sidebar from "./components/sidebar";
import Content from "./components/body";
import "./App.css";

const App = () => {
  const [currentTab, setCurrentTab] = useState("home");

  return (
    <div className="dashboard">
      <Sidebar onTabChange={setCurrentTab} />
      <Content currentTab={currentTab} />
    </div>
  );
};

export default App;



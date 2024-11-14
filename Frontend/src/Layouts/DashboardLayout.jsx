import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Navigation/Sidebar/Sidebar";
import TopBar from "../Components/Navigation/TopBar/TopBar";
import Footer from "../Components/Footer/Footer";

export default function DashboardLayout(props) {
  const [openClass, setOpenClass] = useState("");
  const toggleOpenClass = () => {
    setOpenClass(openClass === "" ? "open" : "");
  };

  const [fullIcon, setFullIcon] = useState("expand");

  const toggleFullScreen = () => {
    const element = document.getElementById("root");
    const isFullScreen = document.fullscreenElement;
    if (isFullScreen) {
      document.exitFullscreen();
      setFullIcon("expand");
    } else {
      element.requestFullscreen();
      setFullIcon("compress");
    }
  };

  return (
    <div className="container-fluid position-relative d-flex p-0">
      <Sidebar openClass={openClass} />
      <div className={`content ${openClass}`}>
        <TopBar
          toggleOpenClass={toggleOpenClass}
          handleTheme={props.handleTheme}
          theme={props.theme}
          toggleFullScreen={toggleFullScreen}
          fullIcon={fullIcon}
        />

        <Outlet />

        <Footer />
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./Containers/Login/Login";
import Home from "./Containers/Home/Home";

import useMediaQuery from "./Utils/useMediaQuery";

const App = () => {
  const [screen, setScreen] = useState(0);

  const isMobile = useMediaQuery("(max-width: 1025px)");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setScreen(2);
    else setScreen(1);
  }, []);

  const renderScreen = () => {
    switch (screen) {
      case 0:
        return null;
      case 1:
        return <Login setScreen={setScreen} />;
      case 2:
        return <Home setScreen={setScreen} />;
      default:
        return null;
    }
  };

  return isMobile ? (
    <>
      <ToastContainer />
      {renderScreen()}
    </>
  ) : (
    <div>Please use this app only on your mobile!</div>
  );
};

export default App;

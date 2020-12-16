import React, { useState, useEffect } from "react";

import styles from "./Home.module.css";

import Attendance from "../Attendance/Attendance";
import ResetPassword from "../ResetPassword/ResetPassword";

const Home = () => {
  const [name, setName] = useState();
  const [screen, setScreen] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setName(user.name);
  }, []);

  switch (screen) {
    case 0:
      return (
        <div className={styles.screen}>
          <h2 className={styles.welcome}>
            Welcome, <span className={styles.gold}>{name}</span>
          </h2>
          <button className={styles.button} onClick={() => setScreen(1)}>
            Mark Attendance
          </button>
          <button className={styles.button} onClick={() => setScreen(2)}>
            Reset Password
          </button>
        </div>
      );
    case 1:
      return <Attendance />;
    case 2:
      return <ResetPassword />;
    default:
      return null;
  }
};

export default Home;

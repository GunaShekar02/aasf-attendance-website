import React, { useState, useEffect } from "react";

import styles from "./Home.module.css";

import Attendance from "../Attendance/Attendance";
import ResetPassword from "../ResetPassword/ResetPassword";

import { getUserDetails } from "../../Services/users.service";

const Home = (props) => {
  const [user, setUser] = useState();
  const [screen, setScreen] = useState(0);

  const refreshUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const userDetails = await getUserDetails(token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          _id: userDetails.user._id,
          name: userDetails.user.name,
          rank: userDetails.rank,
          score:
            userDetails.user?.score?.technical +
              userDetails.user?.score?.managerial +
              userDetails.user?.score?.oratory || 0,
        })
      );
      setUser({
        _id: userDetails.user._id,
        name: userDetails.user.name,
        rank: userDetails.rank,
        score:
          userDetails.user?.score?.technical +
            userDetails.user?.score?.managerial +
            userDetails.user?.score?.oratory || 0,
      });
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    refreshUserDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    props.setScreen(1);
  };

  switch (screen) {
    case 0:
      return (
        <div className={styles.screen}>
          <h2 className={styles.text}>
            Welcome, <span className={styles.gold}>{user?.name}</span>
          </h2>
          <h2 className={styles.text}>
            Your Score : <span className={styles.gold}>{user?.score}</span>
          </h2>
          <h2 className={styles.text}>
            Leaderboard Rank : <span className={styles.gold}>{user?.rank}</span>
          </h2>
          <button className={styles.button} onClick={() => setScreen(1)}>
            Mark Attendance
          </button>
          <button className={styles.button} onClick={() => setScreen(2)}>
            Reset Password
          </button>
          <button className={styles.button} onClick={handleLogout}>
            Logout
          </button>
        </div>
      );
    case 1:
      return <Attendance setScreen={setScreen} />;
    case 2:
      return <ResetPassword setScreen={setScreen} />;
    default:
      return null;
  }
};

export default Home;

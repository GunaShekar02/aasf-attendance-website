import React, { useState, useEffect } from "react";

import styles from "./Home.module.css";

const Home = () => {
  const [name, setName] = useState();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setName(user.name);
  }, []);

  return (
    <div className={styles.screen}>
      <h2 className={styles.welcome}>
        Welcome, <span className={styles.gold}>{name}</span>
      </h2>
      <button className={styles.button}>Mark Attendance</button>
      <button className={styles.button}>Reset Password</button>
    </div>
  );
};

export default Home;

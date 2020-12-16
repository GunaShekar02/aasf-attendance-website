import React, { useState } from "react";
import { toast } from "react-toastify";

import styles from "./Login.module.css";

import logo from "../../Assets/logo.png";

import validRollNumber from "../../Utils/rollNumberValidation";

import { login } from "../../Services/auth.service";
import { getUserDetails } from "../../Services/users.service";

const Login = (props) => {
  const [roll, setRoll] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const notify = (message, type) =>
    toast(message, {
      type,
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  const handleLogin = async () => {
    try {
      if (loading) return;
      if (!roll || !password || !validRollNumber(roll))
        throw { message: "Please enter a valid roll number and password!" };
      setLoading(true);
      const data = await login(roll, password);
      const userDetails = await getUserDetails(data.token);
      console.log(userDetails);
      localStorage.setItem("token", data.token);
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
      props.setScreen(2);
    } catch (err) {
      notify(err.message || "Something went wrong! Please try again!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.screen}>
      <img src={logo} className={styles.logo} alt="Logo" />
      <input
        type="text"
        placeholder="Roll Number(20XXYYY-ZZZ)"
        className={styles.input}
        value={roll}
        onChange={({ target: { value } }) => setRoll(value)}
      />
      <input
        type="password"
        placeholder="Password"
        className={styles.input}
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
      />
      <button className={styles.button} onClick={handleLogin}>
        {loading ? "Loading..." : "Login"}
      </button>
    </div>
  );
};

export default Login;

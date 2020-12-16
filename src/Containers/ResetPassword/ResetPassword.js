import React, { useState } from "react";
import { toast } from "react-toastify";

import styles from "./ResetPassword.module.css";

import { resetPassword } from "../../Services/users.service";

const ResetPassword = (props) => {
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
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

  const handleReset = async () => {
    try {
      if (loading) return;
      if (!currentPassword || !newPassword || !repeatPassword)
        throw { message: "Please fill all the fields." };
      if (newPassword.length < 8)
        throw { message: "Please select a password of at least 8 characters" };
      if (newPassword != repeatPassword)
        throw { message: "Repeated password doesn't match!" };

      setLoading(true);
      await resetPassword(currentPassword, newPassword);
      notify("Password reset successfully!", "success");
    } catch (err) {
      notify(err.message || "Something went wrong! Please try again!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.screen}>
      <h3 className={styles.home} onClick={() => props.setScreen(0)}>
        {"< HOME"}
      </h3>
      <input
        type="password"
        placeholder="Current Password"
        className={styles.input}
        value={currentPassword}
        onChange={({ target: { value } }) => setCurrentPassword(value)}
      />
      <input
        type="password"
        placeholder="New Password"
        className={styles.input}
        value={newPassword}
        onChange={({ target: { value } }) => setNewPassword(value)}
      />
      <input
        type="password"
        placeholder="Repeat New Password"
        className={styles.input}
        value={repeatPassword}
        onChange={({ target: { value } }) => setRepeatPassword(value)}
      />
      <button className={styles.button} onClick={handleReset}>
        {loading ? "Loading..." : "Reset"}
      </button>
    </div>
  );
};

export default ResetPassword;

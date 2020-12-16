import React from "react";
import QrReader from "react-qr-reader";
import { toast } from "react-toastify";

import styles from "./Attendance.module.css";

import { markAttendance } from "../../Services/users.service";

const Attendance = (props) => {
  const handleScan = async (scannedData) => {
    try {
      if (!scannedData) return;
      await markAttendance(scannedData);
      notify("Attendance marked successfully!", "success");
    } catch (err) {
      notify(
        err.message || "OOPS! Something went wrong! Please try again!",
        "error"
      );
    }
  };

  const handleError = () => {
    notify("OOPS! Something went wrong!");
  };

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

  return (
    <div className={styles.screen}>
      <h3 className={styles.home} onClick={() => props.setScreen(0)}>
        {"< HOME"}
      </h3>
      <QrReader
        delay={5 * 1000}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
      <h3 className={styles.text}>
        The scanner scans every 5 seconds. Keep the QR in front of the camera
        for at least 5 seconds if you do not get the success message.
      </h3>
    </div>
  );
};

export default Attendance;

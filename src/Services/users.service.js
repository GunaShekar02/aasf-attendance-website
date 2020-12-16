import axios from "axios";

import { USER_DETAILS_URL, ATTENDANCE_URL } from "../Utils/constants";

export const getUserDetails = async (token) => {
  try {
    const { data } = await axios.get(USER_DETAILS_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data;
  } catch (err) {
    throw err.response.data;
  }
};

export const markAttendance = async (hash) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.post(
      ATTENDANCE_URL,
      { hash },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return data;
  } catch (err) {
    throw err.response.data;
  }
};

import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./appointmentSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const AppointmentSuccess = () => {
    localStorage.clear();
    sessionStorage.clear()
  return (
    <div className="appointmentSuccess">
      <CheckCircleIcon />

      <Typography>Employee Will reach to your Door...</Typography>
      <Link to="/appointments">View Booked Services</Link>
    </div>
  );
};

export default AppointmentSuccess;

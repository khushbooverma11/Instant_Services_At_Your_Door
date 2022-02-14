import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminEmployee } from "../../actions/employeeAction";
import { getAllAppointments } from "../../actions/appointmentAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'


const Dashboard = ({history}) => {
  const dispatch = useDispatch();

  const { error, employees } = useSelector((state) => state.employees);
  const { appointments } = useSelector((state) => state.allAppointments);
  const { users } = useSelector((state) => state.allUsers);
  console.log(employees);
  
 //console.log(Object.keys(employees).length);
  let notAvailable = 0;
console.log(typeof employees);
  employees &&
    employees.forEach((worker) => {
      if (worker.availability === false) {
        notAvailable += 1;
      }
    });
    
  useEffect(() => {
    dispatch(getAdminEmployee());
    dispatch(getAllAppointments());
    dispatch(getAllUsers());
  }, [dispatch]);
  
  let totalAmount = 0;
  appointments && appointments.forEach((item)=>{
    totalAmount+=item.totalPrice;
  });
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0,totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Not Available", "Available"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [notAvailable,employees && employees.length],
      },
    ],
  };

  

  return (
    <div className="dashboard">
      
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/employees">
              <p>Employee</p>
             <p>{employees && employees.length}</p>
            </Link>
            <Link to="/admin/appointments">
              <p>Bookings</p>
              <p>{appointments && appointments.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>
        <div className="lineChart">
          <Line data={lineState} />
        </div>
        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
       </div>
    </div>
  );
};

export default Dashboard;

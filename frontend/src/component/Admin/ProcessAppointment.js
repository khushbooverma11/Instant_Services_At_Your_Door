import React, { Fragment , useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar.js";
import "./processAppointment.css"
import {
    getAppointmentDetails,
    clearErrors,
    UpdateAppointment,
  } from "../../actions/appointmentAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { UPDATE_APPOINTMENT_RESET } from "../../constants/appointmentConstants";


const ProcessAppointment = ({ history,match }) => {
    const {appointment, error, loading } = useSelector((state) => state.appointmentDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.appointment);
    console.log(appointment);
    const updateAppointmentSubmitHandler = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("status", status);
  
      dispatch(UpdateAppointment(match.params.id, myForm));
    };
  
    const dispatch = useDispatch();
    const alert = useAlert();
  
    const [status, setStatus] = useState("");
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
      if (updateError) {
        alert.error(updateError);
        dispatch(clearErrors());
      }
      if (isUpdated) {
        alert.success("Appointment Updated Successfully");
        dispatch({ type: UPDATE_APPOINTMENT_RESET });
      }
  
      dispatch(getAppointmentDetails(match.params.id));
    }, [dispatch, alert, error, match.params.id, isUpdated, updateError]);
  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <Sidebar />
        <div className="newEmployeeContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmAppointmentPage"
              style={{
                display: appointment.appointStatus === "Completed" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmappointingArea">
                  <Typography>Shipping Info</Typography>
                  <div className="confirmappointingAreaBox">
                    <div>
                      <p>Name:</p>
                      <span>{appointment.user && appointment.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {appointment.addressInfo && appointment.addressInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {appointment.addressInfo &&
                          `${appointment.addressInfo.address}, ${appointment.addressInfo.city}, ${appointment.addressInfo.state}, ${appointment.addressInfo.pinCode}, ${appointment.addressInfo.country}`}
                      </span>
                    </div>
                  </div>

                  <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          appointment.paymentInfo &&
                          appointment.paymentInfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {appointment.paymentInfo &&
                        appointment.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div>
                      <p>Amount:</p>
                      <span>{appointment.totalPrice && appointment.totalPrice}</span>
                    </div>
                  </div>

                  <Typography>Appointment Status</Typography>
                  <div className="appointmentDetailsContainerBox">
                    <div>
                      <p
                        className={
                          appointment.appointStatus && appointment.appointStatus === "Completed"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {appointment.appointStatus && appointment.appointStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmBookWorkers">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmBookWorkersContainer">
                    {appointment.appointedEmployees &&
                      appointment.appointedEmployees.map((worker) => (
                        <div key={worker.employee}>
                          <img src={worker.image} alt="Employee" />
                          <Link to={`/employee/${worker.employee}`}>
                            {worker.name}
                          </Link>{" "}
                          <span>
                            <b>₹{worker.charge}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  display: appointment.appointStatus=== "Completed" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateAppointmentSubmitHandler}
                >
                  <h1>Process Appointment</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {appointment.appointStatus === "Processing" && (
                        <option value="Arrived">Arrived</option>
                      )}

                      {appointment.appointStatus === "Arrived" && (
                        <option value="Completed">Completed</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessAppointment;

import React, { Fragment, useEffect } from "react";
import "./appointmentDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getAppointmentDetails, clearErrors } from "../../actions/appointmentAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const AppointmentDetails = ({ match }) => {
  const { appointment, error, loading } = useSelector((state) => state.appointmentDetails);
  console.log(appointment);
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getAppointmentDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Booking Details" />
          <div className="appointmentDetailsPage">
            <div className="appointmentDetailsContainer">
              <Typography component="h1">
                Booking #{appointment && appointment._id}
              </Typography>
              <Typography>Booking Info</Typography>
              <div className="appointmentDetailsContainerBox">
                <div>
                  <p>Name:</p><span>{appointment.user && appointment.user.name}</span>
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
              <div className="appointmentDetailsContainerBox">
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

              <Typography> Status</Typography>
              <div className="appointmentDetailsContainerBox">
                <div>
                  <p
                    className={
                      appointment.appointStatus && appointment.appointtStatus === "Completed"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {appointment.appointStatus && appointment.appointStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="appointmentDetailsBookWorkers">
              <Typography>Booked Workers:</Typography>
              <div className="appointmentDetailsBookWorkersContainer">
                {appointment.appointedEmployees &&
                  appointment.appointedEmployees.map((worker) => (
                    <div key={worker.employee}>
                    <img src={worker.image} alt="employee" />
                    <Link to={`/employee/${worker.employee}`}>
                      {worker.bio}
                    </Link>{" "}
                      <span>
                        Charge:
                        <b>₹{worker.charge}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AppointmentDetails;

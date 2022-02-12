import React, { Fragment } from "react";
import CheckoutSteps from "../Book/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmAppointment.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const ConfirmOrder = ({ history }) => {
  const { appointingInfo, bookWorkers } = useSelector((state) => state.book);
  const { user } = useSelector((state) => state.user);

  console.log(appointingInfo);  
 const subtotal = bookWorkers.reduce(
    (acc, worker) => acc + worker.charge,
    0
  );
 
  const totalPrice = subtotal;

  /*const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
  */

  const address = `${appointingInfo.address}, ${appointingInfo.city}, ${appointingInfo.state}, ${appointingInfo.pinCode}, ${appointingInfo.country}`;
  const proceedToPayment = () => {
    const data = {
      subtotal,
      totalPrice,
    };

    sessionStorage.setItem("appointmentInfo", JSON.stringify(data));

    history.push("/process/payment");
  };

  return (
    <Fragment>
      <MetaData title="Confirm Appointment" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmAppointmentPage">
        <div>
          <div className="confirmappointingArea">
            <Typography>Appointing Info</Typography>
            <div className="confirmappointingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{appointingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmBookWorkers">
            <Typography>Your Cart Service:</Typography>
            <div className="confirmBookWorkersContainer">
              {bookWorkers &&
                bookWorkers.map((worker) => (
                  <div key={worker.employee}>
                    <img src={worker.image} alt="employee" />
                    <Link to={`/employee/${worker.employee}`}>
                      {worker.bio}
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
        <div>
          <div className="appointmentSummary">
            <Typography>Appointment Charges</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
            </div>

            <div className="appointmentSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;

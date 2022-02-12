import React, { Fragment } from "react";
import "./Book.css";
import BookWorkerCard from "./BookWorkerCard";
import { useSelector, useDispatch } from "react-redux";
import { addWorkersToBook,removeWorkersFromBook } from "../../actions/bookAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";

const Book = ({history}) => {
  const dispatch = useDispatch();
  const { bookWorkers } = useSelector((state) => state.book);

  
 const deleteBookWorkers = (id) => {
    dispatch(removeWorkersFromBook(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=appointing");
  };
 console.log(bookWorkers);
  return (
    <Fragment>{bookWorkers.length === 0 ? (
        <div className="emptyBook">
          <RemoveShoppingCartIcon />

          <Typography>No  Appointment Yet</Typography>
          <Link to="/Employees">View Employees</Link>
        </div>
      ) : (
        <Fragment>
      
          <div className="bookPage">
            <div className="bookHeader">
              <p>Employee</p>
              <p>Avalability</p>
              <p>Subtotal</p>
            </div>

            {bookWorkers &&
              bookWorkers.map((worker) => (
                <div className="bookContainer" key={worker.employee}>
                  <BookWorkerCard worker={worker} deleteBookWorkers={deleteBookWorkers}/>
                  <div className="bookInput">
                    <h1>{worker.availability}</h1>
                    <input type="text" value={worker.charge} readOnly />
                    
                  </div>
                  <p className="bookSubtotal">{`₹${
                    worker.charge 
                  }`}</p>
                </div>
              ))}

            <div className="bookGrossProfit">
              <div></div>
              <div className="bookGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹${bookWorkers.reduce(
                  (acc, worker) => acc +  worker.charge,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Confirm Booking</button>
              </div>
            </div>
          </div>
          </Fragment>
  )}
        
    </Fragment>
  );
};

export default Book;

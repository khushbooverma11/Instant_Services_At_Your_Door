import React from "react";
import "./BookWorkerCard.css";
import { Link } from "react-router-dom";

const BookWorkerCard = ({ worker, deleteBookWorkers }) => {
  return (
    <div className="BookWorkerCard">
      <img src={worker.image} alt="ssa" />
      <div>
        <Link to={`/Employee/${worker.employee}`}>{worker.bio}</Link>
        <span>{`Charge: ₹${worker.charge}`}</span>
        <p onClick={() => deleteBookWorkers(worker.employee)}>Remove</p>
      </div>
    </div>
  );
};

export default BookWorkerCard;
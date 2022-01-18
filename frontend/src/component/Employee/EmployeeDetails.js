import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./EmployeeDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getEmployeeDetails
  
} from "../../actions/employeeAction";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import reactStars from "react-rating-stars-component";
import MetaData from "../layout/MetaData";




const EmployeeDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { employee, loading, error } = useSelector(
    (state) => state.employeeDetails
  );
   console.log(employee);
 /* const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );*/

  const options = {
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    size: window.innerWidth<600?20:25,
    value: employee.ratings,
    isHalf:true,
  };


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

      dispatch(getEmployeeDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={employee.name}/>
          <div className="EmployeeDetails">
            <div>
    
                {employee.images &&
                  employee.images.map((item, i) => (
                    <img
                      className="Image"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
            
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{employee.name}</h2>
                <p>Employee # {employee._id}</p>
              </div>
              <div className="detailsBlock-2">
                <reactStars {...options} />
                <span>
                  ({employee.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${employee.charge}`}</h1>
                <div className="detailsBlock-3-1">
                  
                  <button>
                    Book Appointment
                  </button>
                </div>

                <p>
                  Status:
                  <b className={employee.availability < 1 ? "redColor" : "greenColor"}>
                    {employee.availability < 1 ? "NotAvailable" : "Available"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{employee.bio}</p>
              </div>

              <button className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>
                {employee.reviews && employee.reviews[0] ? (
            <div className="reviews">
              {employee.reviews &&
                employee.reviews.map((review) => 
                  <ReviewCard  review={review} />
                )}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default EmployeeDetails;

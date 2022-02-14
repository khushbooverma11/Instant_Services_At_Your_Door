import React, { Fragment, useEffect, useState } from "react";

import "./EmployeeDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getEmployeeDetails,
  newReview
  
} from "../../actions/employeeAction";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addWorkersToBook} from "../../actions/bookAction";
import {
Dialog,
DialogActions,
DialogContent,
DialogTitle,
Button,
}from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/employeeConstants";



const EmployeeDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { employee, loading, error } = useSelector(
    (state) => state.employeeDetails
  );
   console.log(employee);
 const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
    size: "large",
    value: employee.ratings,
    readOnly:true,
    precision:0.5,
  };

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("employeeId", match.params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };
  const addToBookHandler = () => {
    dispatch(addWorkersToBook(match.params.id));
    alert.success("Added to Wishlist");
  };


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    if(success){
      alert.success("Review Submitted Successfully");
      dispatch({type:NEW_REVIEW_RESET});
    
    }

      dispatch(getEmployeeDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert,reviewError,success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={employee.bio}/>
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
                <h2>{employee.bio}</h2>
                <p>Employee # {employee._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({employee.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${employee.charge}`}</h1>
                <div className="detailsBlock-3-1">
                  
                  <button disabled={employee.availability?false:true}
                  onClick={addToBookHandler}>
                    Book Now
                  </button>
                </div>

                <p>
                  Status:
                  <b className={employee.availability ?"greenColor":"redColor"}>
                    {employee.availability?"Available":"NotAvailable"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Provided by : <p>{employee.name}</p>
                Address: <p>{employee.addressline1},{employee.city}</p>
                <div>Verified Service, No need to visited , just book them . They will arrive at your home to provide service.<button disabled={employee.availability?false:true}
                  onClick={addToBookHandler}>
                    Book Now!
                  </button></div>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
                </Button>
                <Button onClick={reviewSubmitHandler} color="primary">
                  Submit
                  </Button>
            
            </DialogActions>
          </Dialog>




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

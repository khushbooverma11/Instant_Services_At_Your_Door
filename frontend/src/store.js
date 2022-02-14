import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { employeeDetailReducer, employeesReducer,employeeReducer, newEmployeeReducer, newReviewReducer, employeeReviewsReducer, reviewsReducer } from "./reducers/employeeReducer";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducer";
import { bookReducer } from "./reducers/bookReducer";
import { allAppointmentsReducer, appointmentDetailsReducer, appointmentReducer, myAppointmentsReducer, newAppointmentReducer } from "./reducers/appointmentReducer";


const reducer = combineReducers({
    
    employees: employeesReducer,
    employeeDetails: employeeDetailReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    book:bookReducer,
    newAppointment:newAppointmentReducer,
    myAppointments:myAppointmentsReducer,
    appointmentDetails:appointmentDetailsReducer,
    newReview:newReviewReducer,
    newEmployee:newEmployeeReducer,
    employee:employeeReducer,
    allAppointments:allAppointmentsReducer,
    appointment:appointmentReducer,
    allUsers:allUsersReducer,
    userDetails: userDetailsReducer,
    employeeReviews: employeeReviewsReducer,
    review: reviewsReducer,
  });


  let initialState = {
    book: {
      bookWorkers: localStorage.getItem("bookWorkers")
        ? JSON.parse(localStorage.getItem("bookWorkers"))
        : [],
      appointingInfo: localStorage.getItem("appointingInfo")
      ? JSON.parse(localStorage.getItem('appointingInfo'))
      : {},
      },
  };
  
  const middleware = [thunk];
  


  const store = createStore(
    reducer,
    initialState,  
    composeWithDevTools(applyMiddleware(...middleware))
 
    );


export default store;
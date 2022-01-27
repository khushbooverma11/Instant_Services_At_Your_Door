import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { employeeDetailReducer, employeesReducer,employeeReducer, newEmployeeReducer, newReviewReducer } from "./reducers/employeeReducer";
import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer";
import { bookReducer } from "./reducers/bookReducer";
import { appointmentDetailsReducer, myAppointmentsReducer, newAppointmentReducer } from "./reducers/appointmentReducer";


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
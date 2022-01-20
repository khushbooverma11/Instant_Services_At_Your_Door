import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { employeeDetailReducer, employeeReducer } from "./reducers/employeeReducer";
import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer";
import { bookReducer } from "./reducers/bookReducer";


const reducer = combineReducers({
    
    employees: employeeReducer,
    employeeDetails: employeeDetailReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    book:bookReducer,
  });


  let initialState = {
    book: {
      bookWorkers: localStorage.getItem("bookWorkers")
        ? JSON.parse(localStorage.getItem("bookWorkers"))
        : [],
      },
  };
  
  const middleware = [thunk];
  


  const store = createStore(
    reducer,
    initialState,  
    composeWithDevTools(applyMiddleware(...middleware))
 
    );


export default store;
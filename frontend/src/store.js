import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { employeeDetailReducer, employeeReducer } from "./reducers/employeeReducer";
import { userReducer } from "./reducers/userReducer";

const reducer = combineReducers({
    
    employees: employeeReducer,
    employeeDetails: employeeDetailReducer,
    user:userReducer
  });


  let initialState = {
   
  };
  
  const middleware = [thunk];
  


  const store = createStore(
    reducer,
    initialState,  
    composeWithDevTools(applyMiddleware(...middleware))
 
    );


export default store;
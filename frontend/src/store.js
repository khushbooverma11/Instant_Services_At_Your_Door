import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { employeeDetailReducer, employeeReducer } from "./reducers/employeeReducer";

const reducer = combineReducers({
    
    employees: employeeReducer,
    employeeDetails: employeeDetailReducer,
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
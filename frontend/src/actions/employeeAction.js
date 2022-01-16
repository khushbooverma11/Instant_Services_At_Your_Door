import axios from "axios";
import {
    ALL_EMPLOYEE_FAIL,
    ALL_EMPLOYEE_REQUEST,
    ALL_EMPLOYEE_SUCCESS,
    EMPLOYEE_DETAILS_REQUEST,
    EMPLOYEE_DETAILS_FAIL,
    EMPLOYEE_DETAILS_SUCCESS,
    CLEAR_ERRORS,
} from "../constants/employeeConstants";
// Get All Products
export const getEmployee=()=> async (dispatch) => {
    try {
      dispatch({ type: ALL_EMPLOYEE_REQUEST });
      const {data}=await axios.get("/api/v1/Employee");
     // console.log(data);

      

      dispatch({
        type: ALL_EMPLOYEE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_EMPLOYEE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const getEmployeeDetails =(id)=> async (dispatch) => {
    try {
      dispatch({ type: EMPLOYEE_DETAILS_REQUEST });
      const {data}=await axios.get(`/api/v1/Employee/${id}`);
     
      dispatch({
        type: EMPLOYEE_DETAILS_SUCCESS,
        payload: data.employee,
      });
    } catch (error) {
      dispatch({
        type: EMPLOYEE_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };



// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
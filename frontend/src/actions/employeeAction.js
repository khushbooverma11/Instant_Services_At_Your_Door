import axios from "axios";
import {
    ALL_EMPLOYEE_FAIL,
    ALL_EMPLOYEE_REQUEST,
    ALL_EMPLOYEE_SUCCESS,
    ADMIN_EMPLOYEE_REQUEST,
    ADMIN_EMPLOYEE_SUCCESS,
    ADMIN_EMPLOYEE_FAIL,
    NEW_EMPLOYEE_REQUEST,
  NEW_EMPLOYEE_SUCCESS,
  NEW_EMPLOYEE_FAIL,
  UPDATE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_FAIL,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAIL,
    EMPLOYEE_DETAILS_REQUEST,
    EMPLOYEE_DETAILS_FAIL,
    EMPLOYEE_DETAILS_SUCCESS,
    NEW_REVIEW_REQUEST ,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    CLEAR_ERRORS,
} from "../constants/employeeConstants";
// Get All Employees
export const getEmployee=(keyword="",currentPage = 1,charge =[0,25000],category,ratings="0",City)=> 
async (dispatch) => {
    try {
      dispatch({ type: ALL_EMPLOYEE_REQUEST });
      
      
      let link = `/api/v1/Employees?keyword=${keyword}&page=${currentPage}&charge[gte]=${charge[0]}&charge[lte]=${charge[1]}&ratings[gte]=${ratings}`;
      if(City){
        link = `/api/v1/Employees?keyword=${keyword}&city=${City}&page=${currentPage}&charge[gte]=${charge[0]}&charge[lte]=${charge[1]}&ratings[gte]=${ratings}`;
      }
      if(category)
      {
        link=`/api/v1/Employees?keyword=${keyword}&city=Delhi&page=${currentPage}&charge[gte]=${charge[0]}&charge[lte]=${charge[1]}&category=${category}&ratings[gte]=${ratings}`
      }
      const {data}=await axios.get(link);
      //console.log(data);
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
// Update Employee
export const updateEmployee = (id, employeeData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_EMPLOYEE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/employee/${id}`,
      employeeData,
      config
    );

    dispatch({
      type: UPDATE_EMPLOYEE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_EMPLOYEE_FAIL,
      payload: error.response.data.message,
    });
  }
};
  // Delete Employee
export const deleteEmployee = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EMPLOYEE_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/employee/${id}`);

    dispatch({
      type: DELETE_EMPLOYEE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_EMPLOYEE_FAIL,
      payload: error.response.data.message,
    });
  }
};


  // Get All Employees For Admin
export const getAdminEmployee = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_EMPLOYEE_REQUEST });

    const { data } = await axios.get("/api/v1/admin/employees");

    dispatch({
      type: ADMIN_EMPLOYEE_SUCCESS,
      payload: data.employees,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_EMPLOYEE_FAIL,
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

  // Create Employee
export const createEmployee = (employeeData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_EMPLOYEE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(`/api/v1/admin/employee/new`,employeeData,config);

    dispatch({
      type: NEW_EMPLOYEE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_EMPLOYEE_FAIL,
      payload: error.response.data.message,
    });
  }
};
//New Review
  export const newReview =(reviewData)=> async (dispatch) => {
    try {
      dispatch({ type:  NEW_REVIEW_REQUEST });
      const config={
         headers:{"Content-Type":"application/json"},
      };
      const {data}=await axios.put(`/api/v1/review`,reviewData,config);
     
      dispatch({
        type:NEW_REVIEW_SUCCESS ,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: NEW_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };


//Get ALL Reviews --Admin
export const getAllReviews =(id)=> async (dispatch) => {
  try {
    dispatch({ type:  ALL_REVIEW_REQUEST });
    
    const {data}=await axios.get(`/api/v1/reviews?id=${id}`);
   
    dispatch({
      type:ALL_REVIEW_SUCCESS ,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const deleteReviews =(reviewId,employeeId)=> async (dispatch) => {
  try {
    dispatch({ type:  ALL_REVIEW_REQUEST });
   
    const {data}=await axios.delete(`/api/v1/reviews?id=${reviewId}&employeeId=${employeeId}`);
   
    dispatch({
      type:DELETE_REVIEW_SUCCESS ,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
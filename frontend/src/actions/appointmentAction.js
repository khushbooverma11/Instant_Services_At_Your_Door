import {
    CREATE_APPOINTMENT_REQUEST,
    CREATE_APPOINTMENT_SUCCESS,
    CREATE_APPOINTMENT_FAIL,
    MY_APPOINTMENTS_REQUEST,
    MY_APPOINTMENTS_SUCCESS,
    MY_APPOINTMENTS_FAIL,
    APPOINTMENT_DETAILS_REQUEST,
    APPOINTMENT_DETAILS_SUCCESS,
    APPOINTMENT_DETAILS_FAIL,
    CLEAR_ERRORS,
} from "../constants/appointmentConstants";

import axios from "axios";

// Create Appointment
export const createAppointment = (appointment) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_APPOINTMENT_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/v1/appointment/new", appointment, config);
  
      dispatch({ type: CREATE_APPOINTMENT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_APPOINTMENT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  //My appontements
  export const myAppointments = () => async (dispatch) => {
    try {
      dispatch({ type: MY_APPOINTMENTS_REQUEST });
  
      /*const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };*/
      const { data } = await axios.get("/api/v1/appointments/me");
  
      dispatch({ type: MY_APPOINTMENTS_SUCCESS, payload: data.appointment });
    } catch (error) {
      dispatch({
        type: MY_APPOINTMENTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };


// Get appontements Details
export const getAppointmentDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: APPOINTMENT_DETAILS_REQUEST });

   
    const { data } = await axios.get(`/api/v1/appointment/${id}`);

    dispatch({ type: APPOINTMENT_DETAILS_SUCCESS, payload: data.appointment });
  } catch (error) {
    dispatch({
      type: APPOINTMENT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};



  // Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
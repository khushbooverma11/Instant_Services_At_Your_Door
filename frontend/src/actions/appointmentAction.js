import {
    CREATE_APPOINTMENT_REQUEST,
    CREATE_APPOINTMENT_SUCCESS,
    CREATE_APPOINTMENT_FAIL,
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

  // Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
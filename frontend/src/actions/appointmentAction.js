import {
    CREATE_APPOINTMENT_REQUEST,
    CREATE_APPOINTMENT_SUCCESS,
    CREATE_APPOINTMENT_FAIL,
    MY_APPOINTMENTS_REQUEST,
    MY_APPOINTMENTS_SUCCESS,
    MY_APPOINTMENTS_FAIL,
    ALL_APPOINTMENTS_REQUEST,
    ALL_APPOINTMENTS_SUCCESS,
    ALL_APPOINTMENTS_FAIL,
    UPDATE_APPOINTMENT_REQUEST,
    UPDATE_APPOINTMENT_SUCCESS,
    UPDATE_APPOINTMENT_FAIL,
    DELETE_APPOINTMENT_REQUEST,
    DELETE_APPOINTMENT_SUCCESS,
    DELETE_APPOINTMENT_FAIL,
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

  //Get all appontements(admin)
  export const getAllAppointments = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_APPOINTMENTS_REQUEST });
  
      /*const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };*/
      const { data } = await axios.get("/api/v1/admin/appointments");
  
      dispatch({ type: ALL_APPOINTMENTS_SUCCESS, payload: data.appointments });
    } catch (error) {
      dispatch({
        type: ALL_APPOINTMENTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  // Update Appointment
export const UpdateAppointment = (id,appointment) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_APPOINTMENT_REQUEST, });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(`/api/v1/admin/appointment/${id}`, appointment, config);

    dispatch({ type: UPDATE_APPOINTMENT_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_APPOINTMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

  // Delete Appointment
export const deleteAppointment = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_APPOINTMENT_REQUEST, });
    
    const { data } = await axios.delete(`/api/v1/admin/appointment/${id}`);

    dispatch({ type: DELETE_APPOINTMENT_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_APPOINTMENT_FAIL,
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
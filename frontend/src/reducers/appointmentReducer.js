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

export const newAppointmentReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_APPOINTMENT_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case CREATE_APPOINTMENT_SUCCESS:
        return {
          loading: false,
          appointment: action.payload,
        };
  
      case CREATE_APPOINTMENT_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };

  export const myAppointmentsReducer = (state = {appointments:[]}, action) => {
    switch (action.type) {
      case MY_APPOINTMENTS_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case MY_APPOINTMENTS_SUCCESS:
        return {
          loading: false,
          appointments: action.payload,
        };
  
      case MY_APPOINTMENTS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };



  export const appointmentDetailsReducer = (state = {appointment:{}}, action) => {
    switch (action.type) {
      case APPOINTMENT_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case APPOINTMENT_DETAILS_SUCCESS:
        return {
          loading: false,
          appointment: action.payload,
        };
  
      case APPOINTMENT_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
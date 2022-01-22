import {
    CREATE_APPOINTMENT_REQUEST,
    CREATE_APPOINTMENT_SUCCESS,
    CREATE_APPOINTMENT_FAIL,
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
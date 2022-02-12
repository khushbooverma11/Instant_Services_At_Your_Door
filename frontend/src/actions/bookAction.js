import {
    BOOK_APPOINTMENT,
    REMOVE_BOOK_WORKER,
    SAVE_APPOINTING_INFO,
    
  } from "../constants/bookConstants";
  import axios from "axios";
  // Book Appointment
export const addWorkersToBook = (id,availability) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/Employee/${id}`);
  
    dispatch({
      type: BOOK_APPOINTMENT,
      payload: {
        employee: data.employee._id,
        name: data.employee.name,
        charge: data.employee.charge,
        image: data.employee.images[0].url,
        availability: data.employee.availability,
        bio:data.employee.bio,
        //quantity,
      },
    });
  
    localStorage.setItem("bookWorkers", JSON.stringify(getState().book.bookWorkers));
  };
  // REMOVE FROM BOOKED APPOINTMENTS
export const removeWorkersFromBook = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_BOOK_WORKER,
    payload: id,
  });

  localStorage.setItem("bookWorkers", JSON.stringify(getState().book.bookWorkers));
};
// SAVE APPOINTING INFO
export const saveAppointingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_APPOINTING_INFO,
    payload: data,
  });

  localStorage.setItem("appointingInfo", JSON.stringify(data));
};
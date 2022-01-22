import {
    BOOK_APPOINTMENT,
    REMOVE_BOOK_WORKER,
    SAVE_APPOINTING_INFO,
    
  } from "../constants/bookConstants";
  export const bookReducer = (
    state = { bookWorkers: [],appointingInfo:{}},
    action
  ) => {
    switch (action.type) {
      case BOOK_APPOINTMENT:
        const worker = action.payload;
  
        const isWorkerExist = state.bookWorkers.find(
          (i) => i.employee === worker.employee
        );
  
        if (isWorkerExist) {
          return {
            ...state,
            bookWorkers: state.bookWorkers.map((i) =>
              i.employee === isWorkerExist.employee ? worker : i
            ),
          };
        } else {
          return {
            ...state,
            bookWorkers: [...state.bookWorkers, worker],
          };
        }
  
     case REMOVE_BOOK_WORKER:
        return {
          ...state,
          bookWorkers: state.bookWorkers.filter((i) => i.employee !== action.payload),
        };
  
     case SAVE_APPOINTING_INFO:
        return {
          ...state,
          appointingInfo: action.payload,
        };
  
      default:
        return state;
    }
  };
  
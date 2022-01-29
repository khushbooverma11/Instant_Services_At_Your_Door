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
  NEW_EMPLOYEE_RESET,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAIL,
  DELETE_EMPLOYEE_RESET,
  UPDATE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_FAIL,
  UPDATE_EMPLOYEE_RESET,
    EMPLOYEE_DETAILS_REQUEST,
    EMPLOYEE_DETAILS_FAIL,
    EMPLOYEE_DETAILS_SUCCESS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_FAIL,
    CLEAR_ERRORS,
} from "../constants/employeeConstants";


export const newEmployeeReducer = (state = { employee: {} }, action) => {
  switch (action.type) {
    case NEW_EMPLOYEE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_EMPLOYEE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        employee: action.payload.employee,
      };
    case NEW_EMPLOYEE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_EMPLOYEE_RESET:
      return {
        ...state,
        success: false,
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
export const employeeReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_EMPLOYEE_REQUEST:
    case UPDATE_EMPLOYEE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_EMPLOYEE_FAIL:
    case UPDATE_EMPLOYEE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_EMPLOYEE_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_EMPLOYEE_RESET:
      return {
        ...state,
        isUpdated: false,
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

export const employeesReducer=(state={employees:[]},action)=>{

    switch (action.type) {
        case ALL_EMPLOYEE_REQUEST:
       case ADMIN_EMPLOYEE_REQUEST:
          return {
            loading: true,
            employee: [],
          };
        case ALL_EMPLOYEE_SUCCESS:
          return {
            loading: false,
           employees: action.payload.employees, //will change it to employees after adition of new data
           employeesCount: action.payload.employeeCount,
           resultPerPage: action.payload.resultPerPage,
           filteredEmployeesCount: action.payload.filteredEmployeesCount,
          };
    
        case ADMIN_EMPLOYEE_SUCCESS:
          return {
            loading: false,
            employees: action.payload,
          };
        case ALL_EMPLOYEE_FAIL:
        case ADMIN_EMPLOYEE_FAIL:
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



export const employeeDetailReducer=(state={employee:{}},action)=>{

  switch (action.type) {
      case EMPLOYEE_DETAILS_REQUEST:
     
        return {
          loading: false,
          ...state,
        };
      case EMPLOYEE_DETAILS_SUCCESS:
        return {
          loading: false,
          employee: action.payload,
         
         
        };
  
    
      case EMPLOYEE_DETAILS_FAIL:
      
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



export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case NEW_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
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

export const employeeReviewsReducer=(state={reviews:[]},action)=>{

  switch (action.type) {
      case ALL_REVIEW_REQUEST:
     
        return {
          loading: false,
          ...state,
        };
      case ALL_REVIEW_SUCCESS:
        return {
          loading: false,
          reviews: action.payload,
        };

      case ALL_REVIEW_FAIL:
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

export const reviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_REVIEW_RESET:
      return {
        ...state,
        isDeleted: false,
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
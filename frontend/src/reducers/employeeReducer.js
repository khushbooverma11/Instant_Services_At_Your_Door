import {
    ALL_EMPLOYEE_FAIL,
    ALL_EMPLOYEE_REQUEST,
    ALL_EMPLOYEE_SUCCESS,
    EMPLOYEE_DETAILS_REQUEST,
    EMPLOYEE_DETAILS_FAIL,
    EMPLOYEE_DETAILS_SUCCESS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,
    CLEAR_ERRORS,
} from "../constants/employeeConstants";


export const employeeReducer=(state={employees:[]},action)=>{

    switch (action.type) {
        case ALL_EMPLOYEE_REQUEST:
       // case ADMIN_PRODUCT_REQUEST:
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
    
       /* case ADMIN_PRODUCT_SUCCESS:
          return {
            loading: false,
            products: action.payload,
          };*/
        case ALL_EMPLOYEE_FAIL:
        //case ADMIN_PRODUCT_FAIL:
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
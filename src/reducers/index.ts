import { EmployeeType } from "../types/employees";
import {
  GET_EMPLOYEES,
  SET_EMPLOYEE,
  LOGIN,
  LOGOUT,
} from "../constants/actionTypes";

type Action = { type: string; payload: Array<EmployeeType> };

type EmployeeReducer = {
  employees: Array<EmployeeType>;
  user: {};
  isLoading: boolean;
};
const initialState: EmployeeReducer = {
  employees: [],
  user: {},
  isLoading: false,
};

const reducer = (state = initialState, action: Action): EmployeeReducer => {
  switch (action.type) {
    case GET_EMPLOYEES:
      return { ...state, employees: action.payload };
    case SET_EMPLOYEE:
      return { ...state, employees: action.payload };
    case LOGIN:
      localStorage.setItem("profile", JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    case LOGOUT:
      localStorage.clear();
      return { ...state, user: null };
    default:
      return state;
  }
};

export default reducer;

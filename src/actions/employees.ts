import { EmployeeType } from "../types/employees";
import {
  GET_EMPLOYEES,
  SET_EMPLOYEE,
  LOGIN,
  LOGOUT,
} from "../constants/actionTypes";

export const getEmployees = (employees: Array<EmployeeType>) => ({
  type: GET_EMPLOYEES,
  payload: employees,
});

export const setEmployees = (employees: Array<EmployeeType>) => ({
  type: SET_EMPLOYEE,
  payload: employees,
});

export const login = (employee: EmployeeType) => ({
  type: LOGIN,
  payload: employee,
});

export const logout = () => ({
  type: LOGOUT,
});

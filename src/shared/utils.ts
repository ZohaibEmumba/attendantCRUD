import * as React from "react";
import { setEmployees } from "../actions/employees";
import { setData } from "../api";
import { EmployeeType } from "../types/employees";

export const updateEmployees = (
  employees: Array<EmployeeType>,
  updatedEmployee: EmployeeType,
  dispatch: any
) => {
  const updatedEmployees = employees.map((emp) => {
    if (emp._id === updatedEmployee._id) {
      return updatedEmployee;
    }
    return emp;
  });
  setData(updatedEmployees);
  dispatch(setEmployees(updatedEmployees));
};

export const useSliceEmployees = (employees: Array<EmployeeType>, currentPage: number) => {
  const [currentList, setCurrentList] = React.useState([]);

  React.useEffect(() => {
    setCurrentList(
      employees.slice((currentPage - 1) * 10, currentPage * 10)
    );
  }, [currentPage, employees]);

  return currentList
}
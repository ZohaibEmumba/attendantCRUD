import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { notification } from "antd";
import { setData } from "../../api";
import { setEmployees } from "../../actions/employees";
import { EmployeeType } from "../../types/employees";
import { updateEmployees } from "../../shared/utils";
import EmployeeList from "../EmployeeList/EmployeeList";

const CRUDEmployeeList: React.FC = () => {
  const dispatch = useDispatch();
  const { employees } = useSelector(
    (state: { employees: Array<EmployeeType> }) => state
  );

  const handleSubmit = (employee: Partial<EmployeeType>) => {
    if (!employee._id) {
      const updatedEmployees: Array<EmployeeType> = [
        ...employees,
        { ...employee, _id: uuidv4() },
      ];
      setData(updatedEmployees).then((status) => {
        if (status === 200) {
          notification.open({
            message: "Success!",
            description: "Employee added successfully!!!",
            onClick: () => {
              alert("Notification Clicked!");
            },
          });

          dispatch(setEmployees(updatedEmployees));
        }
      });
    } else {
      updateEmployees(employees, employee, dispatch);
      notification.open({
        message: "Success!",
        description: "Employee updated successfully!!!",
        onClick: () => {
          alert("Notification Clicked!");
        },
      });
    }
  };

  const handleDelete = (employee: EmployeeType) => {
    const updatedEmployees = employees.filter(
      (emp) => emp._id !== employee._id
    );
    setData(updatedEmployees).then((status) => {
      if (status === 200) {
        notification.open({
          message: "Success!",
          description: "Employee deleted successfully!!!",
          onClick: () => {
            alert("Notification Clicked!");
          },
        });

        dispatch(setEmployees(updatedEmployees));
      }
    });
  };

  return (
    <div className="CRUDEmployeeList">
      <EmployeeList
        heading="All Employees"
        handleDelete={handleDelete}
        handleSubmit={handleSubmit}
        employees={employees}
      />
    </div>
  );
};

export default CRUDEmployeeList;

import * as React from "react";
import { useSelector } from "react-redux";
import { EmployeeType } from "../../types/employees";
import EmployeeList from "../../components/EmployeeList/EmployeeList";

type Prop = {
  type: string;
  search: string;
};

const EmployeeContainer: React.FC<Prop> = (props) => {
  const { employees } = useSelector(
    (state: { employees: Array<EmployeeType> }) => state
  );
  let data: Array<EmployeeType> = [];
  let heading: string = "";

  switch (props.type) {
    case "all":
      data = employees;
      heading = "All Employees";
      break;
    case "available":
      data = employees.filter((employee) => employee.available);
      heading = "Available Employees";
      break;
    case "unavailable":
      data = employees.filter((employee) => !employee.available);
      heading = "Unavailable Employees";
      break;
    case "on leave":
      data = employees.filter((employee) => employee.leave);
      heading = "Employees On Leave";
      break;
    default:
      break;
  }

  if (props.search) {
    data = data.filter(
      (employee) =>
        employee.email.toLowerCase().includes(props.search.toLowerCase()) ||
        employee.firstName.toLowerCase().includes(props.search.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(props.search.toLowerCase()) ||
        employee.department
          .toLowerCase()
          .includes(props.search.toLowerCase()) ||
        employee.role.toLowerCase().includes(props.search.toLowerCase())
    );
  }

  return (
    <div className="EmployeeContainer">
      <EmployeeList heading={heading} employees={data} />
    </div>
  );
};

export default EmployeeContainer;

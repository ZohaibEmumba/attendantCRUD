import * as React from "react";
import { EmployeeType } from "../../types/employees";
import "./NewEmployeeForm.css";

type Prop = {
  handleSubmit: (employee: Partial<EmployeeType>) => void;
  employee: {};
  setShowForm: any;
};

const NewEmployeeForm = (props: Prop) => {
  const [employee, setEmployee] = React.useState<Partial<EmployeeType>>(
    props.employee
  );

  React.useEffect(() => {
    setEmployee(props.employee);
  }, [props.employee]);

  return (
    <div
      className="NewEmployeeForm add-employee-wrapper"
      onClick={() => {
        props.setShowForm(false);
      }}
    >
      <form
        className="form"
        onClick={(e) => e.stopPropagation()}
        onSubmit={() => {
          props.handleSubmit(employee);
        }}
      >
        <h1>Add Employee</h1>
        <input
          id="firstName-field"
          type="text"
          name="firstName"
          placeholder="First Name"
          value={employee.firstName || ""}
          onChange={(e) =>
            setEmployee({ ...employee, firstName: e.target.value })
          }
          required
        />
        <input
          id="lastName-field"
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={employee.lastName || ""}
          onChange={(e) =>
            setEmployee({ ...employee, lastName: e.target.value })
          }
          required
        />
        <input
          id="email-field"
          type="email"
          name="email"
          placeholder="email"
          value={employee.email || ""}
          onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          required
        />
        <input
          id="pin-field"
          type="number"
          name="pin"
          placeholder="PIN"
          value={employee.pin || ""}
          onChange={(e) =>
            setEmployee({ ...employee, pin: e.target.value.slice(0, 4) })
          }
          required
        />
        <input
          id="role-field"
          type="text"
          name="role"
          placeholder="role"
          value={employee.role || ""}
          onChange={(e) => setEmployee({ ...employee, role: e.target.value })}
          required
        />
        <select
          className="dept-dropdown"
          value={employee.department || ""}
          onChange={(e) =>
            setEmployee({ ...employee, department: e.target.value })
          }
          required
        >
          <option value="">Departments</option>
          <option value="REM">REM</option>
          <option value="MEM">MEM</option>
          <option value="EME">EME</option>
          <option value="FAM">FAM</option>
          <option value="ACT">ACT</option>
        </select>
        <button type="submit" className="add-employee-submit-btn">
          Save
        </button>
      </form>
    </div>
  );
};

export default NewEmployeeForm;

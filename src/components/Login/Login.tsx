import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../actions/employees";
import { EmployeeType } from "../../types/employees";
import "./Login.css";

const initialState = { email: "", pin: "" };

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState(initialState);
  const [error, setError] = React.useState({
    userError: false,
    pinError: false,
  });
  const { employees } = useSelector(
    (state: { employees: Array<EmployeeType> }) => state
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const oldUser = employees.find(
      (employee) => employee.email === formData.email
    );

    if (!oldUser) return setError({ ...error, userError: true });
    else {
      const isPinCorrect = oldUser.pin === formData.pin;
      if (!isPinCorrect) return setError({ userError: false, pinError: true });
    }

    dispatch(login(oldUser));
    setError({ userError: false, pinError: false });
    if (oldUser.role === "admin") {
      navigate("/");
    } else {
      navigate("/punch_card");
    }
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-form">
      <form className="login-box" onSubmit={handleSubmit}>
        <h1 className="title">Log In</h1>
        <input
          className="login-email-field"
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          required
          onChange={handleChange}
        />
        {error.userError && (
          <span className={"user-error"}>User doesn't exist!</span>
        )}
        <input
          className="login-pw-field"
          type="password"
          name="pin"
          id="pin"
          placeholder="PIN"
          onChange={handleChange}
          required
        />
        {error.pinError && <span className={"user-error"}>Invalid pin!</span>}

        <button className="submit-btn" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/employees";
import { EmployeeType } from "../../types/employees";

import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(
    (state: { user: EmployeeType }) => state
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div className="NavBar">
      <span className="logo">Attendant</span>

      <span className="welcome-user">
        Welcome {user.firstName}!
      </span>

      <div className="nav-btns">
        <button className="logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default NavBar;

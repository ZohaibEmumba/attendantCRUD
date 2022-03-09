import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "./api";
import { getEmployees, login } from "./actions/employees";
import Login from "./components/Login/Login";
import PunchCard from "./components/PunchCard/PunchCard";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import CRUDEmployeeList from "./components/CRUDEmployeeList/CRUDEmployeeList";
import "./App.css";
import { EmployeeType } from "./types/employees";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: { user: EmployeeType }) => state);

  React.useEffect(() => {
    const employees = getData();
    employees.then((res) => dispatch(getEmployees(res)));
    dispatch(login(JSON.parse(localStorage.getItem("profile"))));
  }, []);

  return (
    <div className="App">
      <div className="dim-bg"></div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              user && user.role === "admin" ? <AdminDashboard /> : <Login />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/punch_card"
            element={user && user.role !== "admin" ? <PunchCard /> : <Login />}
          />
          <Route
            path="/crud_employees"
            element={
              user && user.role === "admin" ? <CRUDEmployeeList /> : <Login />
            }
          />
          <Route path="*" element={<h1>404 PAGE NOT FOUND!!!</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

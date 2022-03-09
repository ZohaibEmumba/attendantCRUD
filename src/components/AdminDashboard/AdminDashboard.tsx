import * as React from "react";
import { CloseOutlined } from "@ant-design/icons";
import EmployeeContainer from "../../containers/EmployeeContainer/EmployeeContainer";
import NavBar from "../NavBar/NavBar";
import "./AdminDashboard.css";

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState("all");
  const [search, setSearch] = React.useState("");
  const employeeTypes = ["all", "available", "unavailable", "on leave"];

  return (
    <div className="AdminDashboard">
      <NavBar />
      <div className="tabs-header">
        <div className="tab-btns">
          {employeeTypes.map((type, index) => (
            <span
              key={index}
              onClick={() => setActiveTab(type)}
              className={`tab-head ${type === activeTab ? "active" : null}`}
            >
              {type} Employees
            </span>
          ))}
        </div>

        <div className="search-wrapper">
          <input
            type="text"
            name="search-field"
            id="search-field"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <span className="clear-search" onClick={() => setSearch("")}>
              <CloseOutlined />
            </span>
          )}
        </div>
      </div>
      <div className="tabs">
        <EmployeeContainer type={activeTab} search={search} />
      </div>
    </div>
  );
};

export default AdminDashboard;

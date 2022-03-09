import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../actions/employees";
import { updateEmployees } from "../../shared/utils";
import { EmployeeType } from "../../types/employees";
import NavBar from "../NavBar/NavBar";
import "./PunchCard.css";

const PunchCard: React.FC = () => {
  const dispatch = useDispatch();
  const { employees, user } = useSelector(
    (state: { employees: Array<EmployeeType>; user: EmployeeType }) => state
  );
  const [punchIn, setPunchIn] = React.useState(false);
  const [appliedLeave, setAppliedLeave] = React.useState(false);

  React.useEffect(() => {
    setPunchIn(user.available);
    setAppliedLeave(user.leave);
  }, [user]);

  const handlePunch = () => {
    user.available = !punchIn;
    setPunchIn(!punchIn);
    dispatch(login(user));
    updateEmployees(employees, user, dispatch);
  };

  const handleLeave = () => {
    user.available = false;
    user.leave = true;
    setPunchIn(false);
    setAppliedLeave(true);
    dispatch(login(user));
    updateEmployees(employees, user, dispatch);
  };

  return (
    <div className="PunchCard-wrapper">
      <NavBar />
      <div className="punch-card">
        <h1 className="title">Punch Card</h1>
        <button
          className="in-out-btn button"
          onClick={handlePunch}
          disabled={appliedLeave}
        >
          Punch {punchIn ? "Out" : "In"}
        </button>
        <button
          className="leave-btn button"
          onClick={handleLeave}
          disabled={appliedLeave}
        >
          Apply Leave
        </button>
      </div>
    </div>
  );
};

export default PunchCard;

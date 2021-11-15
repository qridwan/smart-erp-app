import React, { useState, useEffect } from "react";
import { BoldText, Button, TopBar } from "../../../styles/styles";
// import { ReactComponent as SearchIcon } from "../../../Assets/Icons/search.svg";
import AddEmployee from "./AddEmployee";
import { db } from "../../../firebase";
import { onValue, ref } from "@firebase/database";
import { connect } from "react-redux";
import { setShow } from "../../../Redux/actions/renderActions";
import EmployeesTable from "./EmployeesTable";

const Employees = ({ show, setShow }) => {
  const [details, setDetails] = useState({});
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    setShow("employeesTable");
  }, []);

  useEffect(() => {
    const employeeRef = ref(db, "inventory/employees");
    onValue(employeeRef, (snapshot) => {
      let employees = [];
      Object.keys(snapshot.val()).forEach((key) => {
        employees.push(snapshot.val()[key]);
      });
      // console.log(snapshot.val());
      // console.log(employees);
      setEmployees(employees);
    });
  }, [show]);

  return (
    <>
      {show === "employeesTable" && (
        <TopBar className="">
          <BoldText>Employees</BoldText>
          <div className="text-center">
            <Button onClick={() => setShow("add_employee")}>
              Add Employees
              {/* {show === "employeesTable" ? "Add Employees" : "View Employees"} */}
            </Button>
          </div>
        </TopBar>
      )}
      {show === "employeesTable" && (
        <div>
          <EmployeesTable setShow={setShow} setDetails={setDetails} />
        </div>
      )}
      {(show === "add_employee" || show === "view" || show === "edit") && (
        <AddEmployee
          setShow={setShow}
          details={details}
          setDetails={setDetails}
        />
      )}
    </>
  );
};
const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  setShow: setShow,
};
export default connect(mapStateToProps, mapDispatchToProps)(Employees);

// const RecentActivityContainer = styled.div`
//   border: 3px solid rgba(20, 55, 126, 0.1);
//   box-sizing: border-box;
//   border-radius: 19px;
//   margin-right: 20px;
//   @media only screen and (max-width: 1000px) {
//     margin: 0;
//     margin-top: 20px;
//   }
// `;
// const RecentEmployee = styled.div`
//   padding: 15px 20px;
//   display: flex;
// `;
// const Content = styled.div``;
// const HistoryText = styled.p`
//   font-weight: 500;
//   font-size: 18px;
//   line-height: 22px;
//   color: rgba(45, 56, 80, 0.91);
//   padding: 0;
//   margin: 10px 0 10px 0;
//   @media only screen and (max-width: 1000px) {
//     font-size: 14px;
//     line-height: 18px;
//     padding: 0;
//     margin: 2px 0 0 0;
//   }
// `;
// const TimeCreated = styled.span`
//   font-weight: 500;
//   font-size: 16px;
//   line-height: 20px;
//   color: rgba(45, 56, 80, 0.43);
//   padding-top: 10px;
//   margin: 0;
//   @media only screen and (max-width: 1000px) {
//     font-size: 12px;
//     line-height: 18px;
//     padding-top: 4px;
//   }
// `;

// const HiddenButtons = styled.div`
//   margin: 0;
//   @media only screen and (max-width: 1000px) {
//     order: 2;
//   }
// `;

// const EmployeeSearchContainer = styled(SearchContainer)`
//   max-width: 300px;
//   margin: 0;
//   @media only screen and (max-width: 1000px) {
//     max-width: 100%;
//     margin: 10px 10px 0 0;
//     order: 1;
//   }
// `;

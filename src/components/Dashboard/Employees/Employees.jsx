/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { BoldText, Button, TopBar } from "../../../styles/styles";
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
    const employeeRef = ref(db, "inventory/employees");
    onValue(employeeRef, (snapshot) => {
      let employees = [];
      const data = snapshot.val()
      Object.keys(data).forEach((key) => {
        data[key] !== 0 && employees.push(data[key]);
      });
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

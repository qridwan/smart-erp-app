
import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  AddItemContainer,
  InputDiv,
  Label,
  Select,
  SubmitButton,
} from "../../../styles/styles";
import TopbarAtom from "../../../atoms/TopbarAtom";
import InputAtom from "../../../atoms/InputAtom";
import RoleItem from "./RoleItem";
import { httpsCallable } from "@firebase/functions";
import { fbFunctions } from "../../../firebase";
import { LinearProgress } from "@material-ui/core";

const AddEmployee = ({ setShow, details, setDetails }) => {
  const topbarRef = useRef(null);
  const [showProgress, setShowProgress] = useState(``);
  const SubmitButtonRef = useRef(null);
  const edit = Boolean(details.info === "edit");
  useEffect(() => {
    return () => setDetails(``);
  }, []);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm();
  const status = watch(`status`);
  const isView = details.info === "view" ? true : false;
  const onSubmit = (data) => {
    setShowProgress(`start`);
    // createUser(data.email, data.password);
    const employeeId =
      data.displayName?.slice(0, 3).toUpperCase() +
      "-" +
      data?.phoneNumber.slice(-3);
    data["id"] = employeeId;
    edit ? handleUser(data, "updateUser") : handleUser(data, "createUser");
    addRole(data.role, data.email);
    // delete data.password;

    // SetEmployee(data, employeeId);
  };

  // Calling Cloud Function
  const handleUser = (data, todo) => {
    const user = httpsCallable(fbFunctions, todo);
    user(data)
      .then((result) => {
        setShowProgress(`stop`);
        setShow("employeesTable");
        reset();
      })
      .catch((error) => console.log(error));
  };

  const addRole = (role, email) => {
    let roleId;
    role === "role-1"
      ? (roleId = `addRole1`)
      : role === "role-2"
      ? (roleId = `addRole2`)
      : (roleId = `addRole3`);
    const catchRole = httpsCallable(fbFunctions, roleId);
    catchRole({ email: email }).then((result) => {
      console.log("🚀 ~Operation Successful", { result });
    });
  };

  return (
    <div>
      
      <TopbarAtom
        topRef={topbarRef}
        buttonRef={SubmitButtonRef}
        buttonTitle={edit ? "Update " : isView ? "Summery" : "Add Employee"}
        title={
          edit ? "Edit Employee" : isView ? "View Employee" : "Add new employee"
        }
        goBack="employeesTable"
      />
      {showProgress === `start` ? <LinearProgress /> :
      <AddItemContainer ref={topbarRef} className="px-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row className="w-100 p-0 m-0">
            <Col md={5} sm={12}>
              <InputAtom
                readOnly={isView}
                register={register}
                errors={errors}
                label="Full Name"
                required={edit || isView ? false : true}
                id="displayName"
                placeholder=""
                defaultValue={edit || isView ? details.displayName : ""}
                md={12}
              />
              <InputAtom
                readOnly={isView}
                register={register}
                errors={errors}
                label="Email"
                required={edit ? false : true}
                id="email"
                placeholder=""
                defaultValue={edit || isView ? details.email : ""}
                md={12}
              />
              <InputAtom
                readOnly={isView}
                register={register}
                errors={errors}
                label="Contact Number"
                required={edit ? false : true}
                id="phoneNumber"
                placeholder=""
                defaultValue={edit || isView ? details.phoneNumber : ""}
                md={12}
              />
              <InputAtom
                readOnly={isView}
                register={register}
                errors={errors}
                label="Password"
                type="password"
                required={edit ? false : true}
                id="password"
                placeholder=""
                defaultValue={edit || isView ? details.password : ""}
                md={12}
              />
              {isView && (
                <Row className="w-100">
                  <InputAtom
                    readOnly={isView}
                    register={register}
                    errors={errors}
                    label="Role"
                    required={isView}
                    id="role"
                    placeholder=""
                    defaultValue={details.role}
                    md={6}
                  />
                  <InputAtom
                    readOnly={isView}
                    register={register}
                    errors={errors}
                    label="Status"
                    required={isView}
                    id="status"
                    placeholder=""
                    defaultValue={details.status}
                    md={6}
                  />
                </Row>
              )}
              {!isView && (
                <Row>
                  <Col md={6} xs={12}>
                    <InputDiv>
                      <Label>Role</Label>
                      <Select
                        defaultValue={edit || isView ? details.role : null}
                        {...register("role")}
                      >
                        <option value=""> </option>
                        <option value="role-1">Role-1</option>
                        <option value="role-2">Role-2</option>
                        <option value="role-3">Role-3</option>
                      </Select>
                    </InputDiv>
                  </Col>
                  <Col md={6} xs={12}>
                    <InputDiv>
                      <Label>Status</Label>
                      <Select
                        defaultValue={edit || isView ? details.status : null}
                        className={
                          status === "inactive" ? "text-danger" : "text-success"
                        }
                        {...register("status")}
                      >
                        <option value=""> </option>
                        <option value="active" className="text-dark">
                          Active
                        </option>
                        <option value="inactive" className="text-dark">
                          Inactive
                        </option>
                      </Select>
                    </InputDiv>
                  </Col>
                </Row>
              )}
            </Col>

            <Col md={6} sm={12} className="offset-md-1">
              <RoleItem />
            </Col>
          </Row>
          <div className="text-center my-lg-0 mb-lg-3 d-none">
            <SubmitButton type="submit" value="Save" ref={SubmitButtonRef} />
          </div>
        </form>
      </AddItemContainer>}
    </div>
  );
};

export default AddEmployee;

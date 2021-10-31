import React, { useEffect, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  AddItemContainer,
  InputDiv,
  Label,
  Select,
  SubmitButton,
} from "../../../styles/styles";
// import { db } from "../../../firebase";
// import { UserContext } from "../../../context/UserProvider";
import TopbarAtom from "../../../atoms/TopbarAtom";
import InputAtom from "../../../atoms/InputAtom";
import RoleItem from "./RoleItem";

const AddEmployee = ({ setShow, details, setDetails }) => {
  console.log("🚀 ~ AddEmployee ~ details", { details });
  const topbarRef = useRef(null);
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
  const onSubmit = async (data) => {
    // const res = await auth.createUserWithEmailAndPassword(data.email, data.password);
    // delete data.password;
    // console.log(data);
    // const employeeRef = firebase.ref("inventory/employees");
    // const employeeId = data.name.slice(0, 3).toUpperCase() + "-" + data.phone.slice(-3);
    // data['id'] = employeeId;
    // employeeRef.child(`${employeeId}`).update(data);
    // setShow("employees");
    reset();
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
                id="name"
                placeholder=""
                defaultValue={edit || isView ? details.name : ""}
                md={12}
              />
              <InputAtom
                readOnly={isView}
                register={register}
                errors={errors}
                label="Contact Number"
                required={edit ? false : true}
                id="phone"
                placeholder=""
                defaultValue={edit || isView ? details.phone : ""}
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
      </AddItemContainer>
    </div>
  );
};

export default AddEmployee;

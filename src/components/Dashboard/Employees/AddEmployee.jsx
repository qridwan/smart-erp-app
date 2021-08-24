import React from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  AddItemContainer,
  ApplyFormInput,
  BoldText,
  Button,
  Error,
  InputDiv,
  Label,
  SubmitButton,
  TopBar,
} from "../../../styles/styles";


import { db as firebase, bucket, auth } from '../../../firebase';
import { UserContext } from "../../../context/UserProvider";

const AddEmployee = ({ setShow, info }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm();

  const edit = info.edit;

  const onSubmit = async (data) => {

    const res = await auth.createUserWithEmailAndPassword(data.email, data.password);
    delete data.password;
    console.log(data);
    const employeeRef = firebase.ref("inventory/employees");
    const employeeId = data.name.slice(0, 3).toUpperCase() + "-" + data.phone.slice(-3);
    data['id'] = employeeId;
    employeeRef.child(`${employeeId}`).update(data);
    setShow("employees");
    reset();
  };
  return (
    <div>
      <AddItemContainer className="px-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row className="w-100 p-0 m-0">
            <Col md={3} xs={12}>
              <InputDiv>
                <Label>Employee Name</Label>
                <ApplyFormInput
                  defaultValue={edit ? info.name : null}
                  placeholder=""
                  type="text"
                  {...register("name", { required: true })}
                />
                {errors.agency && <Error>Employee Name is required</Error>}
              </InputDiv>
            </Col>
            <Col md={3} xs={12}>
              <InputDiv>
                <Label>Phone Number</Label>
                <ApplyFormInput
                  defaultValue={edit ? info.phone : null}
                  placeholder=""
                  {...register("phone", {
                    required: true,
                  })}
                />
                {errors.number && <Error>Phone Number is required</Error>}
              </InputDiv>
            </Col>
            <Col md={3} xs={12}>
              <InputDiv>
                <Label>Email</Label>
                <ApplyFormInput
                  defaultValue={edit ? info.email : null}
                  type="email"
                  placeholder=""
                  {...register("email", {
                    required: true,
                  })}
                />
                {errors.email && <Error>Email is required</Error>}
              </InputDiv>
            </Col>
            <Col md={3} xs={12}>
            <InputDiv>
                    <Label>Joining Date</Label>
                    <ApplyFormInput
                        type={'date'}
                        placeholder="" 
                        defaultValue={edit ? info.joiningDate : null}
                        {...register("joiningDate", {
                            required: true,
                        })}
                    />
                    {errors.delivery_date && (
                    <Error>Joining date is required</Error>
                    )}
                </InputDiv>
            </Col>
          </Row>
          <Row className="w-100 p-0 m-0">
            <Col md={6} xs={12}>
              <InputDiv>
                <Label>Designation</Label>
                <ApplyFormInput
                  defaultValue={edit ? info.designation : null}
                  placeholder=""
                  type="text"
                  {...register("designation")}
                />
              </InputDiv>
            </Col>
            <Col md={6} xs={12}>
              <InputDiv>
                <Label>Password</Label>
                <ApplyFormInput
                  placeholder=""
                  type="text"
                  {...register("password")}
                />
              </InputDiv>
            </Col>
            
          </Row>
          <div className="text-center my-lg-0 mb-lg-3">
            <SubmitButton type="submit" value="Save" />
          </div>
        </form>
      </AddItemContainer>
    </div>
  );
};

export default AddEmployee;

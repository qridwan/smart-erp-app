import React, { useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  AddItemContainer,
  ApplyFormInput,
  Error,
  InputDiv,
  Label,
  SubmitButton,
} from "../../../styles/styles";
import TopbarAtom from "../../../atoms/TopbarAtom";
import AddClients from "../../../Api/AddClient";

const AddClient = ({ setShow }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const topbarRef = useRef(null);
  const SubmitButtonRef = useRef(null);
  const onSubmit = (data) => {
    // console.log(data);
    // const clientRef = db.ref("inventory/clients");
    const clientId =
      data.agency.slice(0, 3).toUpperCase() + "-" + data.number.slice(-3);
    // console.log(clientId);
    // clientRef.child(`${clientId}`).update({
    //   address: data.address,
    //   city: data.city,
    //   district: data.district,
    //   email: data.email,
    //   phone: data.number,
    //   name: data.agency,
    //   supervisor: data.customer_name,
    //   pincode: data.pincode,
    //   remarks: data.remarks,
    //   state: data.state,
    //   orders: 0,
    //   id: clientId,
    // });
    AddClients({
      address: data.address,
      city: data.city,
      district: data.district,
      email: data.email,
      phone: data.number,
      name: data.agency,
      supervisor: data.customer_name,
      pincode: data.pincode,
      remarks: data.remarks,
      state: data.state,
      orders: 0,
      id: clientId,
    })
    setShow("clientsTable");
    reset();
  };
  return (
    <div>
      <TopbarAtom
        topRef={topbarRef}
        buttonRef={SubmitButtonRef}
        buttonTitle="Add Client"
        title="Add Client"
        goBack="clientsTable"
      />

      <AddItemContainer ref={topbarRef} className="px-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row className="w-100 p-0 m-0">
            <Col md={3} xs={12}>
              <InputDiv>
                <Label>Agency Name</Label>
                <ApplyFormInput
                  placeholder=""
                  type="text"
                  {...register("agency", { required: true })}
                />
                {errors.agency && <Error>Agency name is required</Error>}
              </InputDiv>
            </Col>
            <Col md={3} xs={12}>
              <InputDiv>
                <Label>Phone Number</Label>
                <ApplyFormInput
                  placeholder=""
                  {...register("number", {
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
                <Label>Customer Name</Label>
                <ApplyFormInput
                  type="text"
                  placeholder=""
                  {...register("customer_name", {
                    required: true,
                  })}
                />
                {errors.customer_name && (
                  <Error>Must include customer name</Error>
                )}
              </InputDiv>
            </Col>
          </Row>
          <Row className="w-100 p-0 m-0">
            <Col md={6} xs={12}>
              <InputDiv>
                <Label>Address</Label>
                <ApplyFormInput
                  placeholder=""
                  type="text"
                  {...register("address")}
                />
              </InputDiv>
            </Col>
            <Col md={3} xs={12}>
              <InputDiv>
                <Label>City</Label>
                <ApplyFormInput
                  type="text"
                  placeholder=""
                  {...register("city")}
                />
              </InputDiv>
            </Col>
            <Col md={3} xs={12}>
              <InputDiv>
                <Label>District</Label>
                <ApplyFormInput
                  type="text"
                  placeholder=""
                  {...register("district")}
                />
              </InputDiv>
            </Col>
          </Row>
          <Row className="w-100 p-0 m-0">
            <Col md={3} xs={12}>
              <InputDiv>
                <Label>State</Label>
                <ApplyFormInput
                  placeholder=""
                  type="text"
                  {...register("state", { required: true })}
                />
                {errors.state && <Error>State is required</Error>}
              </InputDiv>
            </Col>
            <Col md={3} xs={12}>
              <InputDiv>
                <Label>Pincode</Label>
                <ApplyFormInput
                  type="text"
                  placeholder=""
                  {...register("pincode", {
                    required: true,
                  })}
                />
                {errors.pincode && <Error>Pincode is required</Error>}
              </InputDiv>
            </Col>
            <Col md={6} xs={12}>
              <InputDiv>
                <Label>Remarks</Label>
                <ApplyFormInput
                  type="text"
                  placeholder=""
                  {...register("remarks")}
                />
              </InputDiv>
            </Col>
          </Row>
          <div className="text-center my-lg-0 mb-lg-3 d-none">
            <SubmitButton ref={SubmitButtonRef} type="submit" value="Save" />
          </div>
        </form>
      </AddItemContainer>
    </div>
  );
};

export default AddClient;

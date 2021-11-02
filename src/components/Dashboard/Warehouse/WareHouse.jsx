import React from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  AddItemContainer,
  ApplyFormInput,
  BoldText,
  Error,
  InputDiv,
  Label,
  SubmitButton,
  TopBar,
} from "../../../styles/styles";
const WareHouse = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {};
  return (
    <div>
      <TopBar>
        <div>
          <BoldText> Add WareHouse </BoldText>
        </div>
      </TopBar>

      <AddItemContainer className="px-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row className="w-100 p-0 m-0">
            <Col md={6} xs={12}>
              <InputDiv>
                <Label>Name</Label>
                <ApplyFormInput
                  placeholder=""
                  type="text"
                  {...register("warehouse", { required: true })}
                />
                {errors.warehouse && <Error>WareHouse name is required</Error>}
              </InputDiv>
            </Col>
            <Col md={6} xs={12}>
              <InputDiv>
                <Label>Location</Label>
                <ApplyFormInput
                  placeholder=""
                  {...register("location", {
                    required: true,
                  })}
                />
                {errors.location && <Error>Location is required</Error>}
              </InputDiv>
            </Col>
            <Col md={12} xs={12}>
              <InputDiv>
                <Label>Address</Label>
                <ApplyFormInput
                  placeholder=""
                  type="text"
                  {...register("address")}
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

export default WareHouse;

import React from "react";
import { Col } from "react-bootstrap";
import { ApplyFormInput, Error, InputDiv, Label } from "../styles/styles";

const InputAtom = ({
  register,
  errors,
  label,
  required,
  id,
  defaultValue,
  placeholder,
  md,
  type,
  readOnly,
}) => {
  return (
    <Col md={md} xs={12}>
      <InputDiv>
        <Label>{label}</Label>
        <ApplyFormInput
          readOnly={readOnly}
          type={type ? type : "text"}
          placeholder={placeholder}
          defaultValue={defaultValue}
          {...register(id, {
            required: required,
          })}
        />
        {errors[id] && <Error>{label} is required</Error>}
      </InputDiv>
    </Col>
  );
};

export default InputAtom;

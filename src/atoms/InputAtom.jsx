import React from "react";
import { Col } from "react-bootstrap";
import { ApplyFormInput, Error, InputDiv, Label } from "../styles/styles";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import dateFormat from "dateformat";

const InputAtom = ({
  register,
  control,
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
        {type !== "date" && (
          <ApplyFormInput
            readOnly={readOnly}
            type={type ? type : "text"}
            placeholder={placeholder}
            defaultValue={defaultValue}
            {...register(id, {
              required: required,
            })}
          />
        )}
        {type === "date" && (
          <Controller
            control={control}
            name={id}
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <ReactDatePicker
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                  openToDate={
                    defaultValue ? new Date(defaultValue) : new Date()
                  }
                  placeholderText={
                    defaultValue
                      ? dateFormat(new Date(defaultValue), "dd-mm-yyyy")
                      : "DD-MM-YYYY"
                  }
                  dateFormat="d-M-yyyy"
                  customInput={
                    <ApplyFormInput
                      defaultValue={defaultValue}
                      {...register(id, {
                        required: true,
                      })}
                    />
                  }
                />
              );
            }}
          />
        )}
        {errors[id] && <Error>{label} is required</Error>}
      </InputDiv>
    </Col>
  );
};

export default InputAtom;

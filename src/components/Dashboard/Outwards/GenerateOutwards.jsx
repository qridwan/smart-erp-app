import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useFieldArray, useForm } from "react-hook-form";
import styled from "styled-components";
import {
  AddItemContainer,
  ApplyFormInput,
  BoldText,
  Button,
  Error,
  InputDiv,
  Label,
  MainTitle,
  Select,
  SubmitButton,
  TableInput,
  TopBar,
} from "../../../styles/styles";
import { ReactComponent as IndiaIcon } from "../../../Assets/Icons/india.svg";
import { ReactComponent as DeleteIcon } from "../../../Assets/Icons/delete.svg";
import {
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { scrollToRef } from "../../../ScrollTop";

const useStyles = makeStyles({
  table: {
    width: "80%",
    paddingTop: "30px",
    margin: "0 auto",
  },
  thead: {
    borderBottom: "none",
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "21px",
    color: "#6D83AE",
    background: "#F7F9FD",
  },
  button: {
    display: "block",
    marginTop: "20px",
  },
  formControl: {
    margin: "10px",
    minWidth: 120,
  },
});

const GenerateOutwards = ({ setShow, details }) => {
console.log("🚀 ~ file: GenerateOutwards.jsx ~ line 57 ~ GenerateOutwards ~ details", details)
  const classes = useStyles();
  const topbarRef = useRef(null);
  const [edit, setEdit] = useState(false);

  const { agency, shipping, item, order, quantity } = details;

  const items = [
    { order, item, quantity, code: "12demo" },
    { order, item, quantity, code: "33demo" },
  ];
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "item",
  });
  useEffect(() => {
    scrollToRef(topbarRef)
    if (details.info) {
      setEdit(true);
      append(items)
    }

  }, [setShow, details.info]);
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <TopBar ref={topbarRef} className="mb-4">
        <BoldText>{edit? "Edit Outwards":"Generate Outwards"}</BoldText>
        <div>
          <Button outline onClick={() => setShow("outwards")}>
            View Outwards
          </Button>
        </div>
      </TopBar>
      <AddItemContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <MainTitle style={{ paddingTop: "10px" }}>Agency Details</MainTitle>
            <Row className="w-100 p-0 m-0">
              <Col md={3} xs={12}>
                <InputDiv>
                  <Label>Agency Name</Label>
                  <ApplyFormInput
                    placeholder="" 
                    defaultValue={edit ? agency : null}
                    type="text"
                    {...register("agency", { required: true })}
                  />
                  {errors.agency && <Error>Agency name is required</Error>}
                </InputDiv>
              </Col>
              <Col md={3} xs={12}>
                <InputDiv>
                  <Label>Receiver's Name</Label>
                  <ApplyFormInput
                    defaultValue={edit ? "Mick Hussy" : null}
                    {...register("receiver", {
                      required: true,
                    })}
                  />
                  {errors.receive && <Error>Receiver's name is required</Error>}
                </InputDiv>
              </Col>
              <Col md={3} xs={12}>
                <InputDiv>
                  <Label>Phone Number</Label>
                  <InputGroup className="">
                    <InputIcon id="basic-addon1" className="bg-white">
                      <IndiaIcon />
                    </InputIcon>
                    <ApplyFormInput
                      style={{ width: "100%", height: "98%", border: "none" }} defaultValue={edit ? "+91 889927" : null}
                      aria-label="phone_number"
                      {...register("phone_number", {
                        required: true,
                      })}
                    />
                  </InputGroup>
                  {errors.received_date && (
                    <Error>Received date number is required</Error>
                  )}
                </InputDiv>
              </Col>
              <Col md={3} xs={12}>
                <InputDiv>
                  <Label>Email</Label>
                  <ApplyFormInput
                    type="email"
                    placeholder="" defaultValue={edit ? "agency@yahoo.com" : null}
                    {...register("email", {
                      required: true,
                    })}
                  />
                  {errors.email && <Error>Email is required</Error>}
                </InputDiv>
              </Col>
            </Row>

            <MainTitle>Order Details</MainTitle>
            <Row className="w-100 p-0 m-0">
              <Col md={3} xs={12}>
                <InputDiv>
                  <Label>Order Generated by</Label>
                  <ApplyFormInput
                    placeholder="" defaultValue={edit ? "Ms Sinha" : null}
                    type="text"
                    {...register("generated_by", { required: true })}
                  />
                  {errors.generated_by && <Error>Input is empty</Error>}
                </InputDiv>
              </Col>
              <Col md={3} xs={12}>
                <InputDiv>
                  <Label>Reference Number</Label>
                  <ApplyFormInput
                    placeholder="" defaultValue={edit ? "99334" : null}
                    
                    {...register("reference", {
                      required: true,
                    })}
                  />
                  {errors.supplier && <Error>Reference is required</Error>}
                </InputDiv>
              </Col>
              <Col md={3} xs={12}>
                <InputDiv>
                  <Label>P.O Number</Label>
                  <ApplyFormInput
                    
                    placeholder="" defaultValue={edit ? "99334" : null}
                    {...register("po_number", {
                      required: true,
                    })}
                  />
                  {errors.po_number && <Error>P.O number is required</Error>}
                </InputDiv>
              </Col>
              <Col md={3} xs={12}>
                <InputDiv>
                  <Label>P.I Number</Label>
                  <ApplyFormInput
                    
                    placeholder="" defaultValue={edit ? "99334" : null}
                    {...register("PI_number", {
                      required: true,
                    })}
                  />
                  {errors.PI_number && <Error>P.I number is required</Error>}
                </InputDiv>
              </Col>
              <Col md={3} xs={12}>
                <InputDiv>
                  <Label>Eway Bill</Label>
                  <ApplyFormInput
                    type="text"
                    placeholder="" defaultValue={edit ? "99334" : null}
                    {...register("eway_bill", {
                      required: true,
                    })}
                  />
                  {errors.eway_bill && (
                    <Error>Eway bill number is required</Error>
                  )}
                </InputDiv>
              </Col>
              <Col md={3} xs={12}>
                <InputDiv>
                  <Label>D.C Number</Label>
                  <ApplyFormInput
                    
                    placeholder="" defaultValue={edit ? "99334" : null}
                    {...register("dc_number", {
                      required: true,
                    })}
                  />
                  {errors.dc_number && <Error>D.C number is required</Error>}
                </InputDiv>
              </Col>
            </Row>
            <MainTitle>Delivery Details</MainTitle>
            <Row className="w-100 p-0 m-0">
              <Col md={6} xs={12}>
                <InputDiv>
                  <Label>Address</Label>
                  <ApplyFormInput
                    placeholder="" defaultValue={edit ? agency : null}
                    type="text"
                    {...register("address", { required: true })}
                  />
                  {errors.address && <Error>Address is required</Error>}
                </InputDiv>
              </Col>
              <Col md={3} xs={12}>
                <InputDiv>
                  <Label>City</Label>
                  <ApplyFormInput
                    placeholder="" defaultValue={edit ? "Mumbai" : null}
                    {...register("city", {
                      required: true,
                    })}
                  />
                  {errors.city && <Error>City is required</Error>}
                </InputDiv>
              </Col>
              <Col md={3} xs={12}>
                <InputDiv>
                  <Label>District</Label>
                  <ApplyFormInput
                    type="text"
                    placeholder="" defaultValue={edit ? "Mumbai" : null}
                    {...register("district", {
                      required: true,
                    })}
                  />
                  {errors.district && <Error>District name is required</Error>}
                </InputDiv>
              </Col>
              <Col md={3} xs={12}>
                <InputDiv>
                  <Label>State</Label>
                  <ApplyFormInput
                    type="text"
                    placeholder="" defaultValue={edit ? "Mumbai" : null}
                    {...register("state", {
                      required: true,
                    })}
                  />
                  {errors.state && <Error>State is required</Error>}
                </InputDiv>
              </Col>
              <Col md={3} xs={12}>
                <InputDiv>
                  <Label>Pincode</Label>
                  <ApplyFormInput
                    type=""
                    placeholder="" defaultValue={edit ? "99334" : null}
                    {...register("pincode", {
                      required: true,
                    })}
                  />
                  {errors.pincode && <Error>Pincode is required</Error>}
                </InputDiv>
              </Col>
              <Col md={3} xs={12}>
                <InputDiv>
                  <Label>Mode of Transportation</Label>
                  <Select defaultValue = {edit ? 'aa' : null} {...register("Transport")}>
                    <option value=" "> </option>
                    <option value="aa">A</option>
                    <option value="bb">B</option>
                    <option value="cc">C</option>
                  </Select>
                </InputDiv>
              </Col>
              <Col md={3} xs={12}>
                <InputDiv>
                  <Label>Delivery Date</Label>
                  <ApplyFormInput
                    type={edit? null : 'date'}
                    placeholder="" defaultValue={edit ? shipping : null}
                    {...register("delivery_date", {
                      required: true,
                    })}
                  />
                  {errors.delivery_date && (
                    <Error>Delivery date is required</Error>
                  )}
                </InputDiv>
              </Col>
              <Col md={12} xs={12}>
                <InputDiv>
                  <Label>Remarks</Label>
                  <ApplyFormInput
                    type="text"
                    placeholder="" defaultValue={edit ? agency : null}
                    {...register("remarks")}
                  />
                </InputDiv>
              </Col>
            </Row>
          </Container>
          <AddItemsContainer>
            <Container>
              <MainTitle>Add Items</MainTitle>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.thead} align="center">
                      #
                    </TableCell>
                    <TableCell className={classes.thead} align="center">
                      Item Code
                    </TableCell>
                    <TableCell className={classes.thead} align="center">
                      Item
                    </TableCell>
                    <TableCell className={classes.thead} align="center">
                      Total Qty.
                    </TableCell>
                    <TableCell
                      className={classes.thead}
                      align="center"
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
               {fields.map((item, index) => {
                    return (
                      <TableRow key={item.id}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">
                          <TableInput
                            style={{ border: "none" }}
                            name={`item[${index}].code`}
                            defaultValue={`${item.code}`}
                            {...register(`item.${index}.code`)}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <select
                            name={`item[${index}].name`}
                            defaultValue={`${item.name}`}
                            {...register(`item.${index}.name`)}
                          >
                            <option value="IP Camera">IP Camera</option>
                            <option value="aa">A</option>
                            <option value="bb">B</option>
                            <option value="cc">C</option>
                          </select>
                        </TableCell>
                        <TableCell align="center">
                          <TableInput
                            
                            name={`item[${index}].quantity`}
                            defaultValue={`${item.quantity}`}
                            {...register(`item.${index}.quantity`)}
                          ></TableInput>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            type="button"
                            onClick={() => remove(index)}
                            Delete
                            color="secondary"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Container>
          </AddItemsContainer>
          <div className="text-center mt-lg-5">
            <Button
              outline
              onClick={() => {
                let genCode = Math.floor(Math.random() + Math.random() * 10000);
                append({ code: genCode, name: "IP Camera", quantity: 10 });
              }}
            >
              + Add Item
            </Button>
          </div>

          <div className="text-center my-lg-5">
            <SubmitButton
              type="submit"
              value="Generate Order"
              disabled={fields.length ? "" : "disabled"}
            />
          </div>
        </form>
      </AddItemContainer>
    </div>
  );
};

export default GenerateOutwards;
const AddItemsContainer = styled.div`
  @media only screen and (max-width: 1000px) {
    overflow-x: scroll;
  }
`;
const Container = styled.div`
  padding: 0 50px;
  @media only screen and (max-width: 1000px) {
    padding: 0;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  align-items: center;
  width: 100%;
  border: 1px solid #8e8e8e;
  border-radius: 5px;
  height: 45px;
  padding: 0;
`;
const InputIcon = styled.span`
  border-right: 1px solid #8e8e8e;
  padding: 0;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  margin-left: 4px;
`;

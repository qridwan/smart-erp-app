import { makeStyles, TableBody } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Table, TableCell, TableHead, TableRow } from "@material-ui/core";
import React, { useEffect, useState, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { useFieldArray, useForm } from "react-hook-form";
import styled from "styled-components";
import { ReactComponent as DeleteIcon } from "../../../Assets/Icons/delete.svg";

import {
  AddItemContainer,
  ApplyFormInput,
  Button,
  Error,
  InputDiv,
  Label,
  MainTitle,
  Select,
  SubmitButton,
  TableContainer,
  TableInput,
  TableSelect,
} from "../../../styles/styles";

import { db as firebase, bucket, auth } from '../../../firebase';
import { UserContext } from "../../../context/UserProvider";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles({
  table: {
    width: "100%",
    paddingTop: "30px",
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





const ReceiveOrder = ({ setShow, details, setDetails }) => {
  const [edit, setEdit] = useState(false);
  const { agency, date, item, order, quantity, audit } = details;

  const user = useContext(UserContext); 

  const items = [
    {
      order,
      item,
      quantity,
      date,
      received: "22",
      good_condition: "32",
      bad_condition: "34",
      code: "12demo",
      not_working: "0",
    },
    {
      order,
      item,
      quantity,
      date,
      received: "22",
      good_condition: "32",
      bad_condition: "34",
      code: "12demo",
      not_working: "0",
    },
  ];
  const classes = useStyles();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    reset
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "item",
  });


  useEffect(() => {
    if (details.info) {
      setEdit(true);
      append(items);

      let data = details;
      delete data.info;
      reset(data);
      setAgency(data.agency)
    }
  }, [setShow, details.info]);

  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [agencyName, setAgency] = useState('');

  useEffect(() => {

    console.log('inside useEffect')

    const clientsRef = firebase.ref("inventory/clients");
    clientsRef.once("value", (snapshot) => {
      let clients = []
      Object.keys(snapshot.val()).map((key) => {
        clients.push(snapshot.val()[key])
      });
      setClients(clients);
    });

    const productsRef = firebase.ref("inventory/products");
    productsRef.once("value", (snapshot) => {
      let products = []
      Object.keys(snapshot.val()).map((key) => {
        products.push(snapshot.val()[key])
      })
      console.log(snapshot.val());
      console.log(products);
      setProducts(products);
    });
  }, []);


  const onSubmit = (data) => {
    console.log(data);
    data['agency'] = agencyName;
    let total = 0;
    data.item.map(item => {
      total = total + item.quantity;
    });
    data['total'] = total;
    data['item'] = data.item.map(item => {
      products.map((product) => {
        if (product.name == item.name) {
          item['id'] = product.id
        }
      })

      return item
    })
    const inRef = firebase.ref("inventory/in-orders");
    inRef.child(`${data.orderNo}`).update(data);
    console.log('order created in db');
    setShow("inwards");
    reset();
  };
  return (
    <AddItemContainer className="mt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Row className="w-100 p-0 m-0">
            <Col md={3} xs={12}>
              <InputDiv>
                <Label>Order No.</Label>
                <ApplyFormInput
                  defaultValue={edit ? order : null}
                  type="text"
                  {...register("orderNo", { required: true })}
                />
                {errors.order_no && <Error>Order number is required</Error>}
              </InputDiv>
            </Col>
            <Col md={3} xs={12}>
              <InputDiv>
                <Label>Date Received</Label>
                <ApplyFormInput
                  defaultValue={edit ? date : null}
                  type="date"
                  {...register("receivedDate", {
                    required: true,
                  })}
                />
                {errors.received_date && (
                  <Error>Receive date is required</Error>
                )}
              </InputDiv>
            </Col>
            <Col md={3} xs={12}>
            <Label>Agency Name</Label>
                <Autocomplete
                  id="combo-box-demo"
                  options={clients}
                  openOnFocus
                  getOptionLabel={(option) => option.name}
                  // defaultValue={edit ? client : null}
                  renderOption={(option) => (
                    <React.Fragment>
                      <span>{option.name}</span>
                    </React.Fragment>
                  )}
                  // PREFILLS DATA BASED ON CLIENT'S INFO
                  onChange={(event, newValue) => {
                    console.log(newValue);
                    if(newValue) {
                      setAgency(newValue.name);
                      setValue("generatedBy", user.email);
                    }
                    else {
                      setAgency('');
                      setValue("generatedBy", "");
                    }

                  }}
                  renderInput={(params) => <TextField {...params} placeholder={edit ? details.agency : ""}  variant="outlined"  />}
                />
            </Col>
            <Col md={3} xs={12}>
              <InputDiv>
                <Label>Generated by</Label>
                <ApplyFormInput
                  type="text"
                  defaultValue={edit ? "Kl Rahul" : null}
                  {...register("generatedBy", {
                    required: true,
                  })}
                />
                {errors.generated_by && <Error>Input is invalid</Error>}
              </InputDiv>
            </Col>
          </Row>
          <section>
            <MainTitle>Add Items</MainTitle>
            <TableContainer className="w-100">
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.thead} align="center">
                      #
                    </TableCell>
                    <TableCell className={classes.thead} align="center">
                      Item Name
                    </TableCell>
                    {/* <TableCell className={classes.thead} align="center">
                      SKU
                    </TableCell> */}
                    <TableCell className={classes.thead} align="center">
                      Total Qty.
                    </TableCell>
                    <TableCell className={classes.thead} align="center">
                      Received
                    </TableCell>
                    <TableCell className={classes.thead} align="center">
                      Good Condition
                    </TableCell>
                    <TableCell className={classes.thead} align="center">
                      Bad Condition
                    </TableCell>
                    <TableCell className={classes.thead} align="center">
                      Not Working
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
                          <TableSelect
                            name={`item[${index}].name`}
                            defaultValue={`${item.name}`}
                            onChange={(e, newVal) => {
                              console.log('inside changed');
                              console.log(e.target.value);
                            }}
                            {...register(`item.${index}.name`)}
                          >
                            {products.map(product => (
                              <option value={product.name}>{product.name}</option>
                            ))}
                          </TableSelect>
                        </TableCell>
                        <TableCell align="center">
                          <TableInput
                            name={`item[${index}].quantity`}
                            defaultValue={`${item.quantity}`}
                            {...register(`item.${index}.quantity`)}
                          />
                        </TableCell>

                        <TableCell align="center">
                          <TableInput
                            type="number"
                            name={`item[${index}].received`}
                            defaultValue={`${item.received}`}
                            {...register(`item.${index}.received`)}
                          ></TableInput>
                        </TableCell>
                        <TableCell align="center">
                          <TableInput
                            type="number"
                            name={`item[${index}].good_condition`}
                            defaultValue={`${item.good_condition}`}
                            {...register(`item.${index}.good_condition`)}
                          ></TableInput>
                        </TableCell>
                        <TableCell align="center">
                          <TableInput
                            type="number"
                            name={`item[${index}].bad_condition`}
                            defaultValue={`${item.bad_condition}`}
                            {...register(`item.${index}.bad_condition`)}
                          ></TableInput>
                        </TableCell>
                        <TableCell align="center">
                          <TableInput
                            type="number"
                            name={`item[${index}].not_working`}
                            defaultValue={`${item.not_working}`}
                            {...register(`item.${index}.not_working`)}
                          ></TableInput>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={() => remove(index)}
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
            </TableContainer>
          </section>
          <div className="text-center mt-lg-5">
            <Button
              outline
              onClick={() => {
                append({
                  name: "",
                  quantity: "",
                  received: "",
                  good_condition: "",
                  bad_condition: "",
                  not_working: "",
                });
              }}
            >
              + Add Item
            </Button>
          </div>

          <MainTitle>Delivery Details</MainTitle>
          <Row className="w-100 p-0 m-0">
            <Col md={3} xs={12}>
              <InputDiv>
                <Label>Mode of Transport</Label>
                <Select defaultValue = {edit ? 'bb' : null} {...register("transport")}>
                  <option value=" "> </option>
                  <option value="aa">A</option>
                  <option value="bb">B</option>
                  <option value="cc">C</option>
                </Select>
              </InputDiv>
            </Col>
            <Col md={3} xs={12}>
              <InputDiv>
                <Label>Courier/Flight No.</Label>
                <ApplyFormInput
                  type="text"
                  defaultValue={edit ? "2323DEMO" : null}
                  {...register("courierNo", {
                    required: true,
                  })}
                />
                {errors.courier_no && <Error>This field is required</Error>}
              </InputDiv>
            </Col>
            <Col md={3} xs={12}>
              <InputDiv>
                <Label>Received Location</Label>
                <ApplyFormInput
                  type="text"
                  defaultValue={edit ? "Naagpur" : null}
                  {...register("receivedLocation", {
                    required: true,
                  })}
                />
                {errors.received_location && (
                  <Error>Receiver location is required</Error>
                )}
              </InputDiv>
            </Col>
            <Col md={3} xs={12}>
              <InputDiv>
                <Label>Received by</Label>
                <ApplyFormInput
                  type="text"
                  defaultValue={edit ? "GM Talla" : null}
                  {...register("receiverName", {
                    required: true,
                  })}
                />
                {errors.receiver_name && (
                  <Error>Receiver name is required</Error>
                )}
              </InputDiv>
            </Col>

            <Col md={9} xs={12}>
              <InputDiv>
                <Label>Remarks</Label>
                <ApplyFormInput
                  defaultValue={edit ? agency : null}
                  type="text"
                  {...register("remarks")}
                />
              </InputDiv>
            </Col>
            <Col md={3} xs={12}>
              <InputDiv>
                <Label>Audit Status</Label>
                <Select defaultValue = {edit ? audit : null}{...register("auditStatus")}>
                  <option value="Incomplete"> Incomplete </option>
                  <option value="Complete"> Complete </option>
                </Select>
              </InputDiv>
            </Col>
          </Row>
          <div className="text-center my-md-5">
            <SubmitButton
              type="submit"
              value="Save"
              disabled={fields.length ? "" : "disabled"}
            />
          </div>
        </Container>
      </form>
    </AddItemContainer>
  );
};

export default ReceiveOrder;
const Container = styled.div`
  padding: 0 50px;
  @media only screen and (max-width: 1000px) {
    padding: 0 25px;
  }
`;

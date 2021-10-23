import { makeStyles, TableBody } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Table, TableCell, TableHead, TableRow } from "@material-ui/core";
import React, { useEffect, useState, useContext, useRef } from "react";
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

import { db as firebase, bucket, auth, db } from "../../../firebase";
import { UserContext } from "../../../context/UserProvider";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { onValue, ref } from "@firebase/database";
import TopbarAtom from "../../../atoms/TopbarAtom";
import InputAtom from "../../../atoms/InputAtom";
import DocInputAtom from "../../../atoms/DocInputAtom";

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

const GenerateInwards = ({ setShow, details, setDetails }) => {
  const [edit, setEdit] = useState(false);
  const { agency, date, item, order, quantity, audit } = details;
  console.log("🚀 ~ GenerateInwards ~ details", details);

  const topbarRef = useRef(null);
  const SubmitButtonRef = useRef(null);
  const user = useContext(UserContext);
  const [inwardDocFile, setInwardDocFile] = useState("");
  const [courierDocFile, setCourierDocFile] = useState("");
  const [inwardImageFile, setInwardImageFile] = useState("");
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
    reset,
    watch,
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
      setAgency(data.agency);
    }
  }, [setShow, details.info]);

  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [agencyName, setAgency] = useState("");
  const status = watch("auditStatus");
  console.log("🚀 ~ GenerateInwards ~ status", status);
  useEffect(() => {
    const clientsRef = ref(db, "inventory/clients");
    onValue(clientsRef, (snapshot) => {
      let clients = [];
      Object.keys(snapshot.val()).forEach((key) => {
        clients.push(snapshot.val()[key]);
      });
      setClients(clients);
    });
    const productsRef = ref(db, "inventory/products");
    onValue(productsRef, (snapshot) => {
      let products = [];
      Object.keys(snapshot.val()).forEach((key) => {
        products.push(snapshot.val()[key]);
      });
      console.log(snapshot.val());
      console.log(products);
      setProducts(products);
    });
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    data["agency"] = agencyName;
    let total = 0;
    data.item.forEach((item) => {
      total = total + item.quantity;
    });
    data["total"] = total;
    data["item"] = data.item.map((item) => {
      products.map((product) => {
        if (product.name == item.name) {
          item["id"] = product.id;
        }
      });
      return item;
    });
    const inRef = ref(db, "inventory/in-orders");
    inRef.child(`${data.orderNo}`).update(data);
    console.log("order created in db");
    // setShow("inwardsTable");
    reset();
  };
  return (
    <div>
      <TopbarAtom
        topRef={topbarRef}
        buttonRef={SubmitButtonRef}
        buttonTitle={edit ? "Update" : "Save"}
        title="Generate Inwards"
        goBack="inwardsTable"
      />

      <AddItemContainer className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <Row className="w-100 p-0 m-0">
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
                    if (newValue) {
                      setAgency(newValue.name);
                      setValue("generatedBy", user.email);
                    } else {
                      setAgency("");
                      setValue("generatedBy", "");
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder={edit ? details.agency : ""}
                      variant="outlined"
                    />
                  )}
                />
              </Col>
              <InputAtom
                readOnly={false}
                register={register}
                errors={errors}
                label="Email"
                required={edit ? false : true}
                id="email"
                placeholder=""
                defaultValue={edit ? details.email : ""}
                md={3}
              />
              <InputAtom
                readOnly={false}
                register={register}
                errors={errors}
                type="date"
                label="Date Received"
                required={edit ? false : true}
                id="receivedDate"
                placeholder=""
                defaultValue={edit ? details.receivedDate : ""}
                md={3}
              />
              <InputAtom
                readOnly={false}
                register={register}
                errors={errors}
                label="Agency Adresse"
                required={edit ? false : true}
                id="agencyAdress"
                placeholder=""
                defaultValue={edit ? details.agencyAdress : ""}
                md={6}
              />
              <InputAtom
                readOnly={false}
                register={register}
                errors={errors}
                label="City"
                required={edit ? false : true}
                id="city"
                placeholder=""
                defaultValue={edit ? details.city : ""}
                md={3}
              />
              <InputAtom
                readOnly={false}
                register={register}
                errors={errors}
                label="State"
                required={edit ? false : true}
                id="state"
                placeholder=""
                defaultValue={edit ? details.state : ""}
                md={3}
              />
              <InputAtom
                readOnly={false}
                register={register}
                errors={errors}
                label="Pincode"
                required={edit ? false : true}
                id="pincode"
                placeholder=""
                defaultValue={edit ? details.pincode : ""}
                md={3}
              />
              <DocInputAtom
                label="Inward Document"
                setDocFile={setInwardDocFile}
                docFile={inwardDocFile}
              />
              <DocInputAtom
                label="Courier Document"
                setDocFile={setCourierDocFile}
                docFile={courierDocFile}
              />
            </Row>

            <MainTitle>Recieved Details</MainTitle>
            <Row className="w-100 p-0 m-0">
              <Col md={3} xs={12}>
                <InputDiv>
                  <Label>Mode of Transportation</Label>
                  <Select
                    defaultValue={edit ? details.transport : null}
                    {...register("transport")}
                  >
                    <option value=""> </option>
                    <option value="airways">Airways</option>
                    <option value="road">Road</option>
                    <option value="train">Train</option>
                  </Select>
                </InputDiv>
              </Col>
              <InputAtom
                readOnly={false}
                register={register}
                errors={errors}
                label="Courier Name"
                required={edit ? false : true}
                id="courier_name"
                placeholder=""
                defaultValue={edit ? details.courier_name : null}
                md={3}
              />
              <InputAtom
                readOnly={false}
                register={register}
                errors={errors}
                label=" Courier No./L.R. Number"
                required={edit ? false : true}
                id="courier_no"
                placeholder=""
                defaultValue={edit ? details.courier_no : null}
                md={3}
              />

              <Col md={3} xs={12}>
                <InputDiv>
                  <Label>Received Location</Label>
                  <Select
                    defaultValue={edit ? details.transport : null}
                    {...register("transport")}
                  >
                    <option value=""> </option>
                    <option value="sst_godown">SST-Godown</option>
                    <option value="sst_office">SST-Office</option>
                  </Select>
                </InputDiv>
              </Col>
              <InputAtom
                readOnly={false}
                register={register}
                errors={errors}
                label="Generated by"
                required={edit ? false : true}
                id="generatedBy"
                placeholder=""
                defaultValue={edit ? details.generatedBy : null}
                md={3}
              />
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
                            <TableSelect
                              name={`item[${index}].name`}
                              defaultValue={`${item.name}`}
                              onChange={(e, newVal) => {
                                console.log("inside changed");
                                console.log(e.target.value);
                              }}
                              {...register(`item.${index}.name`)}
                            >
                              {products.map((product) => (
                                <option value={product.name}>
                                  {product.name}
                                </option>
                              ))}
                            </TableSelect>
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
                            <TableInput
                              name={`item[${index}].quantity`}
                              defaultValue={`${item.quantity}`}
                              {...register(`item.${index}.quantity`)}
                            />
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
              <div className="text-center my-lg-4">
                <Button
                  outline
                  onClick={() => {
                    append({
                      name: "",
                      received: "",
                      good_condition: "",
                      bad_condition: "",
                      not_working: "",

                      quantity: "",
                    });
                  }}
                >
                  + Add Item
                </Button>
              </div>
            </section>

            <Row>
              <Col md={3} xs={12}>
                <InputDiv>
                  <Label>Audit Status</Label>
                  <Select
                    className={
                      status === "pending" ? "text-danger" : "text-success"
                    }
                    defaultValue={edit ? audit : null}
                    {...register("auditStatus")}
                  >
                    <option value="pending" className="text-dark">
                      Pending
                    </option>
                    <option value="complete" className="text-dark">
                      Complete
                    </option>
                  </Select>
                </InputDiv>
              </Col>
              <DocInputAtom
                label="Upload Image*"
                setDocFile={setInwardImageFile}
                docFile={inwardImageFile}
                disabled={status === "complete" ? false : true}
              />
            </Row>

            <div className="d-none text-center my-md-5">
              <SubmitButton
                type="submit"
                ref={SubmitButtonRef}
                value="Save"
                // disabled={fields.length ? "" : "disabled"}
              />
            </div>
          </Container>
        </form>
      </AddItemContainer>
    </div>
  );
};

export default GenerateInwards;
const Container = styled.div`
  padding: 0 50px;
  @media only screen and (max-width: 1000px) {
    padding: 0 25px;
  }
`;

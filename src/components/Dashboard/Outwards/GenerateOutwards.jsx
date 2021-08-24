import React, { useEffect, useRef, useState, useContext } from "react";
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

import { db as firebase, bucket, auth } from '../../../firebase';
import { UserContext } from "../../../context/UserProvider";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


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

const GenerateOutwards = ({ setShow, details, setDetails }) => {
console.log("🚀 ~ file: GenerateOutwards.jsx ~ line 57 ~ GenerateOutwards ~ details", details)
  const classes = useStyles();
  const topbarRef = useRef(null);
  const [edit, setEdit] = useState(false);

  const { agency, shipping, item, order, quantity } = details;

  const user = useContext(UserContext); 

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
  
  

  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [agencyName, setAgency] = useState('');
  const [client, setClient] = useState({});

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

  useEffect(() => {
    scrollToRef(topbarRef)
    if (details.info) {
      setEdit(true);
      append(details.item);  
      console.log(details);
      let client = clients.map((client) => {
        if(client.name == details.agency) {
          return client;
        }
      })
      client = client[0];
      setClient(client);
    }

  }, [setShow, details.info]);

  // OUT ORDER SUBMIT FORM
  const onSubmit = (data) => {
    console.log(data);
    let res = data;
    res['agency'] = agencyName;
    let total = 0;
    res.item.map((item) => {
      total = parseInt(total) + parseInt(item.quantity);
    })
    res['total'] = total;
    res['sent'] = 0;
    res['pending'] = total;
    res['status'] = 'intransit'
    const outRef = firebase.ref("inventory/out-orders");
    outRef.child(`${data.ewayBill}`).update(data);
    console.log('order created in db');
    setShow("outwards");
    reset();
  };

  const clientChange = (e) => {
    console.log(e.target.value);
  }

  return (
    <div>
      <TopBar ref={topbarRef} className="mb-4">
        <BoldText>{edit? "Edit Outwards":"Generate Outwards"}</BoldText>
        <div>
          <Button outline onClick={() => {
            reset();
            setShow("outwards");
            setDetails({});
          }}>
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
                <Label>Agency Name</Label>
                <Autocomplete
                  id="combo-box-demo"
                  options={clients}
                  openOnFocus
                  getOptionLabel={(option) => option.name}
                  defaultValue={edit ? client : null}
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
                      setValue("receiver", newValue.supervisor);
                      setValue("email", newValue.email);
                      setValue("generated_by", user.email);
                      setValue("phone_number", newValue.phone);
                      setValue("address", newValue.address);
                      setValue("city", newValue.city);
                      setValue("district", newValue.district);
                      setValue("state", newValue.state);
                      setValue("pincode", newValue.pincode);
                      setValue("state", newValue.state);
                      setValue("remarks", newValue.remarks);
                    }
                    else {
                      setAgency('');
                      setValue("receiver", "");
                      setValue("email", "");
                      setValue("generated_by", "");
                      setValue("phone_number", "");
                      setValue("address", "");
                      setValue("city", "");
                      setValue("district", "");
                      setValue("state", "");
                      setValue("pincode", "");
                      setValue("state", "");
                      setValue("remarks","");
                    }

                  }}
                  renderInput={(params) => <TextField {...params} placeholder={edit ? details.agency : ""}  variant="outlined"  />}
                />
              </Col>
              <Col md={3} xs={12}>
                <InputDiv>
                  <Label>Receiver's Name</Label>
                  <ApplyFormInput
                    readOnly
                    defaultValue={edit ? details.receiver : null}
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
                      readOnly
                      style={{ width: "100%", height: "98%", border: "none" }} defaultValue={edit ? details.phone_number : null}
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
                    readOnly
                    type="email"
                    placeholder="" defaultValue={edit ? details.email : null}
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
                    readOnly
                    placeholder="" defaultValue={edit ? details.generated_by : null}
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
                    placeholder="" defaultValue={edit ? details.reference : null}
                    
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
                    placeholder="" defaultValue={edit ? details.po_number : null}
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
                    
                    placeholder="" defaultValue={edit ? details.piNumber : null}
                    {...register("piNumber", {
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
                    readOnly={edit ? true : false}
                    placeholder="" defaultValue={edit ? details.ewayBill : null}
                    {...register("ewayBill", {
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
                    
                    placeholder="" defaultValue={edit ? details.dcNumber : null}
                    {...register("dcNumber", {
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
                    readOnly
                    placeholder="" defaultValue={edit ? details.address : null}
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
                    readOnly
                    placeholder="" defaultValue={edit ? details.city : null}
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
                    readOnly
                    type="text"
                    placeholder="" defaultValue={edit ? details.district : null}
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
                    readOnly
                    type="text"
                    placeholder="" defaultValue={edit ? details.state : null}
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
                    readOnly
                    type=""
                    placeholder="" defaultValue={edit ? details.pincode : null}
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
                  <Select defaultValue = {edit ? details.transport : null} {...register("transport")}>
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
                    placeholder="" defaultValue={edit ? details.deliveryDate : null}
                    {...register("deliveryDate", {
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
                    placeholder="" defaultValue={edit ? details.remarks : null}
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
                            {products.map(product => {
                              return (
                                <option value={product.name}>{product.name}</option>
                              );
                            })}
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
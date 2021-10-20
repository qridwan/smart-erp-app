import React, { useEffect, useRef, useState, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { useFieldArray, useForm } from "react-hook-form";
import styled from "styled-components";
import {
  AddItemContainer,
  AddItemsContainer,
  addTableStyles,
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
  // makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { scrollToRef } from "../../../ScrollTop";

import { db } from "../../../firebase";
import { UserContext } from "../../../context/UserProvider";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { onValue, ref } from "@firebase/database";
import TopbarAtom from "../../../atoms/TopbarAtom";
import InputAtom from "../../../atoms/InputAtom";
import DocInputAtom from "../../../atoms/DocInputAtom";

const GenerateOutwards = ({ setShow, details, setDetails }) => {
  const classes = addTableStyles();
  const topbarRef = useRef(null);
  const SubmitButtonRef = useRef(null);
  const [edit, setEdit] = useState(false);
  const [ewayDocFile, setEwayDocFile] = useState("");
  const [dcDocFile, setDcDocFile] = useState("");
  const [courierDocFile, setCourierDocFile] = useState("");
  const [packagingDocFile, setPackagingDocFile] = useState("");
  const user = useContext(UserContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    reset,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "item",
  });

  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [productObj, setProductObj] = useState({});
  const [agencyName, setAgency] = useState("");
  const [client, setClient] = useState({});
  // const [items, setItems] = useState([]);
  // const [clientId, setClientId] = useState("");

  useEffect(() => {
    console.log("inside useEffect");

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
      setProductObj(snapshot.val());
    });
  }, []);

  useEffect(() => {
    scrollToRef(topbarRef);
    if (details.info) {
      setEdit(true);
      append(details.item);
      console.log(details);
      let client = clients.map((client) => {
        if (client.name === details.agency) {
          return client;
        }
      });
      console.log("🚀 ~ client ~ client", client);
      let data = details;
      delete data.info;
      reset(data);
      setAgency(data.agency);
      client = client[0];
      setClient(client);
    }
  }, [setShow, details.info]);

  // OUT ORDER SUBMIT FORM
  const onSubmit = (data) => {
    console.log(data);
    console.log(productObj);
    let res = data;
    let codeArr = [];
    res["agency"] = agencyName;

    clients.forEach((client) => {
      if (client.name === agencyName) {
        const cRef = ref(db, `inventory/clients/${client.id}`);
        onValue(cRef, (snapshot) => {
          cRef.update({
            orders: snapshot.val().orders + 1,
          });
        });
      }
    });

    res.item = res.item.map((item, index) => {
      let pro = productObj[item.code];
      if (edit) {
        pro["available"] = Math.abs(
          parseInt(pro["available"]) -
            parseInt(item.sent) +
            parseInt(details.item[index].sent)
        );
      } else {
        pro["available"] = Math.abs(
          parseInt(pro["available"]) - parseInt(item.sent)
        );
      }

      const proRef = ref(db, `inventory/products/${item.code}`);
      proRef.update({
        available: pro["available"],
      });

      item["name"] = productObj[item.code].name;
      item["pending"] = parseInt(item["quantity"]) - parseInt(item["sent"]);
      codeArr.push(item.code);
      return item;
    });

    res["status"] = "intransit";
    const outRef = ref(db, "inventory/out-orders");
    console.log(data);
    outRef.child(`${data.ewayBill}`).update(data);
    console.log("order created in db");
    setShow("outwards");
    reset();

    // newProducts = products.map(product => {
    //   if(codeArr(product.id))
    // })
  };
  return (
    <div>
      <TopbarAtom
        topRef={topbarRef}
        buttonRef={SubmitButtonRef}
        buttonTitle={edit ? "Update" : "Save"}
        title="Generate Outwards"
        goBack="outwardsTable"
      />
      {/* <TopBar ref={topbarRef} className="mb-4">
        <BoldText>{edit ? "Edit Outwards" : "Generate Outwards"}</BoldText>
        <div>
          <Button
            outline
            onClick={() => {
              reset();
              setShow("outwards");
              setDetails({});
            }}
          >
            View Outwards
          </Button>
        </div>
      </TopBar> */}
      <AddItemContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <Row className="w-100 p-0 m-0">
              <MainTitle style={{ paddingTop: "10px" }}>
                Agency Details
              </MainTitle>
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
                    if (newValue) {
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
                    } else {
                      setAgency("");
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
                      setValue("remarks", "");
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
                label="Receiver's Name"
                required={edit ? false : true}
                id="receiver"
                placeholder=""
                defaultValue={edit ? details.receiver : null}
                md={3}
              />
              <InputAtom
                readOnly={false}
                register={register}
                errors={errors}
                label="Email"
                required={edit ? false : true}
                id="email"
                placeholder=""
                defaultValue={edit ? details.email : null}
                md={3}
              />
            </Row>

            <Row className="w-100 p-0 m-0">
              <MainTitle>Delivery Details</MainTitle>
              <InputAtom
                readOnly={false}
                register={register}
                errors={errors}
                label="Address"
                required={edit ? false : true}
                id="address"
                placeholder=""
                defaultValue={edit ? details.address : null}
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
                defaultValue={edit ? details.city : null}
                md={3}
              />
              <InputAtom
                readOnly={false}
                register={register}
                errors={errors}
                label="District"
                required={edit ? false : true}
                id="district"
                placeholder=""
                defaultValue={edit ? details.district : null}
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
                defaultValue={edit ? details.district : null}
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
                defaultValue={edit ? details.district : null}
                md={3}
              />

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
                type="date"
                label="Shipping Date"
                required={edit ? false : true}
                id="shippingDate"
                placeholder=""
                defaultValue={edit ? details.shippingDate : null}
                md={3}
              />
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

              <InputAtom
                readOnly={false}
                register={register}
                errors={errors}
                label="Package Name"
                required={edit ? false : true}
                id="package_name"
                placeholder=""
                defaultValue={edit ? details.package_name : null}
                md={3}
              />
              <InputAtom
                readOnly={false}
                register={register}
                errors={errors}
                type="date"
                label="Delivery Date"
                required={edit ? false : true}
                id="deliveryDate"
                placeholder=""
                defaultValue={edit ? details.deliveryDate : null}
                md={3}
              />
              <InputAtom
                readOnly={false}
                register={register}
                errors={errors}
                label="Remarks"
                required={edit ? false : true}
                id="remarks"
                placeholder=""
                defaultValue={edit ? details.remarks : null}
                md={6}
              />
            </Row>

            <Row className="w-100 p-0 m-0">
              <MainTitle>Order Details</MainTitle>
              <InputAtom
                readOnly={false}
                register={register}
                errors={errors}
                label="Order Generated by"
                required={edit ? false : true}
                id="generated_by"
                placeholder=""
                defaultValue={edit ? details.generated_by : null}
                md={3}
              />
              <InputAtom
                readOnly={false}
                register={register}
                errors={errors}
                label="Reference Number"
                required={edit ? false : true}
                id="reference"
                placeholder=""
                defaultValue={edit ? details.reference : null}
                md={3}
              />
              <InputAtom
                readOnly={false}
                register={register}
                errors={errors}
                label="P.O Number"
                required={edit ? false : true}
                id="po_number"
                placeholder=""
                defaultValue={edit ? details.po_number : null}
                md={3}
              />
              <InputAtom
                readOnly={false}
                register={register}
                errors={errors}
                label="P.I Number"
                required={edit ? false : true}
                id="piNumber"
                placeholder=""
                defaultValue={edit ? details.piNumber : null}
                md={3}
              />
              <DocInputAtom
                label="Eway Bill"
                setDocFile={setEwayDocFile}
                docFile={ewayDocFile}
              />
              <DocInputAtom
                label="D.C Document"
                setDocFile={setDcDocFile}
                docFile={dcDocFile}
              />
              <DocInputAtom
                label="Courier Document"
                setDocFile={setCourierDocFile}
                docFile={courierDocFile}
              />
              <DocInputAtom
                label="Packaging List"
                setDocFile={setPackagingDocFile}
                docFile={packagingDocFile}
              />
            </Row>
          </Container>
          <AddItemsContainer>
            <Container>
              <div className={classes.table}>
                <MainTitle>Add Items</MainTitle>
              </div>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.thead} align="center">
                      #
                    </TableCell>
                    <TableCell className={classes.thead} align="center">
                      Item
                    </TableCell>
                    <TableCell className={classes.thead} align="center">
                      Available Qty.
                    </TableCell>
                    <TableCell className={classes.thead} align="center">
                      Quantity
                    </TableCell>
                    <TableCell className={classes.thead} align="center">
                      No. of Boxes
                    </TableCell>
                    {edit ? (
                      <TableCell className={classes.thead} align="center">
                        Pending Qty.
                      </TableCell>
                    ) : (
                      <></>
                    )}
                    <TableCell
                      className={classes.thead}
                      align="center"
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fields.map((item, index) => {
                    console.log(details);
                    return (
                      <TableRow key={item.id}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">
                          <select
                            name={`item[${index}].name`}
                            defaultValue={
                              edit
                                ? `${details.item[index].id}`
                                : `${item.name}`
                            }
                            {...register(`item.${index}.name`)}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setValue(`item.${index}.code`, e.target.value);
                            }}
                          >
                            {products.map((product) => {
                              if (edit && details.item[index].id == product.id)
                                return (
                                  <option selected value={product.id}>
                                    {product.name}
                                  </option>
                                );
                              else
                                return (
                                  <option value={product.id}>
                                    {product.name}
                                  </option>
                                );
                            })}
                          </select>
                        </TableCell>
                        <TableCell align="center">
                          <TableInput
                            style={{ border: "none" }}
                            name={`item[${index}].code`}
                            defaultValue={
                              edit
                                ? `${details.item[index].code}`
                                : `${item.code}`
                            }
                            {...register(`item.${index}.code`)}
                          />
                        </TableCell>

                        <TableCell align="center">
                          <TableInput
                            name={`item[${index}].quantity`}
                            defaultValue={
                              edit
                                ? `${details.item[index].quantity}`
                                : `${item.quantity}`
                            }
                            {...register(`item.${index}.quantity`)}
                          ></TableInput>
                        </TableCell>
                        <TableCell align="center">
                          <TableInput
                            // onInputCapture={(e) => {
                            //   console.log(e.target.value);
                            //   // setValue(`item.${index}.pending`, )
                            //   console.log(formState);
                            // }}
                            name={`item[${index}].sent`}
                            defaultValue={
                              edit
                                ? `${details.item[index].sent}`
                                : `${item.sent}`
                            }
                            {...register(`item.${index}.sent`)}
                          ></TableInput>
                        </TableCell>
                        {edit ? (
                          <TableCell align="center">
                            <TableInput
                              readOnly
                              name={`item[${index}].pending`}
                              defaultValue={
                                edit
                                  ? `${details.item[index].pending}`
                                  : `${item.pending}`
                              }
                              {...register(`item.${index}.pending`)}
                            ></TableInput>
                          </TableCell>
                        ) : (
                          <></>
                        )}

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
            <div className="text-center mt-lg-5 mb-lg-5 mb-3">
              <Button
                outline
                onClick={(e) => {
                  append({
                    code: "-",
                    name: "",
                    quantity: 0,
                    sent: 0,
                    pending: 0,
                  });
                  e.preventDefault();
                }}
              >
                + Add Item
              </Button>
            </div>
          </AddItemsContainer>

          {/* Hide this part */}
          <div className="text-center my-lg-5 d-none">
            <SubmitButton
              type="submit"
              ref={SubmitButtonRef}
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

const Container = styled.div`
  padding: 0 50px;
  @media only screen and (max-width: 1000px) {
    padding: 0;
  }
`;

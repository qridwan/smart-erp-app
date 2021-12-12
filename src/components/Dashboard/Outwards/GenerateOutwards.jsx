import React, { useEffect, useRef, useState, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { useFieldArray, useForm } from "react-hook-form";
import styled from "styled-components";
import {
  AddItemContainer,
  AddItemsContainer,
  addTableStyles,
  Button,
  InputDiv,
  Label,
  MainTitle,
  Select,
  SubmitButton,
  TableInput,
} from "../../../styles/styles";
// import { ReactComponent as IndiaIcon } from "../../../Assets/Icons/india.svg";
import { ReactComponent as DeleteIcon } from "../../../Assets/Icons/delete.svg";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { scrollToRef } from "../../../ScrollTop";
import { UserContext } from "../../../context/UserProvider";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TopbarAtom from "../../../atoms/TopbarAtom";
import InputAtom from "../../../atoms/InputAtom";
import DocInputAtom from "../../../atoms/DocInputAtom";
import GetInventoryItems from "../../../Api/GetInventoryItems";
import GetClients from "../../../Api/GetClients";
import GetProducts from "../../../Api/GetProducts";
import SetOutwards from "../../../Api/SetOutwards";
import UpdateOutwards from "../../../Api/UpdateOutwards";

const GenerateOutwards = ({ setShow, details, setDetails }) => {
  const classes = addTableStyles();
  const topbarRef = useRef(null);
  const SubmitButtonRef = useRef(null);
  const [ewayDocFile, setEwayDocFile] = useState("");
  const [dcDocFile, setDcDocFile] = useState("");
  const [courierDocFile, setCourierDocFile] = useState("");
  const [packagingDocFile, setPackagingDocFile] = useState("");
  const user = useContext(UserContext);
  const [ewayDocURL, setEwayDocURL] = useState(``);
  const [dcDocURL, setDcDocURL] = useState(``);
  const [courierDocURL, setCourierDocURL] = useState(``);
  const [packagingDocURL, setPackagingDocURL] = useState(``);
  const [agencyName, setAgencyName] = useState("");
  const [client] = useState({});

  // const [prodQuantity, setProdQuantity] = useState({});
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
  const edit = Boolean(details.info === "edit");
  const { inventoryItems } = GetInventoryItems();
  const { clients } = GetClients();
  const { products } = GetProducts();

  useEffect(() => {
    scrollToRef(topbarRef);
    if (edit) {
      setAgencyName(details.agency);
      setEwayDocURL(details.ewayBill);
      setDcDocURL(details.dcDocument);
      setCourierDocURL(details.courierDoc);
      setPackagingDocURL(details.packagingList);
      append(details.item);
    }
    return () => setDetails(``);
  }, []);

  // OUT ORDER SUBMIT FORM
  const onSubmit = (data) => {
    data[`ewayBill`] = ewayDocURL;
    data[`dcDocument`] = dcDocURL;
    data[`courierDoc`] = courierDocURL;
    data[`packagingList`] = packagingDocURL;
    !edit
      ? SetOutwards({ ...data, agency: agencyName, status: "intransit" })
      : UpdateOutwards(
          { ...data, agency: agencyName, key: details.key },
          details.key
        );
    setShow("outwardsTable");
    reset();
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
                  defaultValue={edit ? client : ""}
                  renderOption={(option) => (
                    <React.Fragment>
                      <span>{option.name}</span>
                    </React.Fragment>
                  )}
                  // PREFILLS DATA BASED ON CLIENT'S INFO
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setAgencyName(newValue.name);
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
                      setAgencyName("");
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
              {edit && (
                <Col md={3} xs={12}>
                  <InputDiv>
                    <Label>Update Status</Label>
                    <Select
                      defaultValue={edit ? details.transport : null}
                      {...register("status")}
                    >
                      <option value=""> </option>
                      <option value="intransit">In-Transit</option>
                      <option value="delivered">Delivered</option>
                    </Select>
                  </InputDiv>
                </Col>
              )}
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
              {/* <InputAtom
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
              /> */}
              <DocInputAtom
                label="Eway Bill"
                setDocFile={setEwayDocFile}
                docFile={ewayDocFile}
                setDocUrl={setEwayDocURL}
              />
              <DocInputAtom
                label="D.C Document"
                setDocFile={setDcDocFile}
                docFile={dcDocFile}
                setDocUrl={setDcDocURL}
              />
              <DocInputAtom
                label="Courier Document"
                setDocFile={setCourierDocFile}
                docFile={courierDocFile}
                setDocUrl={setCourierDocURL}
              />
              <DocInputAtom
                label="Packaging List"
                setDocFile={setPackagingDocFile}
                docFile={packagingDocFile}
                setDocUrl={setPackagingDocURL}
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
                    return (
                      <TableRow key={item.id}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">
                          <select
                            name={`item[${index}].name`}
                            {...register(`item.${index}.name`)}
                            onChange={(e) => {
                              let sItem = products.find(
                                (pd) => pd.item_name === e.target.value
                              );
                              setValue(
                                `item.${index}.quantity`,
                                sItem.quantity
                              );
                              setValue(`item.${index}.code`, sItem.code);
                            }}
                          >
                            {products.map((item, index) => {
                              if (
                                edit &&
                                details?.item[index]?.id === inventoryItems.code
                              )
                                return (
                                  <option
                                    key={item.item_name}
                                    selected
                                    value={item.item_name}
                                  >
                                    {item.item_name}
                                  </option>
                                );
                              else
                                return (
                                  <option value={item.item_name}>
                                    {item.item_name}
                                  </option>
                                );
                            })}
                          </select>
                        </TableCell>
                        <TableCell align="center">
                          <TableInput
                            style={{ border: "none" }}
                            name={`item[${index}].quantity`}
                            // defaultValue={
                            //   edit ? `${details.item[index].quantity}` : ``
                            // }
                            {...register(`item.${index}.quantity`)}
                          />
                        </TableCell>

                        <TableCell align="center">
                          <TableInput
                            name={`item[${index}].sent`}
                            // defaultValue={
                            //   edit ? `${details?.item[index]?.sent}` : 0
                            // }
                            {...register(`item.${index}.sent`)}
                          ></TableInput>
                        </TableCell>
                        <TableCell align="center">
                          <TableInput
                            // onInputCapture={(e) => {
                            //   console.log(e.target.value);
                            //   // setValue(`item.${index}.pending`, )
                            //   console.log(formState);
                            // }}
                            name={`item[${index}].box`}
                            defaultValue={
                              edit
                                ? `${details?.item[index]?.box}`
                                : `${item.box}`
                            }
                            {...register(`item.${index}.box`)}
                          ></TableInput>
                        </TableCell>
                        {/* {edit ? (
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
                        )} */}

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
                    box: 0,
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

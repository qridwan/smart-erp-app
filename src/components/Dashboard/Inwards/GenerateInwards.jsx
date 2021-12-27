/* eslint-disable array-callback-return */
import { makeStyles, TableBody } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Table, TableCell, TableHead, TableRow } from "@material-ui/core";
import React, { useEffect, useState, useContext, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { useFieldArray, useForm } from "react-hook-form";
import styled from "styled-components";
import { ReactComponent as DeleteIcon } from "../../../Assets/Icons/delete.svg";
import SetInwards from "../../../Api/SetInwards";
import UpdateInwards from "../../../Api/UpdateInwards";
import {
  AddItemContainer,
  InputDiv,
  Label,
  MainTitle,
  Select,
  SubmitButton,
  TableContainer,
  TableInput,
  DemoItemInput,
} from "../../../styles/styles";
import { UserContext } from "../../../context/UserProvider";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TopbarAtom from "../../../atoms/TopbarAtom";
import InputAtom from "../../../atoms/InputAtom";
import DocInputAtom from "../../../atoms/DocInputAtom";
import GetClients from "../../../Api/GetClients";
import GetOutwards from "../../../Api/GetOutwards";
import GetInwards from "../../../Api/GetInwards";
import GetInventoryItems from "../../../Api/GetInventoryItems";
import { ref, update } from "firebase/database";
import { db } from "../../../firebase";
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
  const { agency, item, auditStatus } = details;
  const topbarRef = useRef(null);
  const SubmitButtonRef = useRef(null);
  const user = useContext(UserContext);
  const [inwardDocFile, setInwardDocFile] = useState("");
  const [courierDocFile, setCourierDocFile] = useState("");
  const [inwardImageFile, setInwardImageFile] = useState("");
  const [courierDocURL, setCourierDocURL] = useState("");
  const [inwardDocURL, setInwardDocURL] = useState("");
  const [uploadImageFile, setUploadImageFile] = useState("");
  const classes = useStyles();
  const edit = Boolean(details.info === "edit");
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
    if (edit) {
      append(item);
      setAgency(agency);
      setCourierDocURL(details.courierDocument);
      setInwardDocURL(details.inwardDocument);
      setUploadImageFile(details.uploadImage);
    }
    return () => setDetails(``);
  }, []);
  const { clients } = GetClients();
  const { outwards } = GetOutwards();
  const { inwards } = GetInwards();
  const { inventoryItems } = GetInventoryItems();
  const [agencyName, setAgency] = useState("");
  const status = watch("auditStatus");

  const onSubmit = (data) => {
    data["agency"] = agencyName;
    data[`inwardDocument`] = inwardDocURL ? inwardDocURL : "-";
    data[`courierDocument`] = courierDocURL ? courierDocURL : "-";
    data[`uploadImage`] = uploadImageFile ? uploadImageFile : "-";
    let total = 0;
    data.item.forEach((item) => {
      total = total + parseInt(item.quantity);
    });
    data["total"] = total;
    data["item"] = data.item.map((item) => {
      inventoryItems.map((product) => {
        if (product.name === item.name) {
          item["id"] = product.id;
        }
      });
      return item;
    });

    data.item.forEach((item) => {
      const prevItem = inventoryItems.find((prod) => {
        if (prod.code === item.item_code) {
          return prod;
        }
        return undefined;
      });
      const updates = {};
      let updatedData = {};
      if (edit) {
        const existingItem = details.item.find(
          (item) => item.item_code === prevItem.code
        );
        console.log("🚀 ~ data.item.forEach ~ existingItem", {
          existingItem,
          dItem: details.item,
        });
        if (existingItem) {
          if (+existingItem.received > +item.received) {
            const diffQty = +existingItem.received - +item.received;
            updatedData = {
              ...prevItem,
              onHand: +prevItem?.onHand + diffQty,
              yetReceive:
                prevItem?.yetReceive && +prevItem.yetReceive - diffQty,
            };
          } else if (+existingItem.received < +item.received) {
            const diffQty = +item.received - +existingItem.received;
            updatedData = {
              ...prevItem,
              onHand: +prevItem?.onHand - diffQty,
              yetReceive:
                prevItem?.yetReceive && +prevItem.yetReceive + diffQty,
            };
          } else if (+existingItem.received === +item.received) {
            updatedData = {
              ...prevItem,
              onHand: +prevItem?.onHand,
              yetReceive: +prevItem?.yetReceive,
            };
          }
        } else {
          updatedData = {
            ...prevItem,
            onHand: +prevItem?.onHand - +item.received,
            yetReceive: prevItem?.yetReceive
              ? +prevItem.yetReceive + +item.received
              : +item.received,
          };
        }
      } else {
        updatedData = {
          ...prevItem,
          yetReceive:
            prevItem?.yetReceive && prevItem?.yetReceive !== "-"
              ? +prevItem.yetReceive - +item.received
              : 0,
          damaged:
            prevItem?.damaged && prevItem?.damaged !== "-"
              ? parseInt(prevItem?.damaged) +
                parseInt(item?.damaged)
              : parseInt(item?.damaged),
          // not_working:
          //   prevItem?.not_working && prevItem?.not_working !== "-"
          //     ? +prevItem.not_working + +item.not_working
          //     : +item?.not_working,
          onHand: parseInt(prevItem?.onHand) + parseInt(item.received),
        };
      }
      updates["inventory/items/" + item.item_code] = { ...updatedData };
      update(ref(db), updates);

      // console.log("🚀 ~ data.item.forEach ~ item", { prevItem, item, updates });
      // console.log("🚀 ~ data.item.forEach ~ item", item, prevItem);
    });

    !edit
      ? SetInwards(data)
      : UpdateInwards(
          {
            ...data,
            key: details.key,
            receivedDate: data.receivedDate.toString(),
          },
          details.key
        );

    setShow("inwardsTable");
    reset();
    // console.log(data);
  };

  //FOR AUTO GENERATING AGENCY ITEMS
  const handleAgencyItems = (agencyName) => {
    const filteredOutwardsAgency = outwards.filter(
      (obj) => obj.agency === agencyName
    );

    const filteredInwardsAgency = inwards.filter(
      (obj) => obj.agency === agencyName
    );
    remove();
    const inwardsFieldsArray = [];
    filteredInwardsAgency.forEach((obj) => {
      obj.item.forEach((itm) => {
        const presentOnFields = inwardsFieldsArray.find(
          (obj) => obj.name === itm.name
        );
        const indexOfDoubleItem = inwardsFieldsArray.findIndex(
          (obj) => obj.name === itm.name
        );
        if (presentOnFields) {
          inwardsFieldsArray.splice(indexOfDoubleItem, 1);
          inwardsFieldsArray.push({
            ...presentOnFields,
            quantity: Number(itm.received) + Number(presentOnFields.quantity),
          });
        } else
          inwardsFieldsArray.push({
            name: itm.name,
            quantity: Number(itm.received),
          });
      });
    });

    const outwardsFieldsArray = [];
    filteredOutwardsAgency.forEach((obj) => {
      obj.item.forEach((itm) => {
        const presentOnFields = outwardsFieldsArray.find(
          (obj) => obj.name === itm.name
        );
        const indexOfDoubleItem = outwardsFieldsArray.findIndex(
          (obj) => obj.name === itm.name
        );

        if (presentOnFields) {
          outwardsFieldsArray.splice(indexOfDoubleItem, 1);
          outwardsFieldsArray.push({
            ...presentOnFields,
            quantity: Number(itm.sent) + Number(presentOnFields.quantity),
            item_code: itm.code,
            sent: itm.sent,
          });
        } else
          outwardsFieldsArray.push({
            name: itm.name,
            quantity: Number(itm.sent),
            item_code: itm.code,
            sent: itm.sent,
          });
      });
    });

    const finalFields = [];
    outwardsFieldsArray.forEach((out_object, i) => {
      const inw_object = inwardsFieldsArray.find(
        (inward) => inward.name === out_object.name
      );
      if (inw_object) {
        const qty = Number(out_object.quantity) - Number(inw_object.quantity);
        qty > 0 &&
          finalFields.push({
            name: inw_object.name,
            quantity: qty,
            item_code: out_object.item_code,
            sent: out_object.sent,
          });
      } else finalFields.push(out_object);
    });
    append(finalFields);
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
                  defaultValue={edit ? agency : null}
                  renderOption={(option) => (
                    <React.Fragment>
                      <span>{option.name}</span>
                    </React.Fragment>
                  )}
                  // PREFILLS DATA BASED ON CLIENT'S INFO
                  onChange={(event, newValue) => {
                    if (newValue) {
                      handleAgencyItems(newValue.name);
                      setAgency(newValue.name);
                      setValue("generatedBy", user.email);
                      setValue("receiver", newValue.supervisor);
                      setValue("email", newValue.email);
                      setValue("generated_by", user.email);
                      setValue("phone_number", newValue.phone);
                      setValue("agencyAdress", newValue.address);
                      setValue("city", newValue.city);
                      setValue("district", newValue.district);
                      setValue("state", newValue.state);
                      setValue("pincode", newValue.pincode);
                      setValue("state", newValue.state);
                    } else {
                      setAgency("");
                      setValue("generatedBy", "");
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder={edit ? agency : null}
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
                control={control}
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
                setDocUrl={setInwardDocURL}
              />
              <DocInputAtom
                label="Courier Document"
                setDocFile={setCourierDocFile}
                docFile={courierDocFile}
                setDocUrl={setCourierDocURL}
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
                    defaultValue={edit ? details.recievedLocation : null}
                    {...register("recievedLocation")}
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
                      <TableCell className={classes.thead} align="center">
                        Sent
                      </TableCell>
                      <TableCell className={classes.thead} align="center">
                        Received
                      </TableCell>
                      <TableCell className={classes.thead} align="center">
                        Good Condition
                      </TableCell>
                      <TableCell className={classes.thead} align="center">
                        Damaged
                      </TableCell>
                      <TableCell className={classes.thead} align="center">
                        Yet to receive
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
                            {/* <TableSelect
                              name={`item[${index}].name`}
                              value={`${item.name}`}
                              onChange={(e, newVal) => {}}
                              {...register(`item.${index}.name`)}
                            >
                              {inventoryItems.map((product) => (
                                <option key={product.code} value={product.item_name}>
                                  {product.item_name}
                                </option>
                              ))}
                            </TableSelect> */}
                            <DemoItemInput
                              value={item.name}
                              readOnly
                            ></DemoItemInput>
                          </TableCell>
                          <TableCell align="center">
                            <TableInput
                              type="number"
                              name={`item[${index}].sent`}
                              readOnly
                              defaultValue={`${
                                item.sent ? item.sent : item.sent
                              }`}
                              {...register(`item.${index}.sent`)}
                            ></TableInput>
                          </TableCell>
                          <TableCell align="center">
                            <TableInput
                              type="number"
                              name={`item[${index}].received`}
                              defaultValue={`${
                                item.received ? item.received : item.quantity
                              }`}
                              {...register(`item.${index}.received`)}
                            ></TableInput>
                          </TableCell>
                          <TableCell align="center">
                            <TableInput
                              type="number"
                              name={`item[${index}].good_condition`}
                              defaultValue={`${item.good_condition}`}
                              {...register(`item.${index}.good_condition`, {
                                required: true,
                              })}
                            ></TableInput>
                          </TableCell>
                          <TableCell align="center">
                            <TableInput
                              type="number"
                              name={`item[${index}].damaged`}
                              defaultValue={`${item?.damaged}`}
                              {...register(`item.${index}.damaged`, {
                                required: true,
                              })}
                            ></TableInput>
                          </TableCell>
                          {/* <TableCell align="center">
                            <TableInput
                              type="number"
                              name={`item[${index}].not_working`}
                              defaultValue={`${item.not_working}`}
                              {...register(`item.${index}.not_working`, {
                                required: true,
                              })}
                            ></TableInput>
                          </TableCell> */}
                          <TableCell align="center">
                            <TableInput
                              name={`item[${index}].quantity`}
                              defaultValue={`${item.quantity}`}
                              readOnly
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

              {/* INWARD ADD ITEM BTN */}
              {/* <div className="text-center mt-lg-5 mb-lg-5 mb-3">
                <Button
                  outline
                  onClick={(e) => {
                    e.preventDefault();
                    append({
                      name: "",
                      received: "",
                      good_condition: "",
                      bad_condition: "",
                      not_working: "",
                      quantity: "",
                      code: "",
                    });
                  }}
                >
                  + Add Item
                </Button>
              </div> */}
            </section>

            <Row>
              <Col md={3} xs={12}>
                <InputDiv>
                  <Label>Audit Status</Label>
                  <Select
                    className={
                      status === "pending" ? "text-danger" : "text-success"
                    }
                    defaultValue={edit ? auditStatus : null}
                    {...register("auditStatus")}
                  >
                    <option value="Pending" className="text-dark">
                      Pending
                    </option>
                    <option value="Complete" className="text-dark">
                      Complete
                    </option>
                    <option value="Paid" className="text-dark">
                      Paid
                    </option>
                  </Select>
                </InputDiv>
              </Col>
              <DocInputAtom
                label="Upload Image*"
                setDocFile={setInwardImageFile}
                setDocUrl={setUploadImageFile}
                docFile={inwardImageFile}
                disabled={
                  status === "Complete"
                    ? false
                    : status === "Paid"
                    ? false
                    : true
                }
              />
            </Row>

            <div className="d-none text-center my-md-5">
              <SubmitButton type="submit" ref={SubmitButtonRef} value="Save" />
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

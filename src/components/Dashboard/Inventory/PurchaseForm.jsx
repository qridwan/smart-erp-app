import React, { useEffect, useRef, useState } from "react";
import { Row } from "react-bootstrap";
import { useFieldArray, useForm } from "react-hook-form";
import {
  AddItemContainer,
  AddItemsContainer,
  addTableStyles,
  Button,
  Container,
  MainTitle,
  TableInput,
} from "../../../styles/styles";
import {
  IconButton,
  TableBody,
  TableCell,
  Table,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { onValue, ref } from "@firebase/database";
import { db } from "../../../firebase";
import { ReactComponent as DeleteIcon } from "../../../Assets/Icons/delete.svg";
import { connect } from "react-redux";
import { setShow } from "../../../Redux/actions/renderActions";
import TopbarAtom from "../../../atoms/TopbarAtom";
import InputAtom from "../../../atoms/InputAtom";
import DocInputAtom from "../../../atoms/DocInputAtom";

const PurchaseForm = ({ setShow, show }) => {
  const classes = addTableStyles();
  const [products, setProducts] = useState([]);
  const topbarRef = useRef(null);
  const SubmitButtonRef = useRef(null);
  const [docFile, setDocFile] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    reset,
  } = useForm();
  const onSubmit = (data) => {
    console.log({ data });
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "item",
  });

  useEffect(() => {
    const productsRef = ref(db, "inventory/products");
    onValue(productsRef, (snapshot) => {
      let products = [];
      Object.keys(snapshot.val()).forEach((key) => {
        products.push(snapshot.val()[key]);
      });
      console.log(snapshot.val());
      console.log(products);
      setProducts(products);
      // setProductObj(snapshot.val());
    });
  }, []);
  return (
    <div>
      <TopbarAtom
        title="Add Purchase"
        topRef={topbarRef}
        buttonRef={SubmitButtonRef}
        buttonTitle="Save"
        goBack="inventoryTable"
      />
      <AddItemContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <Row className="w-100 p-0 m-0">
              <InputAtom
                register={register}
                errors={errors}
                label="Order No"
                required={true}
                id="order_no"
                defaultValue=""
                placeholder=""
                md={3}
              />
              <InputAtom
                register={register}
                errors={errors}
                label="P.O Number"
                required={true}
                id="po_number"
                placeholder=""
                defaultValue=""
                md={3}
              />
              <InputAtom
                register={register}
                errors={errors}
                label="Supplier"
                required={true}
                id="supplier"
                placeholder=""
                defaultValue=""
                md={3}
              />
              <InputAtom
                register={register}
                errors={errors}
                label="Purchase Date"
                required={true}
                id="purchase_date"
                placeholder=""
                defaultValue=""
                type="date"
                md={3}
              />
              <InputAtom
                register={register}
                errors={errors}
                label="Remarks"
                required={false}
                id="remarks"
                placeholder=""
                defaultValue=""
                md={6}
              />
              <DocInputAtom
                label="Delivery Proof"
                setDocFile={setDocFile}
                docFile={docFile}
              />
              {/* <Col md={3} xs={12}>
                <InputDiv>
                  <Label>Delivery Proof</Label>
                  <UploadButton
                    outline
                    onClick={(e) => {
                      e.preventDefault();
                      handleDocClick();
                    }}
                  >
                    <span>{docFile ? docFile.name : "Upload Document"}</span>
                    <UploadIcon>
                      <img src={uploadIcon} alt="up arrow" />
                    </UploadIcon>
                  </UploadButton>
                  <UploadInput
                    ref={hiddenDocInput}
                    className="px-3 py-2"
                    onChange={handleDocInputChange}
                    style={{ display: "none" }}
                    type="file"
                  />
                </InputDiv>
              </Col> */}
            </Row>
          </Container>

          <AddItemsContainer>
            <Container className={classes.table}>
              <div>
                <MainTitle>Add Items</MainTitle>
              </div>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.thead} align="center">
                      #
                    </TableCell>
                    <TableCell className={classes.thead} align="center">
                      Item
                    </TableCell>
                    <TableCell className={classes.thead} align="center">
                      Quantity
                    </TableCell>

                    <TableCell
                      className={classes.thead}
                      align="center"
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fields.map((item, index) => {
                    console.log({ item });
                    return (
                      <TableRow key={item.id}>
                        <TableCell align="center">{index + 1}</TableCell>

                        <TableCell align="center">
                          <select
                            name={`item[${index}].name`}
                            defaultValue={`${item.name}`}
                            {...register(`item.${index}.name`)}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setValue(`item.${index}.code`, e.target.value);
                            }}
                          >
                            {products.map((product) => {
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
                            name={`item[${index}].quantity`}
                            //   defaultValue={
                            //     edit
                            //       ? `${details.item[index].quantity}`
                            //       : `${item.quantity}`
                            //   }
                            {...register(`item.${index}.quantity`)}
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
              <div className="text-center my-lg-5">
                <Button
                  outline
                  onClick={(e) => {
                    // let genCode = Math.floor(Math.random() + Math.random() * 10000);
                    append({
                      code: "-",
                      name: "",
                      quantity: 0,
                    });
                    e.preventDefault();
                  }}
                >
                  + Add Item
                </Button>
              </div>
            </Container>
          </AddItemsContainer>

          <input ref={SubmitButtonRef} type="submit" className="d-none"></input>
        </form>
      </AddItemContainer>
    </div>
  );
};
const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  setShow: setShow,
};
export default connect(mapStateToProps, mapDispatchToProps)(PurchaseForm);

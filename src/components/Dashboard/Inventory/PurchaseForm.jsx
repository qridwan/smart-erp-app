import React, { useContext, useEffect, useRef, useState } from "react";
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
import { ReactComponent as DeleteIcon } from "../../../Assets/Icons/delete.svg";
import { connect } from "react-redux";
import { setShow } from "../../../Redux/actions/renderActions";
import TopbarAtom from "../../../atoms/TopbarAtom";
import InputAtom from "../../../atoms/InputAtom";
import DocInputAtom from "../../../atoms/DocInputAtom";
import GetItems from "../../../Api/GetItems";
import { UserContext } from "../../../context/UserProvider";
import SetProducts from "../../../Api/SetProducts";
import GetProducts from "../../../Api/GetProducts";
import SetPurchased from "../../../Api/SetPurchased";

const PurchaseForm = ({ setShow, show, item, setItem }) => {
  console.log("🚀 ~ PurchaseForm ~ item", item);
  const classes = addTableStyles();
  const edit = Boolean(item.info === "edit");
  const view = Boolean(item.info === "view");
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

  const { items } = GetItems();
  const { products } = GetProducts();
  const user = useContext(UserContext);
  useEffect(() => {
    edit &&
      item.item.forEach((pd) =>
        append({
          code: pd.code,
          item_name: pd.item_name,
          quantity: pd.quantity,
        })
      );
    return () => setItem(``);
  }, []);
  const onSubmit = (data) => {
    const inputProducts = [];
    const purchasedProduct = {
      ...data,
      lastEditedBy: user.email,
    };
    data.item.forEach((product) => {
      const prevProduct = products.find(
        (pd) => pd.item_name === product.item_name
      );
      const prevQuantity = prevProduct?.quantity ? prevProduct.quantity : 0;
      const item = items.find((it) => it.item_name === product.item_name);
      const prod = {
        item_name: product?.item_name,
        code: item?.code,
        photos: item?.photos,
        quantity: Number(prevQuantity) + Number(product?.quantity),
        poNo: data.po_number,
        purchasedDate: data.purchase_date,
        remarks: data.remarks,
        supplier: data.supplier,
        lastEditedBy: user.email,
      };
      inputProducts.push(prod);
    });
    SetPurchased(purchasedProduct);
    SetProducts(inputProducts);
    alert("product successfully posted");
    reset();
    setShow("inventoryTable");
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "item",
  });

  // useEffect(() => {
  //   const productsRef = ref(db, "inventory/products");
  //   onValue(productsRef, (snapshot) => {
  //     let products = [];
  //     Object.keys(snapshot.val()).forEach((key) => {
  //       products.push(snapshot.val()[key]);
  //     });
  //     setProducts(products);
  //     console.log("🚀 ~ onValue ~ products", { products });
  //     // setProductObj(snapshot.val());
  //   });
  // }, []);
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
                defaultValue={edit || view ? item.order_no : ""}
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
                defaultValue={edit || view ? item.po_number : ""}
                md={3}
              />
              <InputAtom
                register={register}
                errors={errors}
                label="Supplier"
                required={true}
                id="supplier"
                placeholder=""
                defaultValue={edit || view ? item.supplier : ""}
                md={3}
              />
              <InputAtom
                register={register}
                errors={errors}
                label="Purchase Date"
                required={true}
                id="purchase_date"
                placeholder=""
                defaultValue={edit || view ? item.purchase_date : ""}
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
                defaultValue={edit || view ? item.remarks : ""}
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
                      <TableRow key={item.code}>
                        <TableCell align="center">{index + 1}</TableCell>

                        <TableCell align="center">
                          <select
                            name={`item[${index}].item_name`}
                            defaultValue={`${item.item_name}`}
                            {...register(`item.${index}.item_name`)}
                            onChange={(e) => {
                              setValue(`item.${index}.code`, e.target.value);
                            }}
                          >
                            {items.map((item) => {
                              return (
                                <option value={item?.item_name}>
                                  {item.item_name}
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
                      item_name: "",
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

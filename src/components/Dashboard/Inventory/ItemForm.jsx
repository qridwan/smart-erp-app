import { TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import moment from "moment";
import IPcamera from "../../../Assets/Images/ipCamera.png";
import React, { useContext, useRef, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  AddItemContainer,
  ApplyFormInput,
  Container,
  Error,
  ImageInput,
  ImageInputArea,
  InputDiv,
  inventoryStyles,
  Label,
  MainTitle,
  SubmitButton,
  TableInput,
  UploadButton,
  UploadInput,
} from "../../../styles/styles";
import { UserContext } from "../../../context/UserProvider";

const ItemForm = () => {
  const classes = inventoryStyles();
  const [selectedItems, setSelectedItems] = useState([]);
  const [goto, setGoto] = useState("addItem");
  const [imgFile, setImgFile] = useState("");
  const [docFile, setDocFile] = useState("");
  const [editImage, setEditImage] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // HANDLE ADD PRODUCT SUBMIT
  const onSubmit = (data) => {
    // console.log(data, { imgFile }, { docFile });
    // const productsRef = ref(db, "inventory/products");
    // productsRef.child(`${data.productNo}`).update({
    //   date: data.date,
    //   name: data.item_name,
    //   available: data.item_quantity,
    //   poNo: data.po_number,
    //   receivedDate: data.received_date,
    //   remarks: data.remarks,
    //   supplier: data.supplier,
    //   id: data.productNo,
    //   condition: data.condition,
    //   lastEditedBy: user.email,
    //   reserved: data.reserved ? data.reserved : 0,
    //   onHand: data.onHand ? data.onHand : 0,
    // });
    // if (imgFile) {
    //   const uploadTask = bucket.ref(`/pictures/${imgFile.name}`).put(imgFile);
    //   uploadTask.on(
    //     "state_changed",
    //     (snapShot) => {},
    //     (err) => {
    //       console.log(err);
    //     },
    //     () => {
    //       bucket
    //         .ref("pictures")
    //         .child(imgFile.name)
    //         .getDownloadURL()
    //         .then((fireBaseUrl) => {
    //           console.log(fireBaseUrl);
    //           productsRef.child(`${data.productNo}`).update({
    //             photos: fireBaseUrl,
    //           });
    //         });
    //     }
    //   );
    // }
    // if (docFile) {
    //   const uploadTask = bucket.ref(`/pictures/${docFile.name}`).put(docFile);
    //   uploadTask.on(
    //     "state_changed",
    //     (snapShot) => {},
    //     (err) => {
    //       console.log(err);
    //     },
    //     () => {
    //       bucket
    //         .ref("pictures")
    //         .child(docFile.name)
    //         .getDownloadURL()
    //         .then((fireBaseUrl) => {
    //           const docsRef = ref(
    //             db,
    //             `inventory/products/${data.productNo}/docs`
    //           );
    //           docsRef.push({
    //             name: docFile.name,
    //             url: fireBaseUrl,
    //             date: moment().format("DD-MM-YY"),
    //           });
    //         });
    //     }
    //   );
    // }
    // console.log("new product added successfully");
    // setGoto("table");
    // reset();
  };
  const user = useContext(UserContext);
  const hiddenImageInput = useRef(null);
  const hiddenDocInput = useRef(null);
  const handleClick = (param) => {
    if (param === "image") {
      hiddenImageInput.current.click();
    } else {
      hiddenDocInput.current.click();
    }
  };
  const handleImgInputChange = (e) => {
    const imgFileUploaded = e.target.files[0];
    setImgFile(imgFileUploaded);
    // setImgFileError("");
  };
  const handleDocInputChange = (e) => {
    const docFileUploaded = e.target.files[0];
    setDocFile(docFileUploaded);
    // setDocFileError("");
  };
  const [files, setfiles] = useState([]);

  const handleEdit = async () => {
    console.log(selectedItems);
    const product = selectedItems[0];
    reset({
      date: product.date,
      item_name: product.name,
      item_quantity: product.available,
      po_number: product.poNo,
      received_date: product.receivedDate,
      remarks: product.remarks,
      supplier: product.supplier,
      productNo: product.id,
      condition: product.condition,
      reserved: product.reserved,
      onHand: product.onHand,
    });
    let files = [];
    if (product.docs) {
      Object.keys(product.docs).map((obj) => {
        files.push(product.docs[obj]);
      });
    }
    console.log(files);
    setfiles(files);
    setEditImage(product.photos);
    setGoto("addItem");
    setSelectedItems([]);
  };

  return (
    <div>
      <AddItemContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={3} xs={12}>
              <InputDiv>
                <Label style={{ width: "70%", margin: "0 auto" }}>
                  Item Image
                </Label>
                <ImageInputArea onClick={() => handleClick("image")}>
                  <ImageInput
                    className="img-fluid"
                    src={editImage == "" ? IPcamera : editImage}
                    alt=""
                  />
                </ImageInputArea>
                <div className="text-center">
                  <UploadButton
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick("image");
                    }}
                  >
                    {imgFile ? imgFile.name : "+ Upload Image"}
                  </UploadButton>
                  <input
                    ref={hiddenImageInput}
                    onChange={handleImgInputChange}
                    style={{ display: "none" }}
                    type="file"
                  />
                </div>
              </InputDiv>
            </Col>
            <Col md={9} xs={12} className="" style={{ paddingRight: "30px" }}>
              <Row className="w-100 justify-content-center m-0">
                <Col md={4} xs={12}>
                  <InputDiv>
                    <Label>Item Name</Label>
                    <ApplyFormInput
                      placeholder=""
                      {...register("item_name", { required: true })}
                    />
                    {errors.item_name && <Error>Item name is required</Error>}
                  </InputDiv>
                </Col>
                <Col md={4} xs={12}>
                  <InputDiv>
                    <Label>Item Qty.</Label>
                    <ApplyFormInput
                      placeholder=""
                      {...register("item_quantity", {
                        required: true,
                        pattern: /^\d+$/i,
                      })}
                    />
                    {errors.item_quantity && (
                      <Error>Give a valid quantity</Error>
                    )}
                  </InputDiv>
                </Col>
                <Col md={4} xs={12}>
                  <InputDiv>
                    <Label>P.O. Number</Label>
                    <ApplyFormInput
                      placeholder=""
                      {...register("po_number", {
                        required: true,
                        pattern: /([1-9]\d*)/g,
                      })}
                    />
                    {errors.po_number && (
                      <Error>Post office number is required</Error>
                    )}
                  </InputDiv>
                </Col>
              </Row>

              <Row className="w-100 justify-content-center m-0">
                <Col md={4} xs={12}>
                  <InputDiv>
                    <Label>Reserved Qty</Label>
                    <ApplyFormInput
                      placeholder=""
                      {...register("reserved", { required: false })}
                    />
                    {errors.item_name && <Error>Item name is required</Error>}
                  </InputDiv>
                </Col>
                <Col md={4} xs={12}>
                  <InputDiv>
                    <Label>On Hand Qty</Label>
                    <ApplyFormInput
                      placeholder=""
                      {...register("onHand", {
                        required: false,
                      })}
                    />
                    {errors.item_quantity && (
                      <Error>Give a valid quantity</Error>
                    )}
                  </InputDiv>
                </Col>
                <Col md={4} xs={12}>
                  <InputDiv>
                    <Label>Condition</Label>
                    <ApplyFormInput
                      placeholder=""
                      {...register("condition", {
                        required: true,
                      })}
                    />
                    {errors.po_number && <Error>Condition is required</Error>}
                  </InputDiv>
                </Col>
              </Row>

              <Row className="w-100 justify-content-center m-0">
                <Col md={4} xs={12}>
                  <InputDiv>
                    <Label>Date</Label>
                    <ApplyFormInput
                      placeholder=""
                      type="date"
                      {...register("date", { required: true })}
                    />
                    {errors.date && <Error>Date is required</Error>}
                  </InputDiv>
                </Col>
                <Col md={4} xs={12}>
                  <InputDiv>
                    <Label>Supplier Name</Label>
                    <ApplyFormInput
                      placeholder=""
                      {...register("supplier", {
                        required: true,
                      })}
                    />
                    {errors.supplier && (
                      <Error>Supplier name is required</Error>
                    )}
                  </InputDiv>
                </Col>
                <Col md={4} xs={12}>
                  <InputDiv>
                    <Label>Received Date</Label>
                    <ApplyFormInput
                      type="date"
                      placeholder=""
                      {...register("received_date", {
                        required: true,
                      })}
                    />
                    {errors.received_date && (
                      <Error>Received date number is required</Error>
                    )}
                  </InputDiv>
                </Col>
              </Row>

              <Row className="w-100  m-0">
                {/* <Col md={6} xs={12}>
                    <InputDiv>
                      <Label>Warehouse</Label>
                      <Select
                        {...register("warehouse", {
                          required: false,
                        })}
                      >
                        <option className="d-none" value=""></option>
                        <option value="ware-1"> WareHouse-1 </option>
                        <option value="ware-2"> WareHouse-2 </option>
                        <option value="ware-3"> WareHouse-3 </option>
                      </Select>
                    </InputDiv>
                  </Col> */}
                <Col md={6} xs={12}>
                  <InputDiv>
                    <Label>Product Number</Label>
                    <ApplyFormInput
                      placeholder=""
                      {...register("productNo", {
                        required: true,
                      })}
                    />
                    {errors.productNo && (
                      <Error>Product number is required</Error>
                    )}
                  </InputDiv>
                </Col>
                <Col md={6} xs={12}>
                  <InputDiv>
                    <Label>Delivery Proof</Label>
                    <UploadButton
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick("doc");
                      }}
                    >
                      {docFile ? docFile.name : "+ Upload Document"}
                    </UploadButton>
                    <UploadInput
                      ref={hiddenDocInput}
                      className="px-3 py-2"
                      onChange={handleDocInputChange}
                      style={{ display: "none" }}
                      type="file"
                    />
                  </InputDiv>
                </Col>
                <Col md={12} xs={12}>
                  <InputDiv>
                    <Label>Remarks</Label>
                    <ApplyFormInput
                      type="text"
                      placeholder=""
                      {...register("remarks")}
                    />
                  </InputDiv>
                </Col>

                <Col md={12} xs={12}>
                  <Container style={{ padding: "0 0px !important" }}>
                    <MainTitle>Attachments</MainTitle>
                    <Table
                      style={{ width: "100%" }}
                      className={classes.table}
                      aria-label="simple table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell className={classes.thead} align="left">
                            Index
                          </TableCell>
                          <TableCell className={classes.thead} align="left">
                            Date
                          </TableCell>
                          <TableCell className={classes.thead} align="left">
                            File (click to download)
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {files.map((file, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell align="left">{index + 1}</TableCell>
                              {/* <TableCell align="left">
                                  <TableInput
                                    style={{ border: "none" }}
                                    defaultValue={`Attachment ${index}`}
                                  />
                                </TableCell> */}
                              <TableCell align="left">
                                <TableInput
                                  style={{ border: "none" }}
                                  defaultValue={file.date}
                                ></TableInput>
                              </TableCell>
                              <TableCell align="left">
                                <p
                                  style={{ cursor: "pointer" }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    window.open(file.url);
                                  }}
                                >
                                  {file.name}
                                </p>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </Container>
                </Col>

                {
                  // files.map((file, index) => {
                  //   return (
                  //     <Col md={6} xs={12}>
                  //       <Label>{`Attachment${index + 1}`}</Label>
                  //       <UploadButton onClick={(e) => {
                  //         e.preventDefault();
                  //         window.open(file.url);
                  //       }}>
                  //         {
                  //           file.name.length > 25 ? file.name.slice(0, 22) + '...' : file.name
                  //         }
                  //       </UploadButton>
                  //     </Col>
                  //   )
                  // })
                }
              </Row>
            </Col>
          </Row>
          <div className="text-center my-lg-5">
            <SubmitButton type="submit" value="Save" />
          </div>
        </form>
      </AddItemContainer>
    </div>
  );
};

export default ItemForm;

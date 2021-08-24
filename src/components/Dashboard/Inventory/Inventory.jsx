import { DataGrid } from "@material-ui/data-grid";
import React, { useRef, useState, useEffect, useContext } from "react";
import IPcamera from "../../../Assets/Images/ipCamera.png";
import {
  AddItemContainer,
  ApplyFormInput,
  BoldText,
  Button,
  ButtonContainer,
  DeleteButton,
  EditButton,
  Error,
  ImageInput,
  ImageInputArea,
  InputDiv,
  Label,
  Select,
  style,
  SubmitButton,
  TableContainer,
  TableImage,
  TopBar,
  UploadButton,
  UploadInput,
} from "../../../styles/styles";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { removeFromInventory } from "../../../Redux/actions/InventoryActions";
import ModalInventory from "./ModalInventory";


import { db as firebase, bucket, auth } from '../../../firebase';
import { UserContext } from "../../../context/UserProvider";

const columns = [
  {
    field: "photos",
    headerName: "Photos",
    width: 100,
    sortable: true,
    align: "center",
    renderCell: (params) => {
      return (
        <TableImage>
          <img
            src={params.row.photos}
            alt={params.id}
            height="56px"
            width="55px"
          />
        </TableImage>
      );
    },
  },
  {
    field: "name",
    headerName: "Name",
    width: 120,
    sortable: true,
    align: "center",
  },
  {
    field: "id",
    headerName: "SKU",
    align: "center",
    type: "number",
    width: 120,
    sortable: false,
  },
  {
    field: "condition",
    headerName: "Condition",
    width: 120,
    align: "center",
    sortable: true,
  },
  {
    field: "supplier",
    headerName: "Supplier",
    align: "center",
    width: 120,
    sortable: true,
  },
  {
    field: "available",
    headerName: "Available",
    width: 110,
    type: "number",
    align: "center",
    sortable: true,
  },
  {
    field: "reserved",
    headerName: "Reserved",
    width: 130,
    type: "number",
    align: "center",
    sortable: true,
  },
  {
    field: "onHand",
    headerName: "On Hand",
    type: "number",
    width: 110,
    align: "center",
    sortable: true,
  },
];

const Inventory = ({ inventories, removeFromInventory }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [goto, setGoto] = useState("table");
  const [imgFile, setImgFile] = useState("");
  const [docFile, setDocFile] = useState("");
  const [open, setOpen] = useState(false);
  // const [imgFileError, setImgFileError] = useState("");
  // const [docFileError, setDocFileError] = useState("");
  // const [fileUrl, setFileUrl] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm();

  const user = useContext(UserContext); 

  const [products, setProducts] = useState([]);

  useEffect(() => {
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

  }, [goto]);


  // HANDLE ADD PRODUCT SUBMIT
  const onSubmit = (data) => {
    console.log(data, { imgFile }, { docFile });
    const productsRef = firebase.ref("inventory/products");
    if(imgFile) {
      const uploadTask = bucket.ref(`/pictures/${imgFile.name}`).put(imgFile);
      uploadTask.on('state_changed',
        (snapShot) => {
        }, (err) => {
          console.log(err)
        }, () => {
          bucket.ref('pictures').child(imgFile.name).getDownloadURL()
            .then(fireBaseUrl => {
              console.log(fireBaseUrl);
              productsRef.child(`${data.productNo}`).update({
                date: data.date,
                name: data.item_name,
                available: data.item_quantity,
                poNo: data.po_number,
                receivedDate: data.received_date,
                remarks: data.remarks,
                supplier: data.supplier,
                id: data.productNo,
                condition: data.condition,
                photos: fireBaseUrl,
                lastEditedBy: user.email
              });
            })
        })
    }
    else {
      productsRef.child(`${data.productNo}`).update({
        date: data.date,
        name: data.item_name,
        available: data.item_quantity,
        poNo: data.po_number,
        receivedDate: data.received_date,
        remarks: data.remarks,
        supplier: data.supplier,
        id: data.productNo,
        condition: data.condition,
        lastEditedBy: user.email,
        onHand: data.onHand,
        reserved: data.reserved
      });
    }
    

    console.log('new product added successfully');
    setGoto("table");
    reset();
  };


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
  const handleOpen = () => {
    setOpen(true);
  };

  const handleDelete = async () => {
    await removeFromInventory(selectedItems)
    setSelectedItems([])
    handleOpen()
  };

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
    });
    setGoto("addItem");
    setSelectedItems([]);
  }

  return (
    <section>
      <TopBar>
        <div className="d-flex">
          <BoldText> Inventory </BoldText>
          <ButtonContainer
            className={selectedItems.length ? "visible mx-lg-2" : "invisible"}
          >
            <DeleteButton onClick={handleDelete}> Delete </DeleteButton>
            <EditButton
              onClick={handleEdit}
              className={selectedItems.length === 1 ? "visible" : "invisible"}
            >
              Edit
            </EditButton>
          </ButtonContainer>
        </div>

        {goto === "table" ? (
          <Button
            onClick={() => {
              setGoto("addItem");
              setSelectedItems([]);
            }}
          >
            + Add Items
          </Button>
        ) : (
          <Button outline onClick={() => {reset(); setGoto("table")}}>
            View Inventory
          </Button>
        )}
      </TopBar>
      <ModalInventory open={open} setOpen={setOpen} />
      {goto === "table" ? (
        <TableContainer className="overflow-hidden">
          <DataGrid
            rows={products}
            // rows={inventories}
            style={style.table}
            columns={columns}
            pageSize={10}
            rowHeight={65}
            autoPageSize
            autoHeight
            hideFooterSelectedRowCount
            disableColumnMenu
            checkboxSelection
            scrollbarSize={5}
            classes={"MuiDataGrid-columnHeader--alignCenter"}
            onSelectionModelChange={(e) => {
              let selectedItemsIdArray = e;
              let selectedItems = [];
              selectedItemsIdArray.forEach((id) =>
                selectedItems.push(products.find((row) => row.id === id))
              );
              setSelectedItems(selectedItems);
            }}
          />
        </TableContainer>
      ) : (
        <AddItemContainer>
          <form
            onSubmit={handleSubmit(onSubmit)}
          >
            <Row>
              <Col md={3} xs={12}>
                <InputDiv>
                  <Label style={{ width: "70%", margin: "0 auto" }}>
                    Item Image
                  </Label>
                  <ImageInputArea onClick={() => handleClick("image")}>
                    <ImageInput className="img-fluid" src={IPcamera} alt="" />
                  </ImageInputArea>
                  <div className="text-center">
                    <UploadButton onClick={() => handleClick("image")}>
                      + Upload Image
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
                      {errors.po_number && (
                        <Error>Condition is required</Error>
                      )}
                    </InputDiv>
                  </Col>
                </Row>

                <Row className="w-100 justify-content-center m-0">
                  <Col md={4} xs={12}>
                    <InputDiv>
                      <Label>Date</Label>
                      <ApplyFormInput
                        placeholder=""
                        type="datetime"
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
                        type="datetime"
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
                      <UploadButton outline onClick={() => handleClick("doc")}>
                        + Upload Document
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

                </Row>
              </Col>
            </Row>
            <div className="text-center my-lg-5">
              <SubmitButton type="submit" value="Save" />
            </div>
          </form>
        </AddItemContainer>
      )}
    </section>
  );
};

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  removeFromInventory: removeFromInventory,
};
export default connect(mapStateToProps, mapDispatchToProps)(Inventory);

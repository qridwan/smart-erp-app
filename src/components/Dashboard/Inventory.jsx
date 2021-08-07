import { DataGrid } from "@material-ui/data-grid";
import React, { useRef, useState } from "react";
import IPcamera from "../../Assets/Images/ipCamera.png";
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
  style,
  SubmitButton,
  TableContainer,
  TableImage,
  TopBar,
  UploadButton,
  UploadInput,
} from "../../styles/styles";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { removeFromInventory } from "../../Redux/actions/InventoryActions";

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
    field: "sku",
    headerName: "SKU",
    align: "center",
    type: "number",
    width: 120,
    sortable: true,
  },
  {
    field: "condition",
    headerName: "Condition",
    width: 120,
    align: "center",
    sortable: true,
  },
  {
    field: "location",
    headerName: "Location",
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
  // const [imgFileError, setImgFileError] = useState("");
  // const [docFileError, setDocFileError] = useState("");
  // const [fileUrl, setFileUrl] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data, { imgFile }, { docFile });
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
  const handleDelete = () => {
    removeFromInventory(selectedItems);
    setSelectedItems([])
  };

  return (
    <section>
      <TopBar>
        <BoldText> Inventory </BoldText>
        {goto === "table" ? (
          <div className="d-flex">
            <ButtonContainer
              className={selectedItems.length ? "visible" : "invisible"}
            >
              <DeleteButton onClick={handleDelete}> Delete </DeleteButton>
              <EditButton
                className={selectedItems.length === 1 ? "visible" : "invisible"}
              >
                Edit
              </EditButton>
            </ButtonContainer>
            <Button
              onClick={() => {
                setGoto("addItem");
                setSelectedItems([]);
              }}
            >
              + Add Items
            </Button>
          </div>
        ) : (
          <Button outline onClick={() => setGoto("table")}>
            View Inventory
          </Button>
        )}
      </TopBar>

      {goto === "table" ? (
        <TableContainer className="overflow-hidden">
          <DataGrid
            rows={inventories}
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
                selectedItems.push(inventories.find((row) => row.id === id))
              );
              setSelectedItems(selectedItems);
            }}
          />
        </TableContainer>
      ) : (
        <AddItemContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  <Col md={6} xs={12}>
                    <InputDiv>
                      <Label>Location</Label>
                      <ApplyFormInput
                        placeholder=""
                        {...register("location", {
                          required: true,
                        })}
                      />
                      {errors.location && <Error>Location is required</Error>}
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

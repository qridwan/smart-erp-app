import { DataGrid } from "@material-ui/data-grid";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import IPcamera from "../../Assets/Images/ipCamera.png";
import {
  ApplyFormInput,
  BoldText,
  Button,
  Error,
  ImageInput,
  ImageInputArea,
  InputDiv,
  Label,
  SubmitButton,
  TableContainer,
  TableImage,
  TopBar,
  UploadButton,
  UploadInput,
} from "../../styles/styles";
import tablePhoto from "../../Assets/Images/photoCamera.png";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
const columns = [
  {
    field: "photos",
    headerName: "Photos",
    width: 100,
    sortable: false,
    align: "center",
    renderCell: (params) => {
      return (
        <TableImage>
          <img
            src={params.row.photos}
            alt={params.id}
            height="66px"
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
    sortable: false,
    align: "center",
  },
  {
    field: "sku",
    headerName: "SKU",
    align: "center",
    type: "number",
    width: 200,
    sortable: false,
  },
  {
    field: "condition",
    headerName: "Condition",
    width: 120,
    align: "center",
    sortable: false,
  },
  {
    field: "location",
    headerName: "Location",
    align: "center",
    width: 150,
    sortable: false,
  },
  {
    field: "available",
    headerName: "Available",
    width: 120,
    type: "number",
    align: "center",
    sortable: false,
  },
  {
    field: "reserved",
    headerName: "Reserved",
    width: 150,
    type: "number",
    align: "center",
    sortable: false,
  },
  {
    field: "onHand",
    headerName: "On Hand",
    type: "number",
    width: 120,
    align: "center",
    sortable: false,
  },
];

const rows = [
  {
    id: "1",
    photos: tablePhoto,
    name: "Snow",
    sku: "23888998231",
    condition: "New",
    location: "Warehouse1",
    available: 13456,
    reserved: 1300,
    onHand: 453,
  },
  {
    id: "2",
    photos: tablePhoto,
    name: "Snow",
    sku: "23888998231",
    condition: "New",
    location: "Warehouse1",
    available: 13456,
    reserved: 1300,
    onHand: 453,
  },
  {
    id: "3",
    photos: tablePhoto,
    name: "Snow",
    sku: "23888998231",
    condition: "New",
    location: "Warehouse1",
    available: 13456,
    reserved: 1300,
    onHand: 453,
  },
  {
    id: "4",
    photos: tablePhoto,
    name: "Snow",
    sku: "23888998231",
    condition: "New",
    location: "Warehouse1",
    available: 13456,
    reserved: 1300,
    onHand: 453,
  },
  {
    id: "5",
    photos: tablePhoto,
    name: "Snow",
    sku: "23888998231",
    condition: "New",
    location: "Warehouse1",
    available: 13456,
    reserved: 1300,
    onHand: 453,
  },
  {
    id: "6",
    photos: tablePhoto,
    name: "Snow",
    sku: "23888998231",
    condition: "New",
    location: "Warehouse1",
    available: 13456,
    reserved: 1300,
    onHand: 453,
  },
  {
    id: "7",
    photos: tablePhoto,
    name: "Snow",
    sku: "23888998231",
    condition: "New",
    location: "Warehouse1",
    available: 13456,
    reserved: 1300,
    onHand: 453,
  },
];

const Inventory = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [goto, setGoto] = useState("table");
  const [imgFile, setImgFile] = useState("");
  const [docFile, setDocFile] = useState("");
  const [imgFileError, setImgFileError] = useState("");
  const [docFileError, setDocFileError] = useState("");
  // const [fileUrl, setFileUrl] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  console.log("🚀~selectedItems", selectedItems);
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
    setImgFileError("");
  };
  const handleDocInputChange = (e) => {
    const docFileUploaded = e.target.files[0];
    setDocFile(docFileUploaded);
    setDocFileError("");
  };
  return (
    <section>
      <TopBar>
        <BoldText> Inventory </BoldText>
        {goto === "table" ? (
          <Button onClick={() => setGoto("addItem")}>+ Add Items</Button>
        ) : (
          <Button outline onClick={() => setGoto("table")}>
            View Inventory
          </Button>
        )}
      </TopBar>
      <ButtonContainer
        className={selectedItems.length ? "visible" : "invisible"}
      >
        <EditButton> Edit </EditButton>
        <DeleteButton> Delete </DeleteButton>
      </ButtonContainer>
      {goto === "table" ? (
        <TableContainer>
          <DataGrid
            rows={rows}
            style={style.table}
            columns={columns}
            pageSize={10}
            rowHeight={65}
            hideFooterSelectedRowCount
            disableColumnMenu
            checkboxSelection
            scrollbarSize={5}
            classes={"MuiDataGrid-columnHeader--alignCenter"}
            onSelectionModelChange={(e) => {
              let selectedItemsIdArray = e;
              let selectedItems = [];
              selectedItemsIdArray.forEach((id) =>
                selectedItems.push(rows.find((row) => row.id === id))
              );
              setSelectedItems(selectedItems);
            }}
            disableSelectionOnClick
          />
        </TableContainer>
      ) : (
        <AddItemContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={3} xs={6}>
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
              <Col md={9} xs={12}>
                <Row className="w-100">
                  <Col md={4} xs={6}>
                    <InputDiv>
                      <Label>Item Name</Label>
                      <ApplyFormInput
                        placeholder="IP Camera"
                        {...register("item_name", { required: true })}
                      />
                      {errors.item_name && <Error>Item name is required</Error>}
                    </InputDiv>
                  </Col>
                  <Col md={4} xs={6}>
                    <InputDiv>
                      <Label>Item Qty.</Label>
                      <ApplyFormInput
                        placeholder="400"
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
                  <Col md={4} xs={6}>
                    <InputDiv>
                      <Label>P.O. Number</Label>
                      <ApplyFormInput
                        placeholder="#9008208290"
                        {...register("po_number", {
                          required: true,
                          pattern: /(#[1-9]\d*)/g,
                        })}
                      />
                      {errors.po_number && (
                        <Error>Post office number is required</Error>
                      )}
                    </InputDiv>
                  </Col>
                </Row>
                <Row className="w-100">
                  <Col md={4} xs={6}>
                    <InputDiv>
                      <Label>Date</Label>
                      <ApplyFormInput
                        placeholder="20-02-2021"
                        type="datetime"
                        {...register("date", { required: true })}
                      />
                      {errors.date && <Error>Date is required</Error>}
                    </InputDiv>
                  </Col>
                  <Col md={4} xs={6}>
                    <InputDiv>
                      <Label>Supplier Name</Label>
                      <ApplyFormInput
                        placeholder="ABC Electronics"
                        {...register("supplier", {
                          required: true,
                        })}
                      />
                      {errors.supplier && (
                        <Error>Supplier name is required</Error>
                      )}
                    </InputDiv>
                  </Col>
                  <Col md={4} xs={6}>
                    <InputDiv>
                      <Label>Received Date</Label>
                      <ApplyFormInput
                        type="datetime"
                        placeholder="18-02-2021"
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
                <Row className="w-100">
                  <Col md={4}>
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
                  <Col md={8}>
                    <InputDiv>
                      <Label>Remarks</Label>
                      <ApplyFormInput
                        type="text"
                        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                        {...register("remarks")}
                      />
                    </InputDiv>
                  </Col>
                </Row>
              </Col>
            </Row>
            <div className="text-center mt-lg-5">
              <SubmitButton type="submit" value="Save" />
            </div>
          </form>
        </AddItemContainer>
      )}
    </section>
  );
};

export default Inventory;
const style = {
  table: {
    border: "none",
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: "15px",
    lineHeight: "22px",
  },
};


const ButtonContainer = styled.div`
  margin: 0 100px;
`;
export const EditButton = styled(Button)`
  background: #eff3fb;
  border-radius: 9px;
  font-family: Poppins;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: rgba(45, 56, 80, 0.91);
`;
export const DeleteButton = styled(Button)`
  background: #ff0000;
  border-radius: 9px;
  font-family: Poppins;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  margin-left: 25px;
`;

const AddItemContainer = styled.div`
  border: 1px solid #dadbd8;
  box-sizing: border-box;
  width: 90%;
  height: 550px;
  margin: 0 auto;
  padding-top: 50px;
`;

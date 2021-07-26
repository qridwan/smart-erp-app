import { DataGrid } from "@material-ui/data-grid";
import React, { useState } from "react";
import styled from "styled-components";
import { BoldText, Button, TableImage } from "../../styles/styles";
import tablePhoto from "../../Assets/Images/photoCamera.png";
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
        <img src={params.row.photos} alt={params.id} height="66px" width="55px" />
      </TableImage>
    )},
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
  }
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
  console.log("🚀~selectedItems", selectedItems);
  return (
    <section>
      <TopBar>
        <BoldText> Inventory </BoldText>
        <Button>+ Add Items</Button>
      </TopBar>
      <ButtonContainer
        className={selectedItems.length ? "visible" : "invisible"}
      >
        <EditButton> Edit </EditButton>
        <DeleteButton> Delete </DeleteButton>
      </ButtonContainer>
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


const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 100px 0 100px;
`;

const TableContainer = styled.div`
  width: 95%;
  height: 70vh;
  margin: 0 auto;
  text-align: center;
`;
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

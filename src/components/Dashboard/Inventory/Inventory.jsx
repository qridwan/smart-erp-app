// import { DataGrid } from "@material-ui/data-grid";
import React, { useState } from "react";
// import IPcamera from "../../../Assets/Images/ipCamera.png";
import backArrow from "../../../Assets/Icons/backArrow.svg";
// import moment from "moment";
import styled from "styled-components";
import {
  BoldText,
  Button,
  TableContainer,
  TopBar,
} from "../../../styles/styles";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { removeFromInventory } from "../../../Redux/actions/InventoryActions";
import ModalInventory from "./ModalInventory";
import InventoryTable from "./InventoryTable";
import ItemForm from "./ItemForm";

const Inventory = () => {
  // const classes = inventoryStyles();
  const [selectedItems, setSelectedItems] = useState([]);
  const [goto, setGoto] = useState("table");
  const [open, setOpen] = useState(false);
  const [editImage, setEditImage] = useState("");

  const { reset } = useForm();

  return (
    <section>
      <TopBar>
        <div className="d-flex align-items-center">
          {goto !== "table" && (
            <img
              src={backArrow}
              alt="home inventory"
              height="18px"
              style={{ marginRight: "10px" }}
            />
          )}
          {goto === "table" && <BoldText> Inventory </BoldText>}

          {goto === "addItem" && <BoldText> Add Item </BoldText>}
          {goto === "addPurchase" && <BoldText> Add Purchase </BoldText>}
          {goto === "purchaseHistory" && (
            <BoldText> Purchase History </BoldText>
          )}
          {/* <ButtonContainer
            className={selectedItems.length ? "visible mx-lg-2" : "invisible"}
          >
            <DeleteButton onClick={handleDelete}> Delete </DeleteButton>
            <EditButton
              onClick={handleEdit}
              className={selectedItems.length === 1 ? "visible" : "invisible"}
            >
              Edit
            </EditButton>
          </ButtonContainer> */}
        </div>

        {goto === "table" ? (
          <div>
            <Button
              outline
              onClick={() => {
                setGoto("purchaseHistory");
                setSelectedItems([]);
              }}
            >
              Purchase History
            </Button>

            <Button
              outline
              onClick={() => {
                setGoto("addItem");
                setSelectedItems([]);
              }}
              style={{ margin: "0 10px" }}
            >
              + Add Item
            </Button>

            <Button
              onClick={() => {
                setGoto("addPurchase");
                setSelectedItems([]);
              }}
            >
              + Add Purchase
            </Button>
          </div>
        ) : (
          <Button
            outline
            onClick={() => {
              reset();
              setGoto("table");
              setEditImage("");
            }}
          >
            View Inventory
          </Button>
        )}
      </TopBar>
      <ModalInventory open={open} setOpen={setOpen} />
      {goto === "table" && (
        <TableContainer className="overflow-hidden">
          <InventoryTable />
          {/* <DataGrid
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
          /> */}
        </TableContainer>
      )}
      {goto === "addItem" && <ItemForm />}
    </section>
  );
};

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  removeFromInventory: removeFromInventory,
};
export default connect(mapStateToProps, mapDispatchToProps)(Inventory);

const Container = styled.div`
  // padding: 0 50px;
  @media only screen and (max-width: 1000px) {
    padding: 0;
  }
`;

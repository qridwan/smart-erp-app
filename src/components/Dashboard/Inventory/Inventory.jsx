import React, { useEffect, useState } from "react";
// import backArrow from "../../../Assets/Icons/backArrow.svg";
import {
  BoldText,
  Button,
  TableContainer,
  TopBar,
} from "../../../styles/styles";
// import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import {
  // removeFromInventory,
  setShow,
} from "../../../Redux/actions/renderActions";
import ModalInventory from "./ModalInventory";
import InventoryTable from "./InventoryTable";
import PurchaseForm from "./PurchaseForm";
import AddItem from "./AddItem";
import PurchaseHistory from "./PurchaseHistory";

const Inventory = ({ setShow, show }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setShow("inventoryTable");
  }, []);

  return (
    <section>
      {show === "inventoryTable" && (
        <TopBar>
          <div className="d-flex align-items-center">
            <BoldText> Inventory </BoldText>
          </div>

          <div>
            <Button
              outline
              onClick={() => {
                setShow("purchaseHistory");
                setSelectedItems([]);
              }}
            >
              Purchase History
            </Button>

            <Button
              outline
              onClick={() => {
                setShow("addItem");
                setSelectedItems([]);
              }}
              style={{ margin: "0 10px" }}
            >
              + Add Item
            </Button>

            <Button
              onClick={() => {
                setShow("addPurchase");
                setSelectedItems([]);
              }}
            >
              + Add Purchase
            </Button>
          </div>
        </TopBar>
      )}
      <ModalInventory open={open} setOpen={setOpen} />
      {show === "inventoryTable" && (
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
      {show === "addItem" && <AddItem />}
      {show === "addPurchase" && <PurchaseForm />}
      {show === "purchaseHistory" && <PurchaseHistory />}
    </section>
  );
};

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  setShow: setShow,
};
export default connect(mapStateToProps, mapDispatchToProps)(Inventory);

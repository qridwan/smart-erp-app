
import React, { useContext, useState } from "react";
import {
  BoldText,
  Button,
  TableContainer,
  TopBar,
} from "../../../styles/styles";
import { connect } from "react-redux";
import { setShow } from "../../../Redux/actions/renderActions";
import InventoryTable from "./InventoryTable";
import PurchaseForm from "./PurchaseForm";
import AddItem from "./AddItem";
import PurchaseHistory from "./PurchaseHistory";
import { UserContext } from "../../../context/UserProvider";

const Inventory = ({ setShow, show }) => {
  const user = useContext(UserContext);
  const { role } = user;
  const [item, setItem] = useState({});

  return (
    <section>
      {show === "inventoryTable" && (
        <TopBar>
          <div className="d-flex align-items-center">
            <BoldText> Inventory </BoldText>
          </div>

          <div display="d-flex flex-wrap">
            <Button
              outline
              onClick={() => {
                setShow("purchaseHistory");
              }}
            >
              Purchase History
            </Button>

            {role !== "role-2" && (
              <>
                <Button
                  outline
                  onClick={() => {
                    setShow("addItem");
                  }}
                  style={{ margin: "0 10px" }}
                >
                  + Add Item
                </Button>
                <Button
                  onClick={() => {
                    setShow("addPurchase");
                  }}
                >
                  + Add Purchase
                </Button>
              </>
            )}
          </div>
        </TopBar>
      )}
      {show === "inventoryTable" && (
        <TableContainer className="overflow-hidden">
          <InventoryTable setItem={setItem} />
        </TableContainer>
      )}
      {show === "addItem" && <AddItem item={item} setItem={setItem} />}
      {show === "addPurchase" && <PurchaseForm item={item} setItem={setItem} />}
      {show === "purchaseHistory" && (
        <PurchaseHistory setShow={setShow} setItem={setItem} />
      )}
    </section>
  );
};

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  setShow: setShow,
};
export default connect(mapStateToProps, mapDispatchToProps)(Inventory);

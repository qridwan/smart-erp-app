import {
  TableBody,
  Table,
  TableCell,
  TableRow,
  Menu,
  MenuItem,
} from "@material-ui/core";
import React, { useContext, useEffect, useRef, useState } from "react";
import TopbarAtom from "../../../atoms/TopbarAtom";
import { TableContainer, tableStyles } from "../../../styles/styles";
import TableHeadCell from "../Tables/TableHead";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useSortableData } from "../Tables/table.sort";
import GetPurchaseHistory from "../../../Api/GetPurchaseHistory";
import { UserContext } from "../../../context/UserProvider";
import dateFormat from "dateformat";

const PurchaseHistory = ({ setItem, setShow }) => {
  const user = useContext(UserContext);
  const { role } = user;
  const topbarRef = useRef(null);
  const classes = tableStyles();
  const [anchorEl, setAnchorEl] = useState([]);
  const { purchasedItems } = GetPurchaseHistory();
  const { requestSort, sortConfig, items} = useSortableData(purchasedItems);
  
  const anchors = [];
  useEffect(() => {
    purchasedItems.forEach((item) => anchors.push(null));
    setAnchorEl(anchors);
  }, [purchasedItems.length]);

  const handleClick = (event, index) => {
    setAnchorEl(
      anchorEl.map((a, i) => {
        if (i === index) {
          return event.currentTarget;
        } else {
          return a;
        }
      })
    );
  };

  const handleClose = (index) => {
    setAnchorEl(
      anchorEl.map((a, i) => {
        if (i === index) {
          return null;
        } else {
          return a;
        }
      })
    );
  };
  const MoreFunc = (row, info) => {
    setItem({ ...row, info: info });
    setShow("addPurchase");
    handleClose();
    handleClose();
  };
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  return (
    <div>
      <TopbarAtom
        title="Purchase History"
        topRef={topbarRef}
        goBack="inventoryTable"
      />
      <TableContainer className="mt-3">
        <Table className={classes.table} aria-label="simple table">
          <TableHeadCell
            classes={classes}
            show="purchaseHistory"
            requestSort={requestSort}
            getClassNamesFor={getClassNamesFor}
          />
          <TableBody>
            {items?.map((product, index) => {
              return product?.item?.map((pd, i) => {
                return (
                  <TableRow
                    key={product.order_no + i}
                    style={
                      index % 2 !== 0 ? { background: "#F4F4F4" } : undefined
                    }
                  >
                    <TableCell align="center">{pd.item_name}</TableCell>
                    <TableCell align="center">{product.order_no}</TableCell>
                    <TableCell align="center">{product.supplier}</TableCell>
                    <TableCell align="center">{pd.quantity}</TableCell>
                    <TableCell align="center">
                      {dateFormat(
                        new Date(product.purchase_date),
                        "dd-mm-yyyy"
                      )}
                      {/* {product.purchase_date} */}
                    </TableCell>
                    <TableCell align="center">
                      {product.status !== "Delivered" && (
                        <div>
                          <MoreHorizIcon
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={(e) => handleClick(e, index)}
                          />
                          <Menu
                            id="simple-menu"
                            anchorEl={anchorEl[index]}
                            keepMounted
                            open={Boolean(anchorEl[index])}
                            onClose={() => handleClose(index)}
                          >
                            <MenuItem onClick={() => MoreFunc(product, "view")}>
                              View More
                            </MenuItem>
                            {role !== `role-1` && (
                              <MenuItem
                                onClick={() => MoreFunc(product, "edit")}
                              >
                                Edit
                              </MenuItem>
                            )}
                          </Menu>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              });
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PurchaseHistory;

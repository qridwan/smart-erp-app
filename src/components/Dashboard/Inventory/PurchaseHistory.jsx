import {
  TableBody,
  Table,
  TableCell,
  TableRow,
  Menu,
  MenuItem,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import TopbarAtom from "../../../atoms/TopbarAtom";
import { TableContainer, tableStyles } from "../../../styles/styles";
import TableHeadCell from "../Tables/TableHead";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useSortableData } from "../Tables/table.sort";
import GetPurchaseHistory from "../../../Api/GetPurchaseHistory";

const PurchaseHistory = ({ setItem, setShow }) => {
  const topbarRef = useRef(null);
  const classes = tableStyles();
  const [anchorEl, setAnchorEl] = useState([]);
  const { items } = GetPurchaseHistory();
  const { requestSort, sortConfig } = useSortableData(items);
  const anchors = [];
  useEffect(() => {
    items.forEach((item) => anchors.push(null));
    setAnchorEl(anchors);
  }, [items.length]);

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
    // console.log({ row });
    // setDetails({ ...row, info: info });
    // (await info) === "edit" ? setShow("edit_inwards") : setShow("more_inwards");
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
        // buttonRef={SubmitButtonRef}
        // buttonTitle="Summery"
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
                    key={product.order_no + index}
                    style={
                      index % 2 !== 0 ? { background: "#F4F4F4" } : undefined
                    }
                  >
                    <TableCell align="center">{pd.item_name}</TableCell>
                    <TableCell align="center">{product.order_no}</TableCell>
                    <TableCell align="center">{product.supplier}</TableCell>
                    <TableCell align="center">{pd.quantity}</TableCell>
                    <TableCell align="center">
                      {product.purchase_date}
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
                            <MenuItem onClick={() => MoreFunc(product, "edit")}>
                              Edit
                            </MenuItem>
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

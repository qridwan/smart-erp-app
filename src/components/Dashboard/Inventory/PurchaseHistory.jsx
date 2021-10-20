import {
  TableBody,
  Table,
  TableCell,
  TableRow,
  Menu,
  MenuItem,
} from "@material-ui/core";
import React, { useRef, useState } from "react";
import TopbarAtom from "../../../atoms/TopbarAtom";
import {
  AddItemContainer,
  TableContainer,
  tableStyles,
} from "../../../styles/styles";
import TableHeadCell from "../Tables/TableHead";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useSortableData } from "../Tables/table.sort";

const purchaseHistoryData = [{}];

const PurchaseHistory = () => {
  const topbarRef = useRef(null);
  const classes = tableStyles();
  const [anchorEl, setAnchorEl] = useState([]);
  const [products, setProducts] = useState([]);
  const { requestSort, sortConfig } = useSortableData(products);
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
        buttonTitle="Save"
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
            {products.map((product, index) => {
              return (
                <TableRow
                  key={product.orderNo}
                  style={
                    index % 2 !== 0 ? { background: "#F4F4F4" } : undefined
                  }
                >
                  <TableCell component="th" scope="row" align="center">
                    <img
                      src={product.photos}
                      alt="photos"
                      height="30px"
                      width="30px"
                    />
                  </TableCell>
                  <TableCell align="start">{product.name}</TableCell>
                  <TableCell align="center">{product.id}</TableCell>
                  <TableCell align="center">{product.purchase_count}</TableCell>
                  <TableCell align="center">{product.onHand}</TableCell>
                  <TableCell align="center" style={{ color: "#1F67F1" }}>
                    {product.client_count}
                  </TableCell>
                  <TableCell align="center" style={{ color: "#FF0000" }}>
                    {product.not_working}
                  </TableCell>
                  <TableCell align="center" style={{ color: "#FF8A00" }}>
                    {product.damaged}
                  </TableCell>
                  <TableCell align="center" style={{ color: "#85AAF4" }}>
                    {product.missing}
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
                          <MenuItem
                            onClick={() => MoreFunc(product, "view_more")}
                          >
                            View More
                          </MenuItem>
                          <MenuItem onClick={() => MoreFunc(product, "edit")}>
                            Edit
                          </MenuItem>
                          <MenuItem onClick={() => MoreFunc(product, "edit")}>
                            Deactive
                          </MenuItem>
                        </Menu>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PurchaseHistory;

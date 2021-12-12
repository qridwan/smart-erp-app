import React, { useContext, useEffect, useState } from "react";
import { TableContainer, tableStyles } from "../../../styles/styles";
import {
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import TableHeadCell from "../Tables/TableHead";
import { useSortableData } from "../Tables/table.sort";
import { setShow } from "../../../Redux/actions/renderActions";
import { connect } from "react-redux";
import GetProducts from "../../../Api/GetProducts";
import { UserContext } from "../../../context/UserProvider";
import GetInventoryItems from "../../../Api/GetInventoryItems";

const InventoryTable = ({ setShow, show, setItem }) => {
  const classes = tableStyles();
  const user = useContext(UserContext);
  const { role } = user;
  const [anchorEl, setAnchorEl] = useState([]);
  const { inventoryItems } = GetInventoryItems();
  const { products } = GetProducts();
  let anchors = [];
  useEffect(() => {
    inventoryItems.forEach((item) => anchors.push(null));
    setAnchorEl(anchors);
  }, [inventoryItems.length]);
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
  const { requestSort, sortConfig, items } = useSortableData(inventoryItems);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const MoreFunc = (row, info) => {
    setItem({ ...row, info: info });
    setShow("addItem");
    handleClose();
  };
  return (
    <TableContainer className="mt-3">
      <Table className={classes.table} aria-label="simple table">
        <TableHeadCell
          classes={classes}
          show="inventory"
          requestSort={requestSort}
          getClassNamesFor={getClassNamesFor}
        />
        <TableBody>
          {items.length > 0 &&
            items.map((item, index) => {
              const product = products.find((pd) => pd.code === item.code);
              return (
                <TableRow
                  key={item.code}
                  style={
                    index % 2 !== 0 ? { background: "#F4F4F4" } : undefined
                  }
                >
                  <TableCell component="th" scope="row" align="center">
                    <img
                      src={item.photos}
                      alt="photos"
                      height="30px"
                      width="30px"
                    />
                  </TableCell>
                  <TableCell>{item.item_name}</TableCell>
                  <TableCell align="center">{item.code}</TableCell>
                  <TableCell align="center">
                    {product?.quantity ? product.quantity : 0}
                  </TableCell>
                  <TableCell align="center">{item.onHand}</TableCell>
                  <TableCell align="center" style={{ color: "#1F67F1" }}>
                    {item.clientCount}
                  </TableCell>
                  <TableCell align="center" style={{ color: "#FF0000" }}>
                    {item.not_working}
                  </TableCell>
                  <TableCell align="center" style={{ color: "#FF8A00" }}>
                    {item.damaged}
                  </TableCell>
                  <TableCell align="center" style={{ color: "#85AAF4" }}>
                    {item.missing}
                  </TableCell>

                  <TableCell align="center">
                    {item.status !== "Delivered" && (
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
                          <MenuItem onClick={() => MoreFunc(item, "view")}>
                            View More
                          </MenuItem>
                          {role !== "role-1" && (
                            <MenuItem onClick={() => MoreFunc(item, "edit")}>
                              Edit
                            </MenuItem>
                          )}
                          {/* <MenuItem
                          onClick={() => MoreFunc(product, "deactive")}
                        >
                          Deactive
                        </MenuItem> */}
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
  );
};

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  setShow: setShow,
};
export default connect(mapStateToProps, mapDispatchToProps)(InventoryTable);

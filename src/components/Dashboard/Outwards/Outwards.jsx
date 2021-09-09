import { NativeSelect, FormControl, Menu, MenuItem } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  BoldText,
  Button,
  SearchContainer,
  SearchInput,
  TableContainer,
  tableStyles,
  TopBar,
} from "../../../styles/styles";
import { ReactComponent as SearchIcon } from "../../../Assets/Icons/search.svg";
import { ReactComponent as FilterIcon } from "../../../Assets/Icons/filter.svg";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import GenerateOutwards from "./GenerateOutwards";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useSortableData } from "../Tables/table.sort";
import TableHeadCell from "../Tables/TableHead";
import MoreOutwards from "./MoreOutwards";

import { db as firebase } from "../../../firebase";

function createData(
  order,
  shipping,
  item,
  agency,
  quantity,
  sent,
  pending,
  status
) {
  return { order, shipping, item, agency, quantity, sent, pending, status };
}

const rows = [
  createData(
    "01",
    "16-07-21",
    "IP Camera",
    "Start Security",
    3000,
    1500,
    1500,
    "In-Transit"
  ),
  createData(
    "02",
    "16-10-21",
    "HDMI Cables",
    "ABC Security",
    3000,
    1500,
    1500,
    "Delivered"
  ),
  createData(
    "03",
    "11-10-21",
    "Tripod",
    "MI Security",
    300,
    500,
    1300,
    "In-Transit"
  ),
];

const Outwards = () => {
  const [show, setShow] = useState("outwards");
  const classes = tableStyles();
  const [state, setState] = useState({
    id: 1,
    age: "",
    name: "hai",
  });
  const [anchorEl, setAnchorEl] = useState([]);
  const [details, setDetails] = useState({});

  const handleClick = (event, index) => {
    setAnchorEl(
      anchorEl.map((a, i) => {
        if (i == index) {
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
        if (i == index) {
          return null;
        } else {
          return a;
        }
      })
    );
  };

  const [arr, setArr] = useState([]);

  const handleChange = (event, index) => {
    console.log(event.target.value);
    console.log(index);
    setArr(
      arr.map((a, j) => {
        if (j == index) return event.target.value;
        else return a;
      })
    );
  };

  const { requestSort, sortConfig } = useSortableData(rows);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const MoreFunc = async (row, info) => {
    console.log({ ...row, info: info });
    setDetails({ ...row, info: info });
    (await info) === "edit"
      ? setShow("edit_outwards")
      : setShow("more_outwards");
    // handleClose();
  };

  const [orders, setOrders] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const outRef = firebase.ref("inventory/out-orders");
    outRef.once("value", (snapshot) => {
      if (snapshot.val()) {
        let orders = [];
        let anchors = [];
        let indexes = [];
        Object.keys(snapshot.val()).map((key) => {
          orders.push(snapshot.val()[key]);
          anchors.push(null);
          indexes.push(0);
        });
        setAnchorEl(anchors);
        setArr(indexes);
        console.log(snapshot.val());
        console.log(orders);
        setOrders(orders);
      } else {
        console.log("no out orders");
      }
    });

    const clientsRef = firebase.ref("inventory/clients");
    clientsRef.once("value", (snapshot) => {
      let clients = [];
      Object.keys(snapshot.val()).map((key) => {
        clients.push(snapshot.val()[key]);
      });
      setClients(clients);
    });
  }, [show]);

  return (
    <>
      {show === "outwards" ? (
        <div>
          <TopBar className="">
            <BoldText> Outwards </BoldText>
            <SearchContainer>
              <section className="w-100 d-flex justify-content-between align-items-center">
                <div className="m-0 p-0 d-flex">
                  <SearchIcon
                    style={{ marginRight: "0.8rem", width: "20px" }}
                  />
                  <Autocomplete
                    id="custom-input-demo"
                    options={clients}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <div ref={params.InputProps.ref}>
                        <SearchInput
                          placeholder="Search by client..."
                          type="text"
                          {...params.inputProps}
                        />
                      </div>
                    )}
                  />
                </div>
                <FilterIcon className="" />
              </section>
            </SearchContainer>
            <div>
              <Button onClick={() => setShow("generate")}>Generate New</Button>
            </div>
          </TopBar>
          <TableContainer className="mt-lg-3">
            <Table className={classes.table} aria-label="simple table">
              <TableHeadCell
                classes={classes}
                show={show}
                requestSort={requestSort}
                getClassNamesFor={getClassNamesFor}
              />
              <TableBody>
                {orders.map((row, index) => {
                  console.log(row);
                  return (
                    <TableRow key={row.order}>
                      <TableCell component="th" scope="row" align="center">
                        {row.ewayBill}
                      </TableCell>
                      <TableCell align="center">{row.deliveryDate}</TableCell>
                      <TableCell align="center">
                        <FormControl className={classes.formControl}>
                          <NativeSelect
                            value={state.key}
                            onChange={(e) => handleChange(e, index)}
                            name={row.item}
                            className={classes.selectEmpty}
                            inputProps={{ "aria-label": "age" }}
                          >
                            {/* <Option value={row.item} title={row.quantity}>
                              {row.item}
                            </Option> */}

                            {row.item.map((item, j) => {
                              return (
                                <Option value={j} title={item.quantity}>
                                  {item.name}
                                </Option>
                              );
                            })}
                          </NativeSelect>
                        </FormControl>
                      </TableCell>
                      <TableCell align="center">{row.agency}</TableCell>
                      <TableCell align="center">
                        {row.item[arr[index]].quantity}
                      </TableCell>
                      <TableCell align="center">
                        {row.item[arr[index]].sent}
                      </TableCell>
                      <TableCell align="center">
                        {row.item[arr[index]].pending}
                      </TableCell>
                      <TableCell
                        align="center"
                        className={
                          row.status === "intransit"
                            ? "text-success"
                            : "text-primary"
                        }
                      >
                        {row.status}
                      </TableCell>
                      <TableCell align="center">
                        {row.status !== "delivered" && (
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
                              onClose={(e) => handleClose(index)}
                            >
                              <MenuItem
                                onClick={() => MoreFunc(row, "view_more")}
                              >
                                View More
                              </MenuItem>
                              <MenuItem onClick={() => MoreFunc(row, "edit")}>
                                Edit
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
      ) : (
        <>
          {show === "generate" || show === "edit_outwards" ? (
            <GenerateOutwards
              details={details}
              setShow={setShow}
              setDetails={setDetails}
            />
          ) : null}
          {show === "more_outwards" && (
            <MoreOutwards
              details={details}
              setShow={setShow}
              setDetails={setDetails}
            />
          )}
        </>
      )}
    </>
  );
};

export default Outwards;

const Option = styled.option``;

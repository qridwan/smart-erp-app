import React from "react";
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
import { Dropdown } from "react-bootstrap";
import {
  FormControl,
  NativeSelect,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useState } from "react";
import styled from "styled-components";
import ReceiveOrder from "./ReceiveOrder";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TableHeadCell from "../Tables/TableHead";
import { getComparator, stableSort } from "../Tables/table.sort";

function createData(
  order,
  agency,
  item,
  quantity,
  received,
  pending,
  date,
  audit
) {
  return { order, agency, item, quantity, received, pending, date, audit };
}

const rows = [
  createData(
    "01",
    "Start Security",
    "IP Camera",
    3000,
    "-",
    "-",
    "16-10-21",
    "Pending"
  ),
  createData(
    "02",
    "ABC Service",
    "Data Dongles",
    2000,
    1200,
    800,
    "16-12-20",
    "Completed"
  ),
];
const Inwards = () => {
  const classes = tableStyles();
  const [show, setShow] = useState("inwards");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [state, setState] = useState({
    id: 1,
    age: "",
    name: "",
  });
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
    console.log(state);
  };
  const options = ["item1", "item2", "item3"];
  return (
    <div>
      <TopBar>
        {show === "inwards" ? (
          <>
            <BoldText>Inwards</BoldText>
            <SearchContainer>
              <section className="w-100 d-flex justify-content-start align-items-center">
                <div className="m-0 p-0 d-flex">
                  <SearchIcon
                    style={{ marginRight: "0.8rem", width: "20px" }}
                  />
                  <div className="w-100">
                    <Autocomplete
                      id="custom-input-demo"
                      options={options}
                      renderInput={(params) => (
                        <div className="" ref={params.InputProps.ref}>
                          <SearchInput
                            placeholder="Search by- AGENCY NAME/ORDER No."
                            type="text"
                            {...params.inputProps}
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>
              </section>
            </SearchContainer>
          </>
        ) : (
          <BoldText>Receive Order</BoldText>
        )}
        {show === "inwards" ? (
          <Button outline onClick={() => setShow("receive_order")}>
            Receive Order
          </Button>
        ) : (
          <Button outline onClick={() => setShow("inwards")}>
            Search Orders
          </Button>
        )}
      </TopBar>
      {show === "inwards" ? (
        <InwardsTableContainer>
          <TableContainer className="mt-3">
            <Table className={classes.table} aria-label="simple table">
              <TableHeadCell
                classes={classes}
                order={order}
                orderBy={orderBy}
                show={show}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy)).map((row) => {
                  return (
                    <TableRow key={row.order}>
                      <TableCell component="th" scope="row" align="center">
                        {row.order}
                      </TableCell>
                      <TableCell align="center">{row.agency}</TableCell>
                      <TableCell align="center">
                        <FormControl className={classes.formControl}>
                          <NativeSelect
                            value={state.key}
                            onChange={handleChange}
                            name={row.item}
                            className={classes.selectEmpty}
                            inputProps={{ "aria-label": "age" }}
                          >
                            <option title={row.quantity} value={row.item}>
                              {row.item}
                            </option>
                            <option title={row.quantity} value={10}>
                              External Flash
                            </option>
                            <option title={row.quantity} value={20}>
                              Camera Bag
                            </option>
                            <option title={row.quantity} value={30}>
                              SD Card
                            </option>
                          </NativeSelect>
                        </FormControl>
                      </TableCell>

                      <TableCell align="center">{row.quantity}</TableCell>
                      <TableCell align="center">{row.received}</TableCell>
                      <TableCell align="center">{row.pending}</TableCell>
                      <TableCell align="center">{row.date}</TableCell>
                      <TableCell
                        align="center"
                        className={
                          row.audit === "Completed"
                            ? "text-success"
                            : "text-danger"
                        }
                      >
                        {row.audit}
                      </TableCell>
                      <TableCell align="center">
                        {row.status !== "Delivered" && (
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="white"
                              id="dropdown-basic"
                            >
                              <MoreHorizIcon />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="">View More</Dropdown.Item>
                              <Dropdown.Item href="">Edit</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </InwardsTableContainer>
      ) : (
        <ReceiveOrder />
      )}
    </div>
  );
};

export default Inwards;

const InwardsTableContainer = styled.div``;

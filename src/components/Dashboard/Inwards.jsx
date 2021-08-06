import React from "react";
import {
  BoldText,
  Button,
  SearchContainer,
  SearchInput,
  TableContainer,
  TopBar,
} from "../../styles/styles";
import { ReactComponent as SearchIcon } from "../../Assets/Icons/search.svg";
import { Dropdown, Table } from "react-bootstrap";
import {
  FormControl,
  makeStyles,
  NativeSelect,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useState } from "react";
import styled from "styled-components";
import ReceiveOrder from "./ReceiveOrder";

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
const useStyles = makeStyles({
  table: {
    minWidth: 650,
    paddingTop: "30px",
  },
  thead: {
    background: "#F7F9FD",
    borderBottom: "none",
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "21px",
    color: "#6D83AE",
  },
  button: {
    display: "block",
    marginTop: "20px",
  },
  formControl: {
    margin: "10px",
    minWidth: 120,
  },
});
const Inwards = () => {
  const classes = useStyles();
  const [show, setShow] = useState("search_order");
  const [state, setState] = useState({
    id: 1,
    age: "",
    name: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
    console.log(state);
  };

  return (
    <div>
      <TopBar>
        {show === "search_order" ? (
          <BoldText>Inwards</BoldText>
        ) : (
          <BoldText>Receive Order</BoldText>
        )}
        {show === "search_order" ? (
          <Button outline onClick={() => setShow("receive_order")}>
             Receive Order
          </Button>
        ) : (
          <Button outline onClick={() => setShow("search_order")}>
           Search Orders
          </Button>
        )}
      </TopBar>
      {show === "search_order" ? (
        <InwardsSearchContainer>
          <div className="d-flex justify-content-center mt-3">
            <SearchContainer className="w-75">
              <section className="w-100">
                <SearchIcon className="pr-3" />
                <SearchInput
                  placeholder="Search by- AGENCY NAME/ORDER No."
                  type="text"
                ></SearchInput>
              </section>
            </SearchContainer>
          </div>
          <TableContainer className="mt-3">
            <Table className={classes.table} aria-label="simple table">
              <TableHead className={classes.thead}>
                <TableRow>
                  <TableCell className={classes.thead}>ORDER NO.</TableCell>
                  <TableCell className={classes.thead} align="center">
                    Agency Name
                  </TableCell>
                  <TableCell className={classes.thead} align="center">
                    Item Name
                  </TableCell>
                  <TableCell className={classes.thead} align="center">
                    Total Qty.
                  </TableCell>
                  <TableCell className={classes.thead} align="center">
                    Received
                  </TableCell>
                  <TableCell className={classes.thead} align="center">
                    Pending
                  </TableCell>
                  <TableCell className={classes.thead} align="center">
                    Date
                  </TableCell>
                  <TableCell className={classes.thead} align="center">
                    Audit
                  </TableCell>
                  <TableCell className={classes.thead} align="center">
                    More
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => {
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
                            <option value={row.item}>{row.item}</option>
                            <option value={10}>Ten</option>
                            <option value={20}>Twenty</option>
                            <option value={30}>Thirty</option>
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
        </InwardsSearchContainer>
      ) : (
        <ReceiveOrder />
      )}
    </div>
  );
};

export default Inwards;

const InwardsSearchContainer = styled.div``;

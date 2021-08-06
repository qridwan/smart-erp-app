import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import {
  BoldText,
  Button,
  TableContainer,
  TopBar,
} from "../../styles/styles";
import AddClient from "./AddClient";

function createData(
  agency,
  client_id,
  date,
  contacts,
  delivered,
  location,
  orders
) {
  return { agency, client_id, date, contacts, delivered, location, orders };
}

const rows = [
  createData(
    "Lorem ipsum",
    "#475-ABS",

    "14th June 2021",
    "+91 8899271973",
    "testmail323@gmail.com",
    "Coimbatore",
    "19"
  ),
  createData(
    "Lorem ipsum",
    "#475-ABS",

    "14th June 2021",
    "+91 8899271973",
    "testmail323@gmail.com",
    "Coimbatore",
    "19"
  ),
  createData(
    "Lorem ipsum",
    "#475-ABS",

    "14th June 2021",
    "+91 8899271973",
    "testmail323@gmail.com",
    "Coimbatore",
    "19"
  ),
  createData(
    "Lorem ipsum",
    "#475-ABS",

    "14th June 2021",
    "+91 8899271973",
    "testmail323@gmail.com",
    "Coimbatore",
    "19"
  ),
  createData(
    "Lorem ipsum",
    "#475-ABS",

    "14th June 2021",
    "+91 8899271973",
    "testmail323@gmail.com",
    "Coimbatore",
    "19"
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
const Clients = () => {
  const classes = useStyles();
  const [show, setShow] = useState("clients");
  return (
    <main>
      {show === "clients" ? (
        <ClientsContainer>
          <TopBar className="">
            <div>
              <BoldText> Clients </BoldText>
            </div>
            <div className="text-center">
              <Button onClick={() => setShow("add_client")}>
                + Add Clients
              </Button>
            </div>
          </TopBar>
          <TableContainer className="mt-lg-2">
            <Table className={classes.table} aria-label="simple table">
              <TableHead className={classes.thead}>
                <TableRow>
                  <TableCell className={classes.thead} align="center">
                    Agency Name
                  </TableCell>
                  <TableCell className={classes.thead} align="center">
                    Client ID
                  </TableCell>
                  <TableCell className={classes.thead} align="center">
                    Date
                  </TableCell>
                  <TableCell className={classes.thead} align="center">
                    Contacts
                  </TableCell>
                  <TableCell className={classes.thead} align="center">
                    Delivered
                  </TableCell>
                  <TableCell className={classes.thead} align="center">
                    Location
                  </TableCell>
                  <TableCell className={classes.thead} align="center">
                    Orders
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row" align="center">
                        {row.agency}
                      </TableCell>
                      <TableCell align="center">{row.client_id}</TableCell>
                      <TableCell align="center" className="text-primary">
                        {row.date}
                      </TableCell>
                      <TableCell align="center">{row.contacts}</TableCell>
                      <TableCell align="center">{row.delivered}</TableCell>
                      <TableCell align="center">{row.location}</TableCell>
                      <TableCell align="center">{row.orders}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </ClientsContainer>
      ) : (
        <AddClient setShow={setShow} />
      )}
    </main>
  );
};

export default Clients;

const ClientsContainer = styled.div``;

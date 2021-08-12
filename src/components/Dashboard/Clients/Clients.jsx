import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import {
  BoldText,
  Button,
  TableContainer,
  tableStyles,
  TopBar,
} from "../../../styles/styles";
import {
  useSortableData,
} from "../Tables/table.sort";
import TableHeadCell from "../Tables/TableHead";
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
    "Lorem ipsum A",
    "#111-ABS",
    "11th June 2021",
    "+91 1199271973",
    "testmail111@gmail.com",
    "Coimbatore-1",
    "11"
  ),
  createData(
    "Lorem ipsum B",
    "#222-ABS",
    "22th June 2021",
    "+92 2899271973",
    "testmail222@gmail.com",
    "Coimbatore-2",
    "22"
  ),
  createData(
    "Lorem ipsum C",
    "#333-ABS",
    "19th June 2021",
    "+93 999271973",
    "mail323@gmail.com",
    "Coimbatore",
    "6"
  ),
  createData(
    "Lorem ipsum 32",
    "#475-xsa",
    "1st June 2021",
    "+91 8899271973",
    "testmail@gmail.com",
    "Coimbatore",
    "9"
  ),
];

const Clients = () => {
  const classes = tableStyles();
  const [show, setShow] = useState("clients");

  const { items, requestSort, sortConfig } = useSortableData(rows);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

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
              <TableHeadCell
                classes={classes}
                show={show}
                requestSort={requestSort}
                getClassNamesFor={getClassNamesFor}
              />
              <TableBody>
                {items.map((row, i) => {
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

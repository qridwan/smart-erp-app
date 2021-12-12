import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import {
  BoldText,
  Button,
  TableContainer,
  tableStyles,
  TopBar,
} from "../../../styles/styles";
import { useSortableData } from "../Tables/table.sort";
import TableHeadCell from "../Tables/TableHead";
import AddClient from "./AddClient";
import { setShow } from "../../../Redux/actions/renderActions";
import { connect } from "react-redux";
import { UserContext } from "../../../context/UserProvider";
import GetClients from "../../../Api/GetClients";

const Clients = ({ show, setShow }) => {
  const user = useContext(UserContext);
  const { role } = user;
  const classes = tableStyles();
  const { clients } = GetClients();
  const { items, requestSort, sortConfig } = useSortableData(clients);
  
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  useEffect(() => {
    setShow("clientsTable");
  }, []);

  return (
    <main>
      {show === "clientsTable" ? (
        <ClientsContainer>
          <TopBar className="">
            <div>
              <BoldText> Clients </BoldText>
            </div>
            {role !== `role-2` && (
              <div className="text-center">
                <Button onClick={() => setShow("add_client")}>
                  + Add Clients
                </Button>
              </div>
            )}
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
                    <TableRow
                      key={row.id}
                      style={
                        i % 2 !== 0 ? { background: "#F4F4F4" } : undefined
                      }
                    >
                      <TableCell component="th" scope="row" align="center">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.id}</TableCell>
                      <TableCell align="center">{row.date}</TableCell>
                      <TableCell align="center">{row.supervisor}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.city}</TableCell>
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
const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  setShow: setShow,
};
export default connect(mapStateToProps, mapDispatchToProps)(Clients);
const ClientsContainer = styled.div``;

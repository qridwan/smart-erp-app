import {
  TableCell,
  TableHead,
  TableRow,
  Table,
  TableBody,
} from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { tableStyles } from "../../../styles/styles";

const bodyInfos = [
  { id: 1, role: "Role-1", permission: "Only Add actions" },
  { id: 2, role: "Role-2", permission: "Only Edit actions" },
  { id: 3, role: "Role-3", permission: "All actions" },
];
const RoleItem = () => {
  const classes = tableStyles();
  return (
    <Content className="w-75 m-auto mt-4">
      <Table className="w-75 m-auto my-4" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="border-0" style={{ background: "#F7F9FD" }}>
              Role
            </TableCell>
            <TableCell className="border-0" style={{ background: "#F7F9FD" }}>
              Permission
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {bodyInfos.map((info) => (
            <TableRow key={info.id}>
              <TableCell className="border-0">{info.role}</TableCell>
              <TableCell className="border-0"> • {info.permission}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Content>
  );
};

export default RoleItem;
const Content = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 15px;
`;

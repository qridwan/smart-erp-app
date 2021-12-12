import { TableCell, TableHead, TableRow } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { clientsHeadCells, employeesHeadCells, inventoryHeadCells, inwardsHeadCells, outwardsHeadCells, purchaseHistoryHeadCells } from "./tableHeadings.data";

const TableHeadCell = (props) => {
  const [data, setData] = useState([]);
  const {
    classes,
    show,
    requestSort,
    getClassNamesFor,
  } = props;

  useEffect(() => {
    if (show === "inwardsTable") {
      return setData(inwardsHeadCells);
    }
    if (show === "outwardsTable") {
      return setData(outwardsHeadCells);
    }
    if (show === "clientsTable") {
      return setData(clientsHeadCells);
    }
    if (show === "inventory") {
      return setData(inventoryHeadCells);
    }
    if (show === "purchaseHistory") {
      return setData(purchaseHistoryHeadCells);
    }
    if (show === "employees") {
      return setData(employeesHeadCells);
    }
  }, []);

  return (
    <TableHead>
      <TableRow>
        {data.map((headCell) => (
          <TableCell
            align={headCell.align ? headCell.align : "center"}
            key={headCell.label}
            onClick={() => requestSort(headCell.id)}
            className={(getClassNamesFor(headCell.id), classes.thead)}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeadCell;

import { TableCell, TableHead, TableRow } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSortableData } from "./table.sort";

const outwardsHeadCells = [
  { id: "order", label: "Order No." },
  { id: "shipping", label: "Shipping Date" },
  { id: "item", label: "Item Name" },
  { id: "agency", label: "Agency Name" },
  { id: "quantity", label: "Total Qty." },
  { id: "sent", label: "Sent" },
  { id: "pending", label: "Pending" },
  { id: "status", label: "Status" },
  { id: "more", label: "More" },
];

const inwardsHeadCells = [
  { id: "order", label: "Order No." },
  { id: "agency", label: "Agency Name" },
  { id: "item", label: "Item Name" },
  { id: "quantity", label: "Total Qty." },
  { id: "received", label: "Received" },
  { id: "pending", label: "Pending" },
  { id: "date", label: "Date" },
  { id: "audit", label: "Audit" },
  { id: "more", label: "More" },
];
const clientsHeadCells = [
  { id: "agency", label: "Agency Name" },
  { id: "client_id", label: "Client ID" },

  { id: "contacts", label: "Contacts" },
  { id: "delivered", label: "Delivered" },
  { id: "location", label: "Location" },
  { id: "pincode", label: "Pincode" },
  { id: "orders", label: "Orders" },
];

const inventoryHeadCells = [
  { id: "img", label: "Image" },
  { id: "item_name", label: "Item Name" },
  { id: "code", label: "Code" },
  { id: "purchase_count", label: "Purchase Count" },
  { id: "onHand", label: "On Hand" },
  { id: "client_count", label: "Client Count" },
  { id: "not_working", label: "Not Working" },
  { id: "damaged", label: "Damaged" },
  { id: "missing", label: "Missing" },
  { id: "more", label: "More" },
];

const TableHeadCell = (props) => {
  const [data, setData] = useState([]);
  const {
    classes,
    order,
    orderBy,
    onRequestSort,
    show,
    requestSort,
    getClassNamesFor,
  } = props;
  // const createSortHandler = (property) => (event) => {
  //   onRequestSort(event, property);
  // };
  useEffect(() => {
    if (show === "inwards") {
      return setData(inwardsHeadCells);
    }
    if (show === "outwards") {
      return setData(outwardsHeadCells);
    }
    if (show === "clients") {
      return setData(clientsHeadCells);
    }
    if (show === "inventory") {
      return setData(inventoryHeadCells);
    }
  }, []);

  return (
    <TableHead>
      <TableRow>
        {data.map((headCell) => (
          <TableCell
            align="center"
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            active={orderBy === headCell.id}
            direction={orderBy === headCell.id ? order : "asc"}
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

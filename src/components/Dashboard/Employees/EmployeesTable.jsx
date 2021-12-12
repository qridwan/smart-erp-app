import { onValue, ref } from "@firebase/database";
import {
  Menu,
  MenuItem,
  TableBody,
  TableCell,
  TableRow,
  Table,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { TableContainer, tableStyles } from "../../../styles/styles";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useSortableData } from "../Tables/table.sort";
import TableHeadCell from "../Tables/TableHead";

const EmployeesTable = ({ setShow, setDetails }) => {
  const classes = tableStyles();
  const [anchorEl, setAnchorEl] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const employeeRef = ref(db, "inventory/employees");
    onValue(employeeRef, (snapshot) => {
      let employees = [];
      let anchors = [];
      Object.keys(snapshot.val()).forEach((key) => {
        employees.push(snapshot.val()[key]);
        anchors.push(null);
      });
      // console.log(snapshot.val());
      // console.log(employees);
      setEmployees(employees);
      setAnchorEl(anchors);
    });
  }, []);

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

  const { requestSort, sortConfig, items } = useSortableData(employees);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  const MoreFunc = (row, info) => {
    setDetails({ ...row, info: info });
    setShow(info);
    handleClose();
  };
  return (
    <TableContainer className="mt-3">
      <Table className={classes.table} aria-label="simple table">
        <TableHeadCell
          classes={classes}
          show="employees"
          requestSort={requestSort}
          getClassNamesFor={getClassNamesFor}
        />
        <TableBody>
          {items.map((employee, index) => {
            return (
              <TableRow
                key={employee.id}
                style={index % 2 !== 0 ? { background: "#F4F4F4" } : undefined}
              >
                <TableCell align="center">{employee.id}</TableCell>
                <TableCell align="center">{employee.displayName}</TableCell>
                <TableCell align="center">
                  {employee.role ? employee.role : "-"}
                </TableCell>
                <TableCell align="center">
                  {employee.phoneNumber ? employee.phoneNumber : "-"}
                </TableCell>
                <TableCell
                  align="center"
                  className={
                    employee.status === "active" || !employee.disabled
                      ? "text-success"
                      : "text-danger"
                  }
                >
                  {Boolean(employee.disabled) ? "Inactive" : "Active"}
                </TableCell>

                <TableCell align="center">
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
                      <MenuItem onClick={() => MoreFunc(employee, "view")}>
                        View
                      </MenuItem>
                      <MenuItem onClick={() => MoreFunc(employee, "edit")}>
                        Edit
                      </MenuItem>
                    </Menu>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeesTable;

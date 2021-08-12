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
  const [anchorEl, setAnchorEl] = useState(null);
  const [details, setDetails] = useState({});

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };



  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    console.log(
      "🚀 ~ file: Outwards.jsx ~ line 100 ~ handleChange ~ name",
      name
    );
    setState({
      ...state,
      [name]: event.target.value,
    });
    console.log(state);
  };
  const options = ["Option 1", "Option 2"];
  const { items, requestSort, sortConfig } = useSortableData(rows);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  const MoreFunc = async (row, info) => {
    console.log({ row });
    setDetails({ ...row, info: info });
    (await info) === "edit"
      ? setShow("edit_outwards")
      : setShow("more_outwards");
    handleClose();
  };
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
                    options={options}
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
                {items.map((row) => {
                   
                  return (
                    <TableRow key={row.order}>
                      <TableCell component="th" scope="row" align="center">
                        {row.order}
                      </TableCell>
                      <TableCell align="center">{row.shipping}</TableCell>
                      <TableCell align="center">
                        <FormControl className={classes.formControl}>
                          <NativeSelect
                            value={state.key}
                            onChange={handleChange}
                            name={row.item}
                            className={classes.selectEmpty}
                            inputProps={{ "aria-label": "age" }}
                          >
                            <Option value={row.item} title={row.quantity}>
                              {row.item}
                            </Option>

                            <Option value={10} title={row.quantity}>
                              Lense Hood
                            </Option>

                            <Option value={20} title={row.quantity}>
                              Tripod
                            </Option>
                            <Option value={30} title={row.quantity}>
                              Extra Lens
                            </Option>
                          </NativeSelect>
                        </FormControl>
                      </TableCell>
                      <TableCell align="center">{row.agency}</TableCell>
                      <TableCell align="center">{row.quantity}</TableCell>
                      <TableCell align="center">{row.sent}</TableCell>
                      <TableCell align="center">{row.pending}</TableCell>
                      <TableCell
                        align="center"
                        className={
                          row.status === "In-Transit"
                            ? "text-success"
                            : "text-primary"
                        }
                      >
                        {row.status}
                      </TableCell>
                      <TableCell align="center">
                        {row.status !== "Delivered" && (
                          <div>
                            <MoreHorizIcon
                              aria-controls="simple-menu"
                              aria-haspopup="true"
                              onClick={handleClick}
                            />
                            <Menu
                              id="simple-menu"
                              anchorEl={anchorEl}
                              keepMounted
                              open={Boolean(anchorEl)}
                              onClose={handleClose}
                            >
                              <MenuItem
                                onClick={() => MoreFunc(row, "view_more")}
                              >
                                View More
                              </MenuItem>
                              <MenuItem
                                onClick={() => MoreFunc(row, "edit")}
                              >
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
            <GenerateOutwards details={details} setShow={setShow} />
          ) : null}
          {show === "more_outwards" && (
            <MoreOutwards details={details} setShow={setShow} />
          )}
        </>
      )}
    </>
  );
};

export default Outwards;

const Option = styled.option``;

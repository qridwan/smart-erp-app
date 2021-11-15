import { NativeSelect, FormControl, Menu, MenuItem } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
  BoldText,
  Button,
  TableContainer,
  tableStyles,
  TopBar,
} from "../../../styles/styles";
// import { ReactComponent as SearchIcon } from "../../../Assets/Icons/search.svg";
// import { ReactComponent as FilterIcon } from "../../../Assets/Icons/filter.svg";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import GenerateOutwards from "./GenerateOutwards";
import { useSortableData } from "../Tables/table.sort";
import TableHeadCell from "../Tables/TableHead";
import ViewMoreOutwards from "./ViewMoreOutwards";
import { setShow } from "../../../Redux/actions/renderActions";
import { connect } from "react-redux";
import GetOutwards from "../../../Api/GetOutwards";
import { UserContext } from "../../../context/UserProvider";

const Outwards = ({ show, setShow }) => {
  const { outwards } = GetOutwards();
  const user = useContext(UserContext);
  const { role } = user;
  const [arr, setArr] = useState([0]);
  const classes = tableStyles();
  const [anchorEl, setAnchorEl] = useState([]);
  const [details, setDetails] = useState({});
  const [state, setState] = useState({
    id: 1,
    age: "",
    name: "",
  });
  const handleChange = (event, index) => {
    setArr(
      arr.map((a, j) => {
        if (j == index) return parseInt(event.target.value);
        else return a;
      })
    );
  };
  useEffect(() => {
    setShow("outwardsTable");
  }, []);
  useEffect(() => {
    if (outwards.length) {
      let anchors = [];
      let currArr = [];
      outwards.forEach((pd) => {
        anchors.push(null);
        currArr.push(0);
      });
      setArr(currArr);
      setAnchorEl(anchors);
    }
  }, [outwards.length, show]);

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

  const { requestSort, sortConfig } = useSortableData(outwards);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const MoreFunc = (row, info) => {
    setDetails({ ...row, info: info });
    setShow(info);
  };
  return (
    <>
      {show === "outwardsTable" ? (
        <div>
          <TopBar className="">
            <BoldText> Outwards </BoldText>

            {/* HIDE SEARCH AREA */}
            {/* <SearchContainer>
              <section className="w-100 d-flex justify-content-between align-items-center">
                <div className="m-0 p-0 d-flex">
                  <SearchIcon
                    style={{ marginRight: "0.8rem", width: "20px" }}
                  />
                  <Autocomplete
                    id="custom-input-demo"
                    options={clients}
                    getOptionLabel={(option) => option.name}
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
            </SearchContainer> */}
            {role !== "role-2" && (
              <div>
                <Button onClick={() => setShow("generateOutwards")}>
                  Generate New
                </Button>
              </div>
            )}
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
                {outwards.map((row, index) => {
                  return (
                    <TableRow
                      key={row.key}
                      style={
                        index % 2 !== 0 ? { background: "#F4F4F4" } : undefined
                      }
                    >
                      <TableCell component="th" scope="row" align="center">
                        {row.key}
                      </TableCell>
                      <TableCell align="center">{row.deliveryDate}</TableCell>
                      <TableCell align="center">
                        <FormControl className={classes.formControl}>
                          <NativeSelect
                            value={state.key}
                            onChange={(e) => handleChange(e, index)}
                            name={row.item}
                            className={classes.selectEmpty}
                            inputProps={{ "aria-label": "item" }}
                          >
                            {row.item?.map((item, j) => {
                              return (
                                <Option key={j} value={j} title={item.sent}>
                                  {item.name}
                                </Option>
                              );
                            })}
                          </NativeSelect>
                        </FormControl>
                      </TableCell>
                      <TableCell align="center">{row.agency}</TableCell>
                      <TableCell align="center">
                        {row.item[arr[index]]?.quantity}
                      </TableCell>
                      <TableCell align="center">{row.pincode}</TableCell>
                      <TableCell align="center">{row.generated_by}</TableCell>
                      <TableCell
                        align="center"
                        className={
                          row.status === "intransit"
                            ? "text-success"
                            : "text-primary"
                        }
                      >
                        {row.status}
                      </TableCell>
                      <TableCell align="center">{row.deliveryDate}</TableCell>
                      <TableCell align="center">
                        {row.status !== "delivered" && (
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
                              <MenuItem onClick={() => MoreFunc(row, "view")}>
                                View More
                              </MenuItem>
                              {role !== `role-1` && (
                                <MenuItem onClick={() => MoreFunc(row, "edit")}>
                                  Edit
                                </MenuItem>
                              )}
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
          {(show === "generateOutwards" || show === "edit") && (
            <GenerateOutwards
              details={details}
              setShow={setShow}
              setDetails={setDetails}
            />
          )}
          {show === "view" && (
            <ViewMoreOutwards
              details={details}
              setShow={setShow}
              setDetails={setDetails}
            />
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  setShow: setShow,
};
export default connect(mapStateToProps, mapDispatchToProps)(Outwards);
const Option = styled.option``;

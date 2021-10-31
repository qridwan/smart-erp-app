import React, { useEffect } from "react";
import {
  BoldText,
  Button,
  TableContainer,
  tableStyles,
  TopBar,
} from "../../../styles/styles";
// import { ReactComponent as SearchIcon } from "../../../Assets/Icons/search.svg";
import {
  FormControl,
  Menu,
  MenuItem,
  NativeSelect,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useState } from "react";
import styled from "styled-components";
import GenerateInwards from "./GenerateInwards";
import TableHeadCell from "../Tables/TableHead";
import { useSortableData } from "../Tables/table.sort";
import ViewMoreInwards from "./ViewMoreInwards";
import { setShow } from "../../../Redux/actions/renderActions";
import { connect } from "react-redux";
import GetClients from "../../../Api/GetClients";
import GetInwards from "../../../Api/GetInwards";

const Inwards = ({ show, setShow }) => {
  const classes = tableStyles();
  const { inwards } = GetInwards();
  const [state, setState] = useState({
    id: 1,
    age: "",
    name: "",
  });
  const [anchorEl, setAnchorEl] = useState([]);
  const [details, setDetails] = useState({});
  const [currArr, setCurrArr] = useState([]);
  useEffect(() => {
    setShow("inwardsTable");
    setAnchorEl([]);
  }, []);

  useEffect(() => {
    if (inwards.length) {
      let anchors = [];
      let currArr = [];
      inwards.forEach((pd) => {
        anchors.push(null);
        currArr.push(0);
      });
      setCurrArr(currArr);
      setAnchorEl(anchors);
    }
  }, [inwards.length, show]);

  const handleClick = (event, index) => {
    setAnchorEl(
      anchorEl.map((a, i) => {
        if (i == index) {
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
        if (i == index) {
          return null;
        } else {
          return a;
        }
      })
    );
  };

  const { requestSort, sortConfig } = useSortableData(inwards);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const MoreFunc = (row, info) => {
    console.log({ row });
    setDetails({ ...row, info: info });
    setShow(info);
    handleClose();
  };

  const handleChange = (event, index) => {
    setCurrArr(
      currArr.map((i, j) => {
        if (j == index) return parseInt(event.target.value);
        else return j;
      })
    );
  };

  useEffect(() => {
    console.log("currArr chnaged");
  }, [currArr]);

  return (
    <div>
      {show === "inwardsTable" && (
        <TopBar>
          <BoldText>Inwards</BoldText>
          {/* <SearchContainer>
              <section className="w-100 d-flex justify-content-start align-items-center">
                <div className="m-0 p-0 d-flex">
                  <SearchIcon
                    style={{ marginRight: "0.8rem", width: "20px" }}
                  />
                  <div className="w-100">
                    <Autocomplete
                      id="custom-input-demo"
                      options={options}
                      renderInput={(params) => (
                        <div className="" ref={params.InputProps.ref}>
                          <SearchInput
                            placeholder="Search by- AGENCY NAME/ORDER No."
                            type="text"
                            {...params.inputProps}
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>
              </section>
            </SearchContainer> */}
          <Button outline onClick={() => setShow("generateInwards")}>
            Generate Inwards
          </Button>
        </TopBar>
      )}
      {show === "inwardsTable" ? (
        <InwardsTableContainer>
          <TableContainer className="mt-3">
            <Table className={classes.table} aria-label="simple table">
              <TableHeadCell
                classes={classes}
                show={show}
                requestSort={requestSort}
                getClassNamesFor={getClassNamesFor}
              />
              <TableBody>
                {inwards.map((row, index) => {
                  console.log("🚀 ~ {orders.map ~ row", { row });
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
                      <TableCell align="center">{row.agency}</TableCell>
                      <TableCell align="center">
                        <FormControl className={classes.formControl}>
                          <NativeSelect
                            value={state.key}
                            onChange={(e) => handleChange(e, index)}
                            name={row.item}
                            className={classes.selectEmpty}
                            inputProps={{ "aria-label": "age" }}
                          >
                            {row.item.map((item, i) => {
                              return (
                                <option title={item.name} key={i} value={i}>
                                  {item.name}
                                </option>
                              );
                            })}
                          </NativeSelect>
                        </FormControl>
                      </TableCell>

                      <TableCell align="center">
                        {row.item[currArr[index]]?.good_condition}
                      </TableCell>
                      <TableCell align="center">
                        {row.item[currArr[index]]?.not_working}
                      </TableCell>
                      <TableCell align="center">
                        {row.item[currArr[index]]?.damaged
                          ? row.item[currArr[index]]?.damaged
                          : "-"}
                        {/* {parseInt(row.item[currArr[index]]?.quantity) -
                          parseInt(row.item[currArr[index]]?.received)} */}
                      </TableCell>
                      <TableCell align="center">{row.receivedDate}</TableCell>
                      <TableCell
                        align="center"
                        className={
                          row.auditStatus === "Complete"
                            ? "text-success"
                            : "text-danger"
                        }
                      >
                        {row.auditStatus}
                      </TableCell>
                      <TableCell align="center">
                        {row.status !== "Delivered" && (
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
                              <MenuItem onClick={() => MoreFunc(row, "edit")}>
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
        </InwardsTableContainer>
      ) : (
        <>
          {show === "generateInwards" || show === "edit" ? (
            <GenerateInwards
              details={details}
              setShow={setShow}
              setDetails={setDetails}
            />
          ) : null}
          {show === "view" && (
            <ViewMoreInwards details={details} setShow={setShow} />
          )}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  setShow: setShow,
};
export default connect(mapStateToProps, mapDispatchToProps)(Inwards);

const InwardsTableContainer = styled.div``;

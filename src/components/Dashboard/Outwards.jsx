import {
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
} from "@material-ui/core";
import { IconButton, makeStyles, Paper } from "@material-ui/core";
import dateFormat from "dateformat";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import {
  BoldText,
  Button,
  SearchContainer,
  SubText,
  TableContainer,
  TopBar,
} from "../../styles/styles";
import { ReactComponent as SearchIcon } from "../../Assets/Icons/search.svg";
import { ReactComponent as FilterIcon } from "../../Assets/Icons/filter.svg";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Dropdown } from "react-bootstrap";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
    paddingTop: "30px",
  },
  thead: {
    borderBottom: "none",
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "21px",
    color: "#6D83AE",
    background: "#F7F9FD",
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
];
const Outwards = () => {
  const [date, setDate] = useState("loading...");
  const classes = useStyles();
  const [state, setState] = useState({
    id: 1,
    age: "",
    name: "hai",
  });

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

  useEffect(() => {
    const now = new Date();
    const today = dateFormat(now, "dS mmmm yyyy");
    setDate(today);
  }, []);

  return (
    <div>
      <TitleContainer>
        <BoldText> Outwards </BoldText>
        <SubText> Today, {date} </SubText>
      </TitleContainer>
      <TopBar className="py-0">
        <SearchContainer>
          <section className="w-100 d-flex justify-content-between">
            <SearchIcon />
            <Input
              placeholder="Search by Role, Experience, etc."
              type="text"
            ></Input>
            <FilterIcon className="" />
          </section>
        </SearchContainer>
        <div>
          <Button> Generate New </Button>
        </div>
      </TopBar>
      <TableContainer className="mt-5">
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.thead}>ORDER NO.</TableCell>
              <TableCell className={classes.thead} align="center">
                SHIPPING DATE
              </TableCell>
              <TableCell className={classes.thead} align="center">
                ITEM NAME
              </TableCell>
              <TableCell className={classes.thead} align="center">
                AGENCY NAME
              </TableCell>
              <TableCell className={classes.thead} align="center">
                TOTAL Qty.
              </TableCell>
              <TableCell className={classes.thead} align="center">
                SENT
              </TableCell>
              <TableCell className={classes.thead} align="center">
                PENDING
              </TableCell>
              <TableCell className={classes.thead} align="center">
                STATUS
              </TableCell>
              <TableCell className={classes.thead} align="center">
                MORE
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              let key = row.title;
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
                        <option value={row.item}>{row.item}</option>
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                      </NativeSelect>
                    </FormControl>
                  </TableCell>
                  <TableCell align="center" className="text-decoration-underline">{row.agency}</TableCell>
                  <TableCell align="center">{row.quantity}</TableCell>
                  <TableCell align="center">{row.sent}</TableCell>
                  <TableCell align="center">{row.pending}</TableCell>
                  <TableCell align="center"
                  className={row.status === "In-Transit" ? "text-success" : "text-primary"}
                  >{row.status}</TableCell>
                  <TableCell align="center">
                    <Dropdown>
                      <Dropdown.Toggle variant="white" id="dropdown-basic">
                        <MoreHorizIcon />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="">
                          View More
                        </Dropdown.Item>
                        <Dropdown.Item href="">Edit</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Outwards;

const TitleContainer = styled.div`
  padding: 40px 100px 0 100px;
`;

const Input = styled.input`
  width: 80%;
  height: 25px;
  margin-left: 30px;
  font-family: Lexend;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  color: #848484;
  background: transparent;
  border: none;
  :focus {
    outline: none;
  }
  @media only screen and (max-width: 768px) {
    width: 150px;
    height: 15px;
    font-size: 12px;
    margin: 0px 5px;
  }
`;

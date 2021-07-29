import React, { useState } from "react";
import {
  Avatar,
  BoldText,
  Button,
  ButtonContainer,
  DeleteButton,
  EditButton,
  SearchContainer,
  SearchInput,
  style,
  SubText,
  TableContainer,
  TableImage,
  TopBar,
} from "../../styles/styles";
import { ReactComponent as SearchIcon } from "../../Assets/Icons/search.svg";
import { DataGrid } from "@material-ui/data-grid";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import employee1 from "../../Assets/Images/emp-1.png";

const columns = [
  {
    field: "photos",
    headerName: "Photos",
    width: 80,
    sortable: false,
    align: "start",
    renderCell: (params) => {
      return (
        <img
          src={params.row.photos}
          alt={params.id}
          height="45px"
          width="45px"
        />
      );
    },
  },
  {
    field: "name",
    headerName: "Name",
    width: 120,
    sortable: false,
    align: "center",
  },
  {
    field: "employee_id",
    headerName: "Employee ID",
    align: "center",
    type: "number",
    width: 130,
    sortable: false,
  },
  {
    field: "joining_date",
    headerName: "Joining Date",
    width: 130,
    align: "center",
    sortable: false,
    renderCell: (params) => {
      return <span style={{ color: "blue" }}>{params.row.joining_date}</span>;
    },
  },
  {
    field: "designation",
    headerName: "Designation",
    align: "center",
    width: 120,
    sortable: false,
  },
  {
    field: "location",
    headerName: "Location",
    width: 110,
    type: "number",
    align: "center",
    sortable: false,
  }
];

const rows = [
  {
    id: "1",
    photos: employee1,
    name: "Snow Man",
    employee_id: "23888998231",
    joining_date: "27-06-2020",
    designation: "Supervisor",
    location: "Delhi",
  },
  {
    id: "2",
    photos: employee1,
    name: "Snow Man",
    employee_id: "23888998231",
    joining_date: "27-06-20",
    designation: "Supervisor",
    location: "Delhi",
  },
  {
    id: "3",
    photos: employee1,
    name: "Snow Man",
    employee_id: "23888998231",
    joining_date: "27-06-20",
    designation: "Supervisor",
    location: "Delhi",
  },
  {
    id: "4",
    photos: employee1,
    name: "Snow Man",
    employee_id: "23888998231",
    joining_date: "27-06-20",
    designation: "Supervisor",
    location: "Delhi",
  },
];

const Employees = ({ date }) => {
  const [show, setShow] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <div>
      <TopBar className="px-5 py-4">
        <div>
          <BoldText> Employees </BoldText>
          <SubText> Today, {date} </SubText>
        </div>
        <div className="text-center mt-lg-5">
          <Button onClick={() => setShow("generate")}>+ Add Employees</Button>
        </div>
      </TopBar>
      <div className="mb-5 mr-5 d-flex justify-content-between">
        <HiddenButtons
          className={selectedItems.length ? "visible" : "invisible"}
        >
          <EditButton> Edit </EditButton>
          <DeleteButton> Delete </DeleteButton>
        </HiddenButtons>
        <SearchContainer style={{ maxWidth: "300px", margin: "0 40px 0 0" }}>
          <section className="w-100 d-flex justify-content-between">
            <SearchIcon />
            <SearchInput
              placeholder="Search by client..."
              type="text"
            ></SearchInput>
          </section>
        </SearchContainer>
      </div>
      <Row className="w-100 p-0 m-0">
        <Col md={8} xs={12} className="pl-4">
          <TableContainer className="w-100 m-0">
            <DataGrid
              rows={rows}
              style={style.table}
              columns={columns}
              pageSize={10}
              rowHeight={65}
              autoPageSize
              hideFooterSelectedRowCount
              disableColumnMenu
              checkboxSelection
              scrollbarSize={5}
              onSelectionModelChange={(e) => {
                let selectedItemsIdArray = e;
                let selectedItems = [];
                selectedItemsIdArray.forEach((id) =>
                  selectedItems.push(rows.find((row) => row.id === id))
                );
                setSelectedItems(selectedItems);
              }}
              disableSelectionOnClick
              autoHeight
              hideFooter
            />
          </TableContainer>
        </Col>
        <Col md={4} xs={12}>
          <RecentActivityContainer>
            <Heading>Recent Activity</Heading>
            <RecentEmployee>
              <Avatar> S </Avatar>
              <Content>
                <HistoryText>Order Created</HistoryText>
                <TimeCreated>10 min ago</TimeCreated>
              </Content>
            </RecentEmployee>
            <RecentEmployee>
              <Avatar> S </Avatar>
              <Content>
                <HistoryText>Order Created</HistoryText>
                <TimeCreated>10 min ago</TimeCreated>
              </Content>
            </RecentEmployee>
            <RecentEmployee>
              <Avatar> S </Avatar>
              <Content>
                <HistoryText>Order Created</HistoryText>
                <TimeCreated>10 min ago</TimeCreated>
              </Content>
            </RecentEmployee>
            <RecentEmployee>
              <Avatar> S </Avatar>
              <Content>
                <HistoryText>Order Created</HistoryText>
                <TimeCreated>10 min ago</TimeCreated>
              </Content>
            </RecentEmployee>
          </RecentActivityContainer>
        </Col>
      </Row>
    </div>
  );
};

export default Employees;

const RecentActivityContainer = styled.div`
  border: 3px solid rgba(20, 55, 126, 0.1);
  box-sizing: border-box;
  border-radius: 19px;
  margin-right: 20px;
`;
const RecentEmployee = styled.div`
  padding: 15px 20px;
  display: flex;
`;
const Content = styled.div``;
const HistoryText = styled.p`
  font-weight: 500;
  font-size: 18px;
  line-height: 2px;
  color: rgba(45, 56, 80, 0.91);
  padding: 0;
  margin: 0;
`;
const TimeCreated = styled.span`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: rgba(45, 56, 80, 0.43);
  padding: 0;
  margin: 0;
`;
const Heading = styled.p`
  font-family: Poppins;
  font-weight: 600;
  font-size: 20px;
  line-height: 25px;
  color: rgba(45, 56, 80, 0.91);
  padding: 15px 20px;
`;

const HiddenButtons = styled.div`
margin: 0 40px;
`

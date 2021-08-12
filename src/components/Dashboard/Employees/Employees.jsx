import React, { useState } from "react";
import {
  Avatar,
  BoldText,
  Button,
  DeleteButton,
  EditButton,
  Heading,
  SearchContainer,
  SearchInput,
  style,
  TableContainer,
  TopBar,
} from "../../../styles/styles";
import { ReactComponent as SearchIcon } from "../../../Assets/Icons/search.svg";
import { DataGrid } from "@material-ui/data-grid";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import employee1 from "../../../Assets/Images/emp-1.png";
import ModalEmployee from "./ModalEmployee";
import Autocomplete from "@material-ui/lab/Autocomplete";

const columns = [
  {
    field: "photos",
    headerName: "Photos",
    width: 100,
    sortable: true,
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
    sortable: true,
    align: "center",
  },
  {
    field: "employee_id",
    headerName: "Employee ID",
    align: "center",
    type: "number",
    width: 130,
    sortable: true,
  },
  {
    field: "joining_date",
    headerName: "Joining Date",
    width: 130,
    align: "center",
    sortable: true,
    renderCell: (params) => {
      return <span style={{ color: "blue" }}>{params.row.joining_date}</span>;
    },
  },
  {
    field: "designation",
    headerName: "Designation",
    align: "center",
    width: 120,
    sortable: true,
  },
  {
    field: "location",
    headerName: "Location",
    width: 110,
    type: "number",
    align: "center",
    sortable: true,
  },
];

const rows = [
  {
    id: "1",
    photos: employee1,
    name: "Snow Man-1",
    employee_id: "23888998231",
    joining_date: "27-06-2020",
    designation: "Supervisor",
    location: "Delhi",
  },
  {
    id: "2",
    photos: employee1,
    name: "Snow Man-2",
    employee_id: "5448998231",
    joining_date: "27-06-20",
    designation: "Administrator",
    location: "Chennai",
  },
  {
    id: "3",
    photos: employee1,
    name: "Snow Man-3",
    employee_id: "2233998231",
    joining_date: "27-06-20",
    designation: "Executive",
    location: "Mumbai",
  },
  {
    id: "4",
    photos: employee1,
    name: "Snow Man-4",
    employee_id: "1118998231",
    joining_date: "27-06-20",
    designation: "Admin",
    location: "Panjab",
  },
];

const Employees = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handlePopup = () => {
    openModal();
  };
  const options = ["client1", "client2", "client3"];
  return (
    <div>
      <TopBar className="">
        <div className="d-flex flex-wrap">
          <BoldText> Employees </BoldText>
          <HiddenButtons
          className={selectedItems.length ? "visible mx-lg-2" : "invisible"}
        >
          <DeleteButton> Delete </DeleteButton>
          <EditButton
            className={selectedItems.length === 1 ? "visible" : "invisible"}
          >
            Edit
          </EditButton>
        </HiddenButtons>
        </div>
        
        <EmployeeSearchContainer>
          <section className="w-100 d-flex justify-content-start align-items-center">
            <div className="m-0 p-0 d-flex">
              <SearchIcon style={{ marginRight: "0.8rem", width: "20px" }} />
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
          </section>
          
        </EmployeeSearchContainer>
        <div className="text-center">
          <Button onClick={handlePopup}>+ Add Employees</Button>
        </div>
      </TopBar>
      <Row className="w-100 p-0 m-0">
        <Col lg={8} md={12} className="pl-4">
          <TableContainer className="w-100 m-0 overflow-hidden">
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
            <ModalEmployee modalIsOpen={modalIsOpen} closeModal={closeModal} />
          </TableContainer>
        </Col>
        <Col
          lg={4}
          md={6}
          xs={12}
          className="offset-lg-0 offset-md-3  justify-content-center"
        >
          <RecentActivityContainer>
            <Heading className="pt-md-3 px-md-4">Recent Activity</Heading>
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
  @media only screen and (max-width: 1000px) {
    margin: 0;
    margin-top: 20px;
  }
`;
const RecentEmployee = styled.div`
  padding: 15px 20px;
  display: flex;
`;
const Content = styled.div``;
const HistoryText = styled.p`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: rgba(45, 56, 80, 0.91);
  padding: 0;
  margin: 10px 0 10px 0;
  @media only screen and (max-width: 1000px) {
    font-size: 14px;
    line-height: 18px;
    padding: 0;
    margin: 2px 0 0 0;
  }
`;
const TimeCreated = styled.span`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: rgba(45, 56, 80, 0.43);
  padding-top: 10px;
  margin: 0;
  @media only screen and (max-width: 1000px) {
    font-size: 12px;
    line-height: 18px;
    padding-top: 4px;
  }
`;

const HiddenButtons = styled.div`
  margin: 0;
  @media only screen and (max-width: 1000px) {
    order: 2;
  }
`;

const EmployeeSearchContainer = styled(SearchContainer)`
  max-width: 300px;
  margin: 0;
  @media only screen and (max-width: 1000px) {
    max-width: 100%;
    margin: 10px 10px 0 0;
    order: 1;
  }
`;

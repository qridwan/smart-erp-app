import React, { useState, useEffect } from "react";
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
import ModalEmployee from "./ModalEmployee";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddEmployee from "./AddEmployee";
import { db as firebase } from '../../../firebase';

const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 120,
    sortable: true,
    align: "center",
  },
  {
    field: "id",
    headerName: "Employee ID",
    align: "center",
    type: "number",
    width: 130,
    sortable: true,
  },
  {
    field: "joiningDate",
    headerName: "Joining Date",
    width: 130,
    align: "center",
    sortable: true,
    renderCell: (params) => {
      return <span style={{ color: "blue" }}>{params.row.joiningDate}</span>;
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
    field: "email",
    headerName: "email",
    width: 150,
    type: "number",
    align: "center",
    sortable: true,
  },
];


const Employees = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  const [show, setShow] = useState("employees");
  const [info, setInfo] = useState({});
  const [employees, setEmployees] = useState([]);


  function closeModal() {
    setIsOpen(false);
  }

  const handlePopup = () => {
    if (show === 'employees') {
      setShow("addEmployee");
      setInfo({
        edit: false
      });
      setSelectedItems([]);
    } else {
      setShow("employees");
      setInfo({
        edit: false
      })
      setSelectedItems([]);
    }
  };

  useEffect(() => {
    const employeeRef = firebase.ref("inventory/employees");
    employeeRef.once("value", (snapshot) => {
      let employees = []
      Object.keys(snapshot.val()).map((key) => {
        employees.push(snapshot.val()[key])
      })
      console.log(snapshot.val());
      console.log(employees);
      setEmployees(employees);
    });
  }, [show]);

  const options = ["client1", "client2", "client3"];

  const handleEdit = () => {
    console.log(selectedItems);
    setInfo({
      ...selectedItems[0],
      edit: true
    });
    setShow("addEmployee");
    setSelectedItems([]);
  }

  const handleDelete = () => {

  }

  return (
    <>
    <TopBar className="">
      <div className="d-flex flex-wrap">
        <BoldText> Employees </BoldText>
        <HiddenButtons
          className={selectedItems.length ? "visible mx-lg-2" : "invisible"}
        >
          <DeleteButton
            onClick={handleDelete}
          > Delete </DeleteButton>
          <EditButton
            onClick={handleEdit}
            className={selectedItems.length === 1 ? "visible" : "invisible"}
          >
            Edit
          </EditButton>
        </HiddenButtons>
      </div>
      
      {show === 'employees' ? (
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
      
      ) : (
        <></>
      )}
      
      <div className="text-center">
        <Button onClick={handlePopup}>
          {show === 'employees' ?  'Add Employees' : 'View Employees'}
          
        </Button>
      </div>
    </TopBar>
    {show === "employees" ? (
      <div>
        <Row className="w-100 p-0 m-0">
          <Col lg={12} md={12} className="pl-4">
            <TableContainer className="w-100 m-0 overflow-hidden">
              <DataGrid
                rows={employees}
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
                    selectedItems.push(employees.find((row) => row.id === id))
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
          {/* <Col
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
          </Col> */}
        </Row>
      </div>
    ) : (
      <AddEmployee setShow={setShow} info={info} />
    )}
    </>
  );
};

export default Employees;

// const RecentActivityContainer = styled.div`
//   border: 3px solid rgba(20, 55, 126, 0.1);
//   box-sizing: border-box;
//   border-radius: 19px;
//   margin-right: 20px;
//   @media only screen and (max-width: 1000px) {
//     margin: 0;
//     margin-top: 20px;
//   }
// `;
// const RecentEmployee = styled.div`
//   padding: 15px 20px;
//   display: flex;
// `;
// const Content = styled.div``;
// const HistoryText = styled.p`
//   font-weight: 500;
//   font-size: 18px;
//   line-height: 22px;
//   color: rgba(45, 56, 80, 0.91);
//   padding: 0;
//   margin: 10px 0 10px 0;
//   @media only screen and (max-width: 1000px) {
//     font-size: 14px;
//     line-height: 18px;
//     padding: 0;
//     margin: 2px 0 0 0;
//   }
// `;
// const TimeCreated = styled.span`
//   font-weight: 500;
//   font-size: 16px;
//   line-height: 20px;
//   color: rgba(45, 56, 80, 0.43);
//   padding-top: 10px;
//   margin: 0;
//   @media only screen and (max-width: 1000px) {
//     font-size: 12px;
//     line-height: 18px;
//     padding-top: 4px;
//   }
// `;

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

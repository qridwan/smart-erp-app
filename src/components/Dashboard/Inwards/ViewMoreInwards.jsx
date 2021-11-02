import { makeStyles, TableBody } from "@material-ui/core";
import { Table, TableCell, TableHead, TableRow } from "@material-ui/core";
import React, { useRef } from "react";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import DocumentPreview from "../../../atoms/DocumentPreview";
import TopbarAtom from "../../../atoms/TopbarAtom";

import {
  AddItemContainer,
  ApplyFormInput,
  InputDiv,
  Label,
  MainTitle,
  TableContainer,
  TableInput,
  TableSelect,
} from "../../../styles/styles";
const useStyles = makeStyles({
  table: {
    width: "100%",
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

const ViewMoreInwards = ({ details }) => {
  const classes = useStyles();
  const topbarRef = useRef(null);
  return (
    <div>
      <TopbarAtom
        topRef={topbarRef}
        title="View Inwards"
        goBack="inwardsTable"
        buttonTitle="Summery"
        buttonType="outline"
      />
      <AddItemContainer ref={topbarRef}>
        <form>
          <Container>
            <Row className="w-100 p-0 m-0">
              <Col lg={3} md={6} xs={12}>
                <InputDiv>
                  <Label>Agency Name</Label>
                  <ApplyFormInput
                    details
                    type="text"
                    readOnly
                    value={details.agency}
                  />
                </InputDiv>
              </Col>
              <Col lg={6} md={6} xs={12}>
                <InputDiv>
                  <Label>Email</Label>
                  <ApplyFormInput
                    details
                    type="text"
                    readOnly
                    value={details.generatedBy}
                  />
                </InputDiv>
              </Col>
              <Col lg={3} md={6} xs={12}>
                <InputDiv>
                  <Label>Date Received</Label>
                  <ApplyFormInput
                    details
                    readOnly
                    value={details.receivedDate}
                    required
                  />
                </InputDiv>
              </Col>
              <Col lg={6} md={6} xs={12}>
                <InputDiv>
                  <Label>Agency Address</Label>
                  <ApplyFormInput
                    details
                    readOnly
                    value={details.agencyAdress}
                    required
                  />
                </InputDiv>
              </Col>
              <Col lg={3} md={6} xs={12}>
                <InputDiv>
                  <Label>City</Label>
                  <ApplyFormInput
                    details
                    readOnly
                    value={details.city}
                    required
                  />
                </InputDiv>
              </Col>
              <Col lg={3} md={6} xs={12}>
                <InputDiv>
                  <Label>State</Label>
                  <ApplyFormInput
                    details
                    readOnly
                    value={details.state}
                    required
                  />
                </InputDiv>
              </Col>
              <Col lg={3} md={6} xs={12}>
                <InputDiv>
                  <Label>Pincode</Label>
                  <ApplyFormInput
                    details
                    readOnly
                    value={details.pincode}
                    required
                  />
                </InputDiv>
              </Col>
              <DocumentPreview
                label="Inward Document"
                docFile={details.inwardDocument}
              />
              <DocumentPreview
                label="Courier Document"
                docFile={details.courierDocument}
              />
            </Row>

            <MainTitle>Received Details</MainTitle>
            <Row className="w-100 p-0 m-0">
              <Col lg={3} md={6} xs={12}>
                <InputDiv>
                  <Label>Mode of Transport</Label>
                  <ApplyFormInput
                    details
                    type="text"
                    readOnly
                    value={details.transport}
                  />
                </InputDiv>
              </Col>
              <Col lg={3} md={6} xs={12}>
                <InputDiv>
                  <Label>Courier Name</Label>
                  <ApplyFormInput
                    details
                    type="courierName"
                    readOnly
                    value={details.courier_name}
                  />
                </InputDiv>
              </Col>
              <Col lg={3} md={6} xs={12}>
                <InputDiv>
                  <Label>Courier/Flight No.</Label>
                  <ApplyFormInput
                    details
                    type="text"
                    readOnly
                    value={details.courier_no}
                  />
                </InputDiv>
              </Col>
              <Col lg={3} md={6} xs={12}>
                <InputDiv>
                  <Label>Received Location</Label>
                  <ApplyFormInput
                    details
                    type="text"
                    readOnly
                    value={details.receivedLocation}
                  />
                </InputDiv>
              </Col>
              <Col lg={3} md={6} xs={12}>
                <InputDiv>
                  <Label>Generated by</Label>
                  <ApplyFormInput
                    details
                    type="text"
                    readOnly
                    value={details.generatedBy}
                  />
                </InputDiv>
              </Col>

              <Col lg={3} md={6} xs={12}>
                <InputDiv>
                  <Label>Audit Status</Label>
                  <ApplyFormInput
                    details
                    type="text"
                    readOnly
                    value={details.auditStatus}
                  />
                </InputDiv>
              </Col>
              <Col md={9} xs={12}>
                <InputDiv>
                  <Label>Remarks</Label>
                  <ApplyFormInput
                    details
                    readOnly
                    value={details.remarks ? details.remarks : "-"}
                    type="text"
                  />
                </InputDiv>
              </Col>
            </Row>
            <section>
              <MainTitle>All Items</MainTitle>
              <TableContainer className="w-100">
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.thead} align="center">
                        #
                      </TableCell>
                      <TableCell className={classes.thead} align="center">
                        Item Name
                      </TableCell>
                      <TableCell className={classes.thead} align="center">
                        Total Qty.
                      </TableCell>
                      <TableCell className={classes.thead} align="center">
                        Received
                      </TableCell>
                      <TableCell className={classes.thead} align="center">
                        Good Condition
                      </TableCell>
                      <TableCell className={classes.thead} align="center">
                        Bad Condition
                      </TableCell>
                      <TableCell className={classes.thead} align="center">
                        Not Working
                      </TableCell>
                      <TableCell
                        className={classes.thead}
                        align="center"
                      ></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {details?.item?.map((item, index) => {
                      return (
                        <TableRow key={item.id}>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">
                            <TableSelect readOnly value={`${item.name}`}>
                              <option value="IP Camera">{item.name}</option>
                            </TableSelect>
                          </TableCell>
                          <TableCell align="center">
                            <TableInput readOnly value={`${item.quantity}`} />
                          </TableCell>

                          <TableCell align="center">
                            <TableInput
                              readOnly
                              value={`${item.received}`}
                            ></TableInput>
                          </TableCell>
                          <TableCell align="center">
                            <TableInput
                              readOnly
                              value={`${item.good_condition}`}
                            ></TableInput>
                          </TableCell>
                          <TableCell align="center">
                            <TableInput
                              readOnly
                              value={`${item.bad_condition}`}
                            ></TableInput>
                          </TableCell>
                          <TableCell align="center">
                            <TableInput
                              readOnly
                              value={`${item.not_working}`}
                            ></TableInput>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </section>
          </Container>
        </form>
      </AddItemContainer>
    </div>
  );
};

export default ViewMoreInwards;
const Container = styled.div`
  padding: 0 50px;
  @media only screen and (max-width: 1000px) {
    padding: 0 25px;
  }
`;

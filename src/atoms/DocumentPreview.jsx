import React from "react";
import { Col } from "react-bootstrap";
import styled from "styled-components";
import { InputDiv, Label } from "../styles/styles";

const DocumentPreview = ({ docFile, label }) => {
  const handlePreview = () => {
    console.log("🚀 ~ DocumentPreview ~ docFile", docFile);
  };
  return (
    <Col lg={3} md={6} xs={12}>
      <InputDiv >
        <Label>{label}</Label>
        <DocPreview onClick={handlePreview} href={docFile}>Preview Document</DocPreview>
      </InputDiv>
    </Col>
  );
};

export default DocumentPreview;
const DocPreview = styled.a`
  cursor: pointer;
  text-decoration: none;
  border-radius: 5px;
  width: 100%;
  padding: 0 15px;
  font-family: Poppins;
  font-weight: 500;
  color: #0075ff;
  height: 45px;
  border: 1px solid #8e8e8e;
  display: flex;
  align-items: center;
  font-size: 15px;
  @media only screen and (max-width: 1000px) {
    padding: 0 8px;
    height: 40px;
    font-size: 15px;
  }
`;

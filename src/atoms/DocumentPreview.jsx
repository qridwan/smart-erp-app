import React, { useState } from "react";
import { Col } from "react-bootstrap";
import styled from "styled-components";
import PreviewFile from "../components/Shared/PreviewFile";
import { InputDiv, Label } from "../styles/styles";

const DocumentPreview = ({ docFile, label }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <Col lg={3} md={6} xs={12}>
      <InputDiv>
        <Label>{label}</Label>
        <DocPreview
          // href={docFile}
          onClick={() => setModalIsOpen(true)}
        >
          Preview Document
        </DocPreview>
      </InputDiv>
      <PreviewFile
        modalIsOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        file={docFile}
      />
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

import React, { useRef } from "react";
import { Col } from "react-bootstrap";
import uploadIcon from "../Assets/Icons/upArrow.svg";
import { UploadIcon, UploadInput, InputDiv, Label, UploadButton } from "../styles/styles";

const DocInputAtom = ({ docFile, setDocFile, label }) => {
  const hiddenDocInput = useRef(null);
  const handleDocClick = () => {
    hiddenDocInput.current.click();
  };
  const handleDocInputChange = (e) => {
    const docFileUploaded = e.target.files[0];
    setDocFile(docFileUploaded);
  };
  return (
    <Col md={3} xs={12}>
      <InputDiv>
        <Label>{label}</Label>
        <UploadButton
          outline
          onClick={(e) => {
            e.preventDefault();
            handleDocClick();
          }}
        >
          <span>{docFile ? docFile.name : "Upload Document"}</span>
          <UploadIcon>
            <img src={uploadIcon} alt="up arrow" />
          </UploadIcon>
        </UploadButton>
        <UploadInput
          ref={hiddenDocInput}
          className="px-3 py-2"
          onChange={handleDocInputChange}
          style={{ display: "none" }}
          type="file"
        />
      </InputDiv>
    </Col>
  );
};

export default DocInputAtom;

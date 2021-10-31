import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import React, { useRef } from "react";
import { Col } from "react-bootstrap";
import uploadIcon from "../Assets/Icons/upArrow.svg";
import { bucket } from "../firebase";
import {
  UploadIcon,
  UploadInput,
  InputDiv,
  Label,
  UploadButton,
} from "../styles/styles";

const DocInputAtom = ({ docFile, setDocFile, label, disabled, setDocUrl }) => {
  const hiddenDocInput = useRef(null);
  const handleDocClick = () => {
    hiddenDocInput.current.click();
  };
  const handleDocInputChange = (e) => {
    const docFileUploaded = e.target.files[0];
    setDocFile(docFileUploaded);
    uploadDocument(e.target.files[0])
  };

  const uploadDocument = (file) => {
  console.log("🚀 ~ uploadDocument ~ file", {file})
    const storageRef = ref(bucket, `/inventory-docs/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log("~~ error ~~", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setDocUrl(downloadURL);
        });
      }
    );
  };

  return (
    <Col md={3} xs={12}>
      <InputDiv>
        <Label disabled={disabled ? disabled : false}>{label}</Label>
        <UploadButton
          disabled={disabled ? disabled : false}
          outline
          onClick={(e) => {
            e.preventDefault();
            handleDocClick();
          }}
        >
          <span>{docFile ? docFile.name : "Upload Document"}</span>
          <UploadIcon disabled={disabled ? disabled : false}>
            <img src={uploadIcon} alt="up arrow" />
          </UploadIcon>
        </UploadButton>
        <UploadInput
          disabled={disabled ? disabled : false}
          ref={hiddenDocInput}
          className="px-3 py-2 d-none"
          onChange={handleDocInputChange}
          type="file"
        />
      </InputDiv>
    </Col>
  );
};

export default DocInputAtom;

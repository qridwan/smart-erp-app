import React from "react";
import { useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import CopyToClipboard from "react-copy-to-clipboard";
import Modal from "react-modal";
import { Heading, Input } from "../../styles/styles";
import clipboard from "../../Assets/Icons/modal_clip_board.png";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import { ReactComponent as CrossIcon } from "../../Assets/Icons/cross.svg";

const customStyles = {
  content: {
    maxWidth: "846px",
    maxHeight: "523px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "29px",
    border: "none",
  },
};

Modal.setAppElement("#root");
const ModalEmployee = ({ modalIsOpen, closeModal }) => {
  function afterOpenModal() {}
  const [copyClipboard, setCopyClipboard] = useState({
    value: "https://bit.ly/bdsushfg/h92640wbfbd/add/anfbwiwfdi93/",
    copied: false,
  });
  const handleCross = () => {
    setCopyClipboard({ copied: false, value: copyClipboard.value });
    closeModal();
  };
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Employee"
      >
        <div>
          <div className="d-flex justify-content-between align-items-center my-lg-2">
            <Heading className="">Add Employee</Heading>
            <IconButton onClick={handleCross}>
              <CrossIcon />
            </IconButton>
          </div>
          <InputGroup
            className="mb-3"
            style={{
              border: "2px solid rgba(45, 56, 80, 0.29)",
              borderRadius: "11px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ModalFormControl
              value={copyClipboard.value}
              onChange={({ target: { value } }) =>
                setCopyClipboard({ value, copied: false })
              }
            />
            <CopyToClipboard
              style={{ cursor: "pointer", border: "none", margin: "10px" , padding: "0" }}
              text={copyClipboard.value}
              onCopy={() =>
                setCopyClipboard({ copied: true, value: copyClipboard.value })
              }
            >
              <InputGroup.Text
                style={{ cursor: "pointer", border: "none", margin: "0px", padding: "0px" }}
                id="basic-addon1"
                className="bg-white"
              >
                <IconButton>
                  <img src={clipboard} alt="" height="30" />
                </IconButton>
              </InputGroup.Text>
            </CopyToClipboard>
          </InputGroup>
          <Instruction>
            Send this link to the person whom you’re willing to add
          </Instruction>
          {copyClipboard.copied ? (
            <span style={{ color: "green", float: "right" }}>Copied.</span>
          ) : null}
        </div>
      </Modal>
    </div>
  );
};

export default ModalEmployee;
const Instruction = styled.span`
  font-weight: normal;
  font-size: 13px;
  line-height: 19px;
  color: #0075ff;
`;

const ModalFormControl = styled.input`
  border: none;
  width: 530px;
  height: 68px;
  margin: 3px;
  padding: 0 20px;
  :focus {
    outline: none;
  }
  @media only screen and (max-width: 1000px) {
    width: 280px;
    height: auto;
    padding: 0 10px;
  }
`;

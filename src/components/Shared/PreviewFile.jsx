import React from "react";
import Modal from "react-modal";
import CheckValideFile from "../../Helper/CheckValidFile";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import { DocumentViewer } from "react-documents";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "25px",
  },
};

const PreviewFile = ({ modalIsOpen, setIsOpen, file }) => {
  const { isImage } = CheckValideFile(file);
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Preview Modal"
        ariaHideApp={false}
      >
        <div className="">
          {isImage ? (
            <div className="text-center">
              <img
                src={file}
                alt="Files"
                className="rounded img-fluid"
                style={{
                  maxWidth: "90%",
                  maxHeight: "500px",
                  minWidth: "400px",
                }}
              />
            </div>
          ) : file ? (
            <div
            className="w-md-75 w-100"
              style={{
                minHeight: "500px",
                minWidth: "700px",
              }}
            >
              <DocumentViewer
                className="w-100"
                style={{
                  minHeight: "500px",
                }}
                viewerUrl={
                  "https://docs.google.com/gview?url=%URL%&embedded=true"
                }
                url={file}
                viewer="url"
              ></DocumentViewer>
            </div>
          ) : (
            <div className="text-center">
              <SentimentVeryDissatisfiedIcon style={{ fontSize: "80px" }} />
              <p className="h2 d-block">Empty</p>
            </div>
          )}
          <div className="text-center p-lg-3 p-1">
            {isImage && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={file}
                download
                className="btn btn-primary px-3 px-lg-5 m-lg-3 m-1"
              >
                Full Width
              </a>
            )}
            <button
              onClick={closeModal}
              className="btn btn-primary px-3 px-lg-5 m-lg-3 m-1"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PreviewFile;

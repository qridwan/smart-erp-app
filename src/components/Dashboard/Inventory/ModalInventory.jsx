import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Fab } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { IconButton } from "@material-ui/core";
import { Heading } from "../../../styles/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '10px',
    border: "none",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  clearIcon: { 
      fontSize: '50px',
  }, iconWrapper: {
      textAlign: 'center',
  }
}));
const ModalInventory = ({ open, setOpen }) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <button type="button" onClick={handleOpen}>
        react-transition-group
      </button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Heading className="m-0 px-5 pt-3">Deleted</Heading>
            <div className={classes.iconWrapper}>
            <IconButton onClick={handleClose} >
              <ClearIcon className={classes.clearIcon}/>
            </IconButton>
            </div>
           
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalInventory;

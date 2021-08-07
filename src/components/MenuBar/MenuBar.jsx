import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import {
  SidebarContent,
  sidebarData,
  SidebarIconWrapper,
  Title,
} from "../Dashboard/Dashboard";
import { IconButton } from "@material-ui/core";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    borderRadius: "10px",
    padding: "15px 20px",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const MenuBar = ({ show, setShow }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <MenuRoundedIcon style={{ color: "red" }} />
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {sidebarData.map((obj, i) => {
          const handleOnCLick = () => {
            setShow(obj.title.toLowerCase());
          };
          return (
            <section key={i}>
              <SidebarContent
                className={
                  show === obj.title.toLowerCase()
                    ? "active side_nav"
                    : "side_nav"
                }
                onClick={(event) => handleOnCLick(event)}
              >
                <SidebarIconWrapper>{obj.icon}</SidebarIconWrapper>
                <Title className="title">{obj.title}</Title>
              </SidebarContent>
            </section>
          );
        })}
      </StyledMenu>
    </div>
  );
};

export default MenuBar;

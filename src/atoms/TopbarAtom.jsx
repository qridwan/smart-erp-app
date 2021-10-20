import React from "react";
import { BoldText, Button, TopBar } from "../styles/styles";
import backArrow from "../Assets/Icons/backArrow.svg";
import { connect } from "react-redux";
import { setShow } from "../Redux/actions/renderActions";

const TopbarAtom = ({
  setShow,
  goto,
  title,
  topRef,
  buttonRef,
  buttonTitle,
  goBack,
}) => {
  return (
    <TopBar ref={topRef} className="">
      <div className="d-flex align-items-center">
        <img
          src={backArrow}
          alt="home inventory"
          height="18px"
          style={{ marginRight: "10px", cursor: "pointer" }}
          onClick={() => {
            setShow(goBack);
          }}
        />
        <BoldText>{title}</BoldText>
      </div>

      {buttonRef && (
        <div>
          <Button
            // outline
            onClick={() => {
              buttonRef.current.click();
              //   reset();
              //   setShow("outwards");
              //   setDetails({});
            }}
            className="px-5"
          >
            {buttonTitle}
          </Button>
        </div>
      )}
    </TopBar>
  );
};
const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  // removeFromInventory: removeFromInventory,
  setShow: setShow,
};
export default connect(mapStateToProps, mapDispatchToProps)(TopbarAtom);
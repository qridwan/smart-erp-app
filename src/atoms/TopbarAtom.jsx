import React from "react";
import { BoldText, Button, TopBar } from "../styles/styles";
import backArrow from "../Assets/Icons/backArrow.svg";
import { connect } from "react-redux";
import { setShow } from "../Redux/actions/renderActions";

const TopbarAtom = ({
  setShow,
  title,
  topRef,
  buttonRef,
  buttonTitle,
  buttonType,
  goBack,
}) => {
  return (
    <TopBar ref={topRef} className="">
      <div className="d-flex align-items-center">
        <img
          src={backArrow}
          alt="home inventory"
          height="18px"
          className="mt-2 mt-lg-0" 
          style={{ marginRight: "10px", cursor: "pointer" }}
          onClick={() => {
            setShow(goBack);
          }}
        />
        <BoldText>{title}</BoldText>
      </div>

      {buttonTitle && (
        <div>
          <Button
            buttonType
            outline={Boolean(buttonType)}
            onClick={() => {
              buttonRef && buttonRef.current.click();
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

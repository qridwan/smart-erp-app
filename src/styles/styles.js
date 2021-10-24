import { makeStyles } from "@material-ui/core";
import styled, { css } from "styled-components";
import Calender from "../Assets/Icons/Calender.png";

export const addTableStyles = makeStyles({
  table: {
    width: "80%",
    paddingTop: "30px",
    margin: "0 auto",
  },
  thead: {
    borderBottom: "none",
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "21px",
    color: "#6D83AE",
    background: "#F7F9FD",
  },
  button: {
    display: "block",
    marginTop: "20px",
  },
  formControl: {
    margin: "10px",
    minWidth: 120,
  },
});

export const inventoryStyles = makeStyles({
  table: {
    width: "80%",
    paddingTop: "30px",
    margin: "0 auto",
  },
  thead: {
    borderBottom: "none",
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "21px",
    color: "#6D83AE",
    background: "#F7F9FD",
  },
  button: {
    display: "block",
    marginTop: "20px",
  },
  formControl: {
    margin: "10px",
    minWidth: 120,
  },
});

export const style = {
  table: {
    border: "none",
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "16px",
    width: "auto",
    color: "black",
    "& .MuiDataGridRoot": {
      "& .MuiDataGrid-Cell:focus": {
        outline: "none",
      },
    },
    // "& .MuiDataGrid-root": {
    //   "& .MuiDataGrid-Cell:focus": {
    //     outline: "none",
    //   },
    // },
  },
};

export const tableStyles = makeStyles({
  table: {
    minWidth: 650,
    paddingTop: "30px",
    marginTop: "0",
  },
  thead: {
    borderBottom: "none",
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "21px",
    color: "#6D83AE",
    background: "#F7F9FD",
    cursor: "pointer",
  },
  button: {
    display: "block",
    marginTop: "20px",
  },
  formControl: {
    margin: "10px",
    minWidth: 120,
  },
});

export const Heading = styled.p`
  font-family: Poppins;
  font-weight: 600;
  font-size: 20px;
  line-height: 25px;
  color: rgba(45, 56, 80, 0.91);
  padding: 15px 20px;
  @media only screen and (max-width: 1000px) {
    padding: 5px 0 0 10px;
    font-size: 18px;
    line-height: 20px;
  }
`;
export const Avatar = styled.span`
  border-radius: 50%;
  background: #79e4b7;
  box-shadow: 4px 4px 17px rgba(189, 202, 228, 0.55);
  display: flex;
  height: 55px;
  width: 55px;
  justify-content: center;
  align-items: center;
  font-family: Poppins;
  font-weight: 500;
  font-size: 26px;
  line-height: 35px;
  color: #ffffff;
  margin-right: 20px;
  @media only screen and (max-width: 1000px) {
    height: 45px;
    width: 45px;
    font-size: 22px;
    line-height: 32px;
    margin-right: 10px;
  }
`;

export const BoldText = styled.p`
  font-family: Poppins;
  font-weight: 600;
  font-size: 22px;
  line-height: 30px;
  color: #2d3850;
  margin: 0;
  @media only screen and (max-width: 1000px) {
    padding-top: 10px;
    font-size: 18px;
    line-height: 25px;
  }
`;

export const ImageInputArea = styled.div`
  width: 70%;
  border: 1px solid rgba(0, 0, 0, 0.22);
  box-sizing: border-box;
  border-radius: 10px;
  padding: 25px;
  margin: 0 auto;
  text-align: center;
  cursor: pointer;
`;
export const ImageInput = styled.img``;
export const Button = styled.button`
  cursor: pointer;
  height: auto;
  border-radius: 9px;
  padding: 8px 15px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  box-sizing: border-box;
  ${(props) =>
    props.outline
      ? css`
          border: 1px solid #0075ff;
          background: white;
          color: #0075ff;
        `
      : css`
          background: #0075ff;
          border: none;
          color: #ffffff;
        `}
  @media only screen and (max-width:800px) {
    margin-top: 4px;
    font-size: 14px;
    line-height: 20px;
    padding: 4px 8px;
    margin-bottom: 2px;
    height: 40px;
  }
`;

export const DashboardContent = styled.div`
  width: 98%;
  background: white;
  border-radius: 30px;
  min-height: 95vh;
  margin: 30px 8px 20px 0px;
  box-shadow: 4px 4px 17px rgba(189, 202, 228, 0.55);
  padding-bottom: 30px;
  @media only screen and (max-width: 1300px) {
    margin: 30px 8px 20px 20px;
  }
  @media only screen and (max-width: 1000px) {
    width: 100%;
    min-height: auto;
    margin: 5px 8px 20px 0px;
  }
`;

export const TableImage = styled.div`
  border: 2px solid rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
  border-radius: 8px;
  max-height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Label = styled.label`
  display: block;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #6c6c6c;
  ${(props) =>
    props.disabled === true &&
    css`
      // border: 1px solid rgba(0, 0, 0, 0.08);
      color: rgba(108, 108, 108, 0.3);
    `}
  ${(props) =>
    props.details
      ? css`
          padding-bottom: 2px;
        `
      : css`
          padding-bottom: 8px;
        `}
  @media only screen and (max-width: 1000px) {
    font-size: 12px;
    margin-top: 8px;
    margin-bottom: 0;
  }
`;

export const Input = styled.input`
  border: 1px solid #8e8e8e;
  box-sizing: border-box;
  border-radius: 5px;
  height: 40px;
  max-width: 300px;
  padding: 0 15px;
  border-radius: 5px;
  color: black;
  :focus {
    outline: none;
  }
  @media only screen and (max-width: 1000px) {
    width: 100%;
    font-size: 12px;
  }
`;

export const InputDiv = styled.div`
  padding-bottom: 20px;
  @media only screen and (max-width: 1000px) {
    padding-bottom: 10px;
  }
`;
export const AddItemsContainer = styled.div`
  @media only screen and (max-width: 1000px) {
    overflow-x: scroll;
  }
`;
export const UploadInput = styled(Input)`
  background: #dfdfdf;
  border: 1px solid #b3b3b3;
  box-sizing: border-box;
  border-radius: 5px;
`;
export const UploadIcon = styled.span`
  padding: 0 6px;
  border: 1px solid #6c6c6c;
  border-radius: 50%;
  background: #e5e5e5;
  ${(props) =>
    props.disabled === true &&
    css`
      border: 1px solid rgba(0, 0, 0, 0.08);
      color: rgba(108, 108, 108, 0.3);
    `}
`;
export const UploadButton = styled.div`
  // text-align: center;
  // color: #0075ff;
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  line-height: 22px;
  color: #6c6c6c;
  background: #ffffff;
  ${(props) =>
    props.disabled === true &&
    css`
      border: 1px solid rgba(0, 0, 0, 0.08);
      color: rgba(108, 108, 108, 0.3);
    `}
  ${(props) =>
    props.type === "transparent" &&
    css`
      color: #0075ff;
      justify-content: center;
      text-align: center;
    `};
  ${(props) =>
    props.outline
      ? css`
          border: 1px solid rgba(0, 0, 0, 0.22);
          box-sizing: border-box;
          border-radius: 5px;
          padding: 10px;
          width: 100%;
        `
      : css`
          border: none;
          padding: 5px;
        `}
`;

export const SubmitButton = styled.input`
  width: 180px;
  height: 50px;
  border-radius: 9px;
  border: none;
  font-family: Poppins;
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  color: #ffffff;
  margin-top: 40px;
  ${(props) => {
    return props.disabled === "disabled"
      ? css`
          background: rgba(0, 117, 255, 0.44);
        `
      : css`
          background: #0075ff;
        `;
  }}
  @media only screen and (max-width: 1000px) {
    margin-top: 20px;
    font-size: 16px;
    line-height: 20px;
    width: 150px;
    height: 45px;
    margin-bottom: 10px;
  }
`;

export const Error = styled.span`
  display: block;
  font-size: 12px;
  color: red;
`;

export const ApplyFormInput = styled.input`
  border-radius: 5px;
  width: 100%;
  padding: 0 15px;
  font-family: Poppins;
  font-weight: 500;
  font-size: 18px;
  color: black;
  height: 45px;
  :focus {
    outline: none;
  }
 
  ${(props) =>
    props.details
      ? css`
          border: 1px solid #ffffff;
          padding: 0;
          @media only screen and (max-width: 1000px) {
            padding: 0;
            height: 30px;
            font-size: 15px;
          }
        `
      : css`
          border: 1px solid #8e8e8e;
          @media only screen and (max-width: 1000px) {
            padding: 0 8px;
            height: 40px;
            font-size: 15px;
          }
        `};
  }

  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::-webkit-calendar-picker-indicator {
    color: rgba(0, 0, 0, 0);
    opacity: 1;
    display: block;
    background: url(${Calender}) no-repeat;
    width: 20px;
    height: 20px;
    border-width: thin;
  }
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 55px 15px 55px;
  flex-wrap: wrap;
  @media only screen and (max-width: 1000px) {
    padding: 30px 20px 20px 20px;
  }
`;

export const SearchContainer = styled.div`
  width: 540px;
  height: 45px;
  background: #eff3fb;
  border-radius: 13px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: start;
  @media only screen and (max-width: 1000px) {
    width: 250px;
    height: 44px;
  }
`;

export const Container = styled.div`
  // @media only screen and (max-width: 1000px) {
  //   width: 100%;
  //   text-align: center;
  // }
`;

export const TableContainer = styled.div`
  width: 95%;
  min-height: auto;
  margin: 0 auto;
  overflow-x: scroll;
  @media only screen and (max-width: 1000px) {
    width: 95%;
    min-height: auto;
  }
`;

export const AddItemContainer = styled.div`
  border: 1px solid #dadbd8;
  box-sizing: border-box;
  width: 90%;
  min-height: auto;
  margin: 0 auto;
  padding-top: 30px;
  margin-bottom: 50px;
  @media only screen and (max-width: 1000px) {
    min-height: auto;
    padding-top: 20px;
    margin-bottom: 20px;
  }
`;

export const SearchInput = styled.input`
  width: 250px;
  height: 25px;
  font-family: Lexend;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  color: #848484;
  background: transparent;
  border: none;
  :focus {
    outline: none;
  }
  ::placeholder {
    font-size: 12px;
  }
  @media only screen and (max-width: 1000px) {
    width: 150px;
    height: 15px;
    font-size: 12px;
    margin: 0px 5px;
  }
`;

export const MainTitle = styled.p`
  font-family: Poppins;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  padding: 0 5px;
  padding-bottom: 15px;
  padding-top: 25px;
  margin: 0 8px;
  color: #2d3850;
  @media only screen and (max-width: 1000px) {
    font-size: 16px;
    line-height: 20px;
    padding: 0 12px;
    padding-top: 10px;
    padding-bottom: 0px;
  }
`;

export const Select = styled.select`
  border: 1px solid #8e8e8e;
  border-radius: 5px;
  height: 45px;
  width: 100%;
  padding: 0 15px;
  color: black;
  :focus {
    outline: none;
  }
`;

export const TableInput = styled.input`
  width: 100px;
  height: 34px;
  border: 0.5px solid #2d3850;
  box-sizing: border-box;
  border-radius: 5px;
  text-align: center;
  color: #000000;
  :focus {
    outline: none;
  }
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

export const TableSelect = styled.select`
  width: 182px;
  height: 40px;
  border: 0.5px solid #2d3850;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 10px;
  :focus {
    outline: none;
  }
`;

export const ButtonContainer = styled.div`
  margin: 0 50px;
  @media only screen and (max-width: 1000px) {
    margin: 0px 20px;
  }
`;
export const EditButton = styled(Button)`
  background: #eff3fb;
  border-radius: 9px;
  font-family: Poppins;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: rgba(45, 56, 80, 0.91);
  margin-left: 25px;
  @media only screen and (max-width: 1000px) {
    font-size: 12px;
    line-height: 16px;
  }
`;
export const DeleteButton = styled(Button)`
  background: #ff0000;
  border-radius: 9px;
  font-family: Poppins;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  @media only screen and (max-width: 1000px) {
    font-size: 12px;
    line-height: 16px;
  }
`;

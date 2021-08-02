import styled, { css } from "styled-components";

export const style = {
  table: {
    border: "none",
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: "12px",
    lineHeight: "16px",
    color: "black",
    "& .MuiDataGrid-root": {
      "& .MuiDataGrid-Cell:focus": {
        outline: "none",
      },
    },
  },
};
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
  height: 65px;
  width: 65px;
  border-radius: 50%;
  background: #79e4b7;
  box-shadow: 4px 4px 17px rgba(189, 202, 228, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Poppins;
  font-weight: 500;
  font-size: 30px;
  line-height: 45px;
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
  padding-top: 18px;
  font-weight: 600;
  font-size: 25px;
  line-height: 35px;
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
  height: auto;
  border-radius: 9px;
  padding: 15px 25px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
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
    margin-top: 10px;
    font-size: 14px;
    line-height: 20px;
    padding: 10px 18px;
    height: 40px;
  }
`;

export const DashboardContent = styled.div`
  width: 100%;
  background: white;
  border-radius: 30px;
  min-height: 95vh;
  margin: 30px 8px 20px 0px;
  box-shadow: 4px 4px 17px rgba(189, 202, 228, 0.55);
  padding-bottom: 30px;
  @media only screen and (max-width: 1000px) {
    min-height: auto;
    margin: 30px 8px 20px 0px;
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
  padding-bottom: 8px;
  @media only screen and (max-width: 768px) {
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
  @media only screen and (max-width: 768px) {
    width: 100%;
    font-size: 12px;
  }
`;

export const InputDiv = styled.div`
  padding-bottom: 20px;
  @media only screen and (max-width: 768px) {
    padding-bottom: 10px;
  }
`;

export const UploadInput = styled(Input)`
  background: #dfdfdf;
  border: 1px solid #b3b3b3;
  box-sizing: border-box;
  border-radius: 5px;
`;

export const UploadButton = styled.button`
  text-align: center;
  font-size: 15px;
  line-height: 22px;
  color: #0075ff;
  background: #ffffff;
  ${(props) =>
    props.outline
      ? css`
          border: 1px solid rgba(0, 0, 0, 0.22);
          box-sizing: border-box;
          border-radius: 5px;
          padding: 10px 0;
          width: 100%;
        `
      : css`
          border: none;
          padding: 5px 0;
        `}
`;

export const SubmitButton = styled.input`
  width: 250px;
  height: 60px;

  border-radius: 9px;
  border: none;
  font-family: Poppins;
  font-weight: 500;
  font-size: 22px;
  line-height: 30px;
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
  @media only screen and (max-width: 768px) {
    margin-top: 30px;
    font-size: 18px;
    line-height: 25px;
    width: 200px;
    height: 56px;
    margin-bottom: 10px;
  }
`;

export const Error = styled.span`
  display: block;
  font-size: 12px;
  color: red;
`;

export const ApplyFormInput = styled.input`
  border: 1px solid #8e8e8e;
  border-radius: 5px;
  height: 45px;
  width: 100%;
  padding: 0 15px;
  color: black;
  :focus {
    outline: none;
  }
  @media only screen and (max-width: 1000px) {
    padding: 0 8px;
    height: 40px;
  }
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 100px 0 100px;
  flex-wrap: wrap;
  @media only screen and (max-width: 1000px) {
    padding: 10px 20px 0 20px;
  }
`;

export const SubText = styled.p`
  font-weight: 500;
  font-size: 22px;
  line-height: 33px;
  color: rgba(45, 56, 80, 0.5);
  @media only screen and (max-width: 1000px) {
    font-size: 16px;
    line-height: 20px;
  }
`;

export const SearchContainer = styled.div`
  width: 540px;
  height: 64px;
  background: #eff3fb;
  border-radius: 13px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: start;
  @media only screen and (max-width: 768px) {
    width: 250px;
    height: 44px;
  }
`;

export const Container = styled.div`
  // @media only screen and (max-width: 768px) {
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
  min-height: 550px;
  margin: 0 auto;
  padding-top: 50px;
  margin-bottom: 50px;
  @media only screen and (max-width: 1000px) {
    min-height: auto;
    padding-top: 20px;
    margin-bottom: 20px;
  }
`;

export const SearchInput = styled.input`
  width: 80%;
  height: 25px;
  margin-left: 30px;
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
  @media only screen and (max-width: 768px) {
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
  padding: 0 12px;
  padding-bottom: 15px;
  margin: 0;
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
  text-decoration-line: underline;
  color: #000000;
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
  margin: 0 100px;
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
  margin-left: 25px;
  @media only screen and (max-width: 1000px) {
    font-size: 12px;
    line-height: 16px;
  }
`;

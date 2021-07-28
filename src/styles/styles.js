import styled, { css } from "styled-components";

export const BoldText = styled.p`
  font-family: Poppins;
  padding-top: 18px;
  font-weight: 600;
  font-size: 25px;
  line-height: 35px;
  color: #2d3850;
  margin: 0;
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
  height: 50px;
  border-radius: 9px;
  padding: 0 25px;
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
`;

export const DashboardContent = styled.div`
  background: white;
  border-radius: 30px;
  min-height: 95vh;
  margin: 30px 10px 0 10px;
  box-shadow: 4px 4px 17px rgba(189, 202, 228, 0.55);
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
    font-size: 14px;
    margin-top: 15px;
    margin-bottom: 6px;
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
    width: 250px;
    height: 76px;
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
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 100px 0 100px;
`;

export const SubText = styled.p`
  font-weight: 500;
  font-size: 22px;
  line-height: 33px;
  color: rgba(45, 56, 80, 0.5);
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
  height: 70vh;
  margin: 0 auto;
  text-align: center;
`;

export const AddItemContainer = styled.div`
  border: 1px solid #dadbd8;
  box-sizing: border-box;
  width: 90%;
  min-height: 550px;
  margin: 0 auto;
  padding-top: 50px;
  margin-bottom: 50px;
`;

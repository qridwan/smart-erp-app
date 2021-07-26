import styled from "styled-components";

export const BoldText = styled.p`
  font-family: Poppins;
  padding-top: 18px;
  font-weight: 600;
  font-size: 25px;
  line-height: 45px;
  color: #2d3850;
`;

export const Button = styled.button`
background: #0075FF;
border: none;
height: 50px;
border-radius: 9px;
padding: 0 25px;
font-family: Poppins;
font-style: normal;
font-weight: 500;
font-size: 18px;
line-height: 27px;
color: #FFFFFF;
`

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
`
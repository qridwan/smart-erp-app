import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { Container } from "../Login";
import { ReactComponent as InventoryImg } from "../../Assets/Icons/inventory.svg";
import { ReactComponent as InOutWardImg } from "../../Assets/Icons/in-outwards.svg";
import { ReactComponent as EmployeeImg } from "../../Assets/Icons/employee.svg";
import { ReactComponent as ClientsImg } from "../../Assets/Icons/clients.svg";
import { NavLink } from "react-router-dom";
import Inventory from "./Inventory";
import { BoldText, DashboardContent } from "../../styles/styles";
import Outwards from "./Outwards";

const sidebarData = [
  {
    icon: <InventoryImg className="icons" />,
    title: "Inventory",
  },
  {
    icon: <InOutWardImg className="icons" />,
    title: "Outwards",
  },
  {
    icon: <InOutWardImg className="icons" />,
    title: "Inwards",
  },
  {
    icon: <EmployeeImg className="icons" />,
    title: "Employee",
  },
  {
    icon: <ClientsImg className="icons" />,
    title: "Clients",
  },
];
const Dashboard = () => {
  const [show, setShow] = useState("inventory");
  const user = "Arjun.";
  const avatarText = user.slice(0, 1);
  console.log(
    "🚀 ~ file: Dashboard.jsx ~ line 36 ~ Dashboard ~ avatarText",
    avatarText
  );
  return (
    <Container>
      <Row className="w-100">
        <Col md={3} sm={12}>
          <Sidebar>
            <Head>
              <Content>
                <Avatar>{avatarText}</Avatar>
                <BoldText> {user} </BoldText>
              </Content>
            </Head>
            {sidebarData.map((obj, i) => {
              return (
                <Section>
                  {/* <Icon src={obj.icon} alt={obj.title}/> */}
                  <SidebarContent
                    className="side_nav"
                    onClick={() => setShow(obj.title.toLowerCase())}
                    //  to={obj.title.toLocaleLowerCase()}
                  >
                    {obj.icon}
                    <Title>{obj.title}</Title>
                  </SidebarContent>
                </Section>
              );
            })}
          </Sidebar>
        </Col>
        <Col md={9} sm={12} className="">
          <ContentSection>
            <DashboardContent >
            {show === "inventory" && <Inventory />}
            {show === "outwards" && <Outwards />}
            </DashboardContent>
          </ContentSection>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;

const Sidebar = styled.div`
padding-left: 50px;
`;
const Section = styled.div``;
const Title = styled.p`
  display: inline-block;
  font-family: Poppins;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #2d3850;
`;
const SidebarContent = styled.div`
  width: 278px;
  height: 63px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  padding: 15px 40px;
  &:hover {
    background: #0075ff;
    border-radius: 12px;
    ${Title} {
      color: white;
    }
  }
`;
const ContentSection = styled.div`
  min-height: 100vh;
  margin: 0px auto;
`;
const Head = styled.div`
margin-bottom: 70px;
margin-top: 40px;
`;
const Content = styled.div`
  display: flex;
  align-items: center;
`;
const Avatar = styled.span`
  height: 65px;
  width: 65px;
  border-radius: 50%;
  background: #79e4b7;
  box-shadow: 4px 4px 17px rgba(189, 202, 228, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 45px;
  color: #ffffff;
  margin-right: 20px;
`;

const Icon = styled.img`
  fill: red;
`;

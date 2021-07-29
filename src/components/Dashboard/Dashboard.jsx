import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { Container } from "../Login";
import { ReactComponent as InventoryImg } from "../../Assets/Icons/inventory.svg";
import { ReactComponent as InOutWardImg } from "../../Assets/Icons/in-outwards.svg";
import { ReactComponent as EmployeeImg } from "../../Assets/Icons/employee.svg";
import { ReactComponent as ClientsImg } from "../../Assets/Icons/clients.svg";
import { NavLink } from "react-router-dom";
import Inventory from "./Inventory";
import { Avatar, BoldText, DashboardContent } from "../../styles/styles";
import Outwards from "./Outwards";
import Inwards from "./Inwards";
import Employees from "./Employees";
import dateFormat from "dateformat";

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
    title: "Employees",
  },
  {
    icon: <ClientsImg className="icons" />,
    title: "Clients",
  },
];
const Dashboard = () => {
  const [date, setDate] = useState("");
  useEffect(() => {
    const now = new Date();
    const today = dateFormat(now, "dS mmmm yyyy");
    setDate(today);
  }, []);

  const [show, setShow] = useState("inventory");
  const user = "Arjun.";
  const avatarText = user.slice(0, 1);
  return (
    <Container>
      <Row className="p-0 w-100">
        <Col md={2} sm={12} className="p-0">
          <Sidebar>
            <Head>
              <Content>
                <Avatar >{avatarText}</Avatar>
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
        <Col md={9} sm={12} className="offset-1 p-0">
          <ContentSection>
            <DashboardContent>
              {show === "inventory" && <Inventory />}
              {show === "outwards" && <Outwards date={date}/>}
              {show === "inwards" && <Inwards />}
              {show === "employees" && <Employees date={date}/>}
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


const Icon = styled.img`
  fill: red;
`;

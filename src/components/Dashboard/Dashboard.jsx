import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { Container } from "../Login";
import { ReactComponent as InventoryImg } from "../../Assets/Icons/inventory.svg";
import { ReactComponent as InOutWardImg } from "../../Assets/Icons/in-outwards.svg";
import { ReactComponent as EmployeeImg } from "../../Assets/Icons/employee.svg";
import { ReactComponent as ClientsImg } from "../../Assets/Icons/clients.svg";
import Inventory from "./Inventory";
import { Avatar, BoldText, DashboardContent } from "../../styles/styles";
import Outwards from "./Outwards";
import Inwards from "./Inwards";
import Employees from "./Employees";
import dateFormat from "dateformat";
import Clients from "./Clients";

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
      <Row className="p-0 m-0 w-100">
        <Col lg={2} md={12} className="p-0">
          <Sidebar>
            <Head>
              <Content>
                <Avatar>{avatarText}</Avatar>
                <BoldText> {user} </BoldText>
              </Content>
            </Head>
            <NavItems>
              {sidebarData.map((obj, i) => {
                const handleOnCLick = () => {
                  setShow(obj.title.toLowerCase());
                };
                return (
                  <Section key={i}>
                    <SidebarContent
                      className={
                        show === obj.title.toLowerCase()
                          ? "active side_nav"
                          : "side_nav"
                      }
                      onClick={(event) => handleOnCLick(event)}
                    >
                      {obj.icon}
                      <Title className="title">{obj.title}</Title>
                    </SidebarContent>
                  </Section>
                );
              })}
            </NavItems>
          </Sidebar>
        </Col>
        <Col lg={9} md={12} className="offset-lg-1 p-0">
          <ContentSection>
            <DashboardContent>
              {show === "inventory" && <Inventory />}
              {show === "outwards" && <Outwards date={date} />}
              {show === "inwards" && <Inwards />}
              {show === "employees" && <Employees date={date} />}
              {show === "clients" && <Clients date={date} />}
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
  @media only screen and (max-width: 1000px) {
    padding-left: 0;
  }
`;
const Section = styled.div``;
const NavItems = styled.div`
  @media only screen and (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
`;
const Title = styled.p`
  display: inline-block;
  font-family: Poppins;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #2d3850;
  margin-bottom: 0;
  @media only screen and (max-width: 1000px) {
    font-size: 14px;
    line-height: 18px;
  }
`;
const SidebarContent = styled.div`
  width: 250px;
  height: 63px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding: 15px 40px;
  @media only screen and (max-width: 1000px) {
    height: 40px;
    width: 160px;
    margin-bottom: 10px;
    padding: 10px 20px;
  }
`;
const ContentSection = styled.div`
  min-height: 100vh;
  margin: 0px auto;
`;
const Head = styled.div`
  margin-bottom: 70px;
  margin-top: 40px;
  @media only screen and (max-width: 1000px) {
    margin-bottom: 15px;
    margin-top: 20px;
  }
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (max-width: 1000px) {
    padding-left: 15px;
  }
`;

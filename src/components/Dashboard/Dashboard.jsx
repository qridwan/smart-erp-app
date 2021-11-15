import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { Container } from "../Login";
import { ReactComponent as InventoryImg } from "../../Assets/Icons/inventory.svg";
import { ReactComponent as InOutWardImg } from "../../Assets/Icons/in-outwards.svg";
import { ReactComponent as EmployeeImg } from "../../Assets/Icons/employee.svg";
import { ReactComponent as ClientsImg } from "../../Assets/Icons/clients.svg";
import { ReactComponent as LogOut } from "../../Assets/Icons/SignOut.svg";
import Inventory from "./Inventory/Inventory";
import { Avatar, BoldText, DashboardContent } from "../../styles/styles";
import Outwards from "./Outwards/Outwards";
import Inwards from "./Inwards/Inwards";
import Employees from "./Employees/Employees";
import Clients from "./Clients/Clients";
import WareHouse from "./Warehouse/WareHouse";
import MenuBar from "../MenuBar/MenuBar";
import { UserContext } from "../../context/UserProvider";
import { connect } from "react-redux";
import { setPath, setShow } from "../../Redux/actions/renderActions";
import { handleLogout } from "../../Api/auth/logout";

const sidebarDataAdmin = [
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
  {
    icon: <LogOut className="icons" />,
    title: "Logout",
  },
];

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
    icon: <ClientsImg className="icons" />,
    title: "Clients",
  },
  {
    icon: <LogOut className="icons" />,
    title: "Logout",
  },
];
const Dashboard = ({ setShow, setPath, show, path }) => {
  const userData = useContext(UserContext);
  const user = userData?.email?.slice(0, userData.email.indexOf("@"));
  const avatarText = user?.slice(0, 1);
  const { role } = userData;
  const sideData = role === "role-3" ? sidebarDataAdmin : sidebarData;

  return (
    <Container>
      <Row className="p-0 m-0 w-100">
        <Col lg={1} md={12} className="p-0">
          <Sidebar>
            <Head>
              <Content>
                <Avatar>{avatarText}</Avatar>
                <BoldText> {user} </BoldText>
              </Content>
              <MenuContainer>
                <MenuBar
                  sideData={sideData}
                  show={path}
                  setShow={setPath}
                  handleLogout={handleLogout}
                />
              </MenuContainer>
            </Head>
            <WebNav>
              <NavItems className="d-flex flex-column">
                {sideData.map((obj, i) => {
                  const Title = obj.title.toLowerCase();
                  return (
                    <Section
                      key={i}
                      className={Title === "logout" ? "mt-auto" : ""}
                      style={{ cursor: "pointer" }}
                    >
                      <SidebarContent
                        className={
                          path === obj.title.toLowerCase()
                            ? "active side_nav"
                            : "side_nav"
                        }
                        onClick={() =>
                          Title === "logout"
                            ? handleLogout()
                            : setPath(obj.title.toLowerCase())
                        }
                      >
                        <SidebarIconWrapper>{obj.icon}</SidebarIconWrapper>
                        <Title className="title">{obj.title}</Title>
                      </SidebarContent>
                    </Section>
                  );
                })}
              </NavItems>
            </WebNav>
          </Sidebar>
        </Col>
        <Col lg={10} md={12} className="offset-lg-1 p-0">
          <ContentSection>
            <DashboardContent>
              {path === "inventory" && <Inventory />}
              {path === "outwards" && <Outwards />}
              {path === "inwards" && <Inwards />}
              {path === "employees" && <Employees />}
              {path === "clients" && <Clients />}
              {path === "warehouse" && <WareHouse />}
            </DashboardContent>
          </ContentSection>
        </Col>
      </Row>
    </Container>
  );
};
const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  setShow: setShow,
  setPath: setPath,
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

const Sidebar = styled.div`
  padding-left: 30px;
  @media only screen and (max-width: 1000px) {
    padding-left: 0;
  }
`;
const Section = styled.div``;
const MenuContainer = styled.div`
  @media only screen and (min-width: 1000px) {
    display: none;
  }
`;
const WebNav = styled.div`
  @media only screen and (max-width: 1000px) {
    display: none;
  }
`;
const NavItems = styled.div`
  height: 80vh;
`;
export const Title = styled.p`
  display: inline-block;
  font-family: Poppins;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #2d3850;
  margin-bottom: 0;
  @media only screen and (max-width: 1000px) {
    font-size: 14px;
    line-height: 18px;
  }
`;
export const SidebarContent = styled.div`
  width: 170px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px 20px;
  @media only screen and (max-width: 1000px) {
    height: 40px;
    width: 160px;
    margin-bottom: 10px;
    padding: 8px 16px;
  }
`;
const ContentSection = styled.div`
  min-height: 100vh;
  margin: 0px auto;
`;
const Head = styled.div`
  margin-bottom: 40px;
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
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

export const SidebarIconWrapper = styled.div`
  svg {
    // stroke: #2D3850;
    // fill: #2D3850;
    fill: rgb(45, 56, 80);
    width: 22px;
    height: 22px;
  }
`;

import React from "react";
import styled from "@emotion/styled";
import Sidebar from "components/layout/Sidebar";

const MainContainer = styled.main`
  background-color: #eeeeee;
  min-height: 100vh;
`;

const SidebarContainer = styled.div`
  position: fixed;
  width: 250px;
  background: #ffffff;
  top: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
`;

const ContentContainer = styled.div`
  margin-left: 250px;
`;

const Layout = ({ children }) => {
  return (
    <MainContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <ContentContainer>{children}</ContentContainer>
    </MainContainer>
  );
};

export default Layout;

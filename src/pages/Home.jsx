import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import useStore from '../store/store';
import Sidebar from '../components/Sidebar';

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Content = styled.main`
  flex: 1;
  overflow-y: auto;
  background-color: ${props => props.theme.colors.gray100};
`;

const Home=()=> {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { fetchContent, fetchStats, fetchQueryLogs } = useStore();

  useEffect(() => {
    fetchContent();
    fetchStats();
    fetchQueryLogs();
  }, []);

  return (
    <Container>
      <Sidebar isOpen={sidebarOpen} />
      <MainContent>
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <Content>
          <Outlet />
        </Content>
      </MainContent>
    </Container>
  );
}

export default Home;

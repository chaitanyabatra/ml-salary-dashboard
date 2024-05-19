import React from 'react';
import { Layout, Menu } from 'antd';
import MainTable from './components/MainTable';
import Analytics from './components/Analytics';
import ChatApp from './components/ChatApp';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">Main Table</Menu.Item>
          <Menu.Item key="2">Analytics</Menu.Item>
          <Menu.Item key="3">Chat App</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <MainTable />
          <Analytics />
          <ChatApp />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>ML Salary Dashboard ©2024</Footer>
    </Layout>
  );
};

export default App;

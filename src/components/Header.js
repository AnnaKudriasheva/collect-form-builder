import React from 'react';
import { Layout, Row, Col }  from '@vgs/elemente';
import { Button } from 'antd';
import { LoginOutlined, BookOutlined, LogoutOutlined } from '@ant-design/icons';

import VGSLogo from '../images/vgs-logo.svg';
import { useAuthContext } from '../context/AuthContext'

const { Header } = Layout;

const FormBuilderHeader = () => {
  const [{ isAuthenticated, isAuthenticating, Auth }] = useAuthContext();

  return (
    <Header style={{ backgroundColor: 'white', boxShadow: '0px 0px 6px rgb(23 31 39 / 30%' }}>
      <Row type="flex" style={{ maxWidth: '1140px', margin: '0 auto' }}>
        <Col span={12}>
          <div className="d-flex">
            <a href="https://www.verygoodsecurity.com/" target="_blank" style={{ display: 'block', width: '215px' }}>
              <VGSLogo width="100%" style={{ verticalAlign: 'middle' }}/>
            </a>
          </div>
        </Col>
        <Col span={12}>
          <div className="d-flex j-end">
            <div>
              <Button className="mr-1" href="https://www.verygoodsecurity.com/docs/vgs-collect/overview" type="primary" icon={<BookOutlined />}>Documentation</Button>
              <Button
                type="default"
                loading={isAuthenticating}
                onClick={Auth && (isAuthenticated ? Auth.logout : Auth.login)}
                icon={isAuthenticated ? <LogoutOutlined /> : <LoginOutlined />}
              >
                {isAuthenticated ? 'Logout' : 'Sign in'}
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Header>   
  )
}

export default FormBuilderHeader;

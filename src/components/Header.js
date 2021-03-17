
import React from 'react';
import { Layout, Row, Col }  from '@vgs/elemente';
import { Button } from 'antd';
import { LoginOutlined, BookOutlined } from '@ant-design/icons';

import VGSLogo from '../images/vgs-logo.svg';

const { Header } = Layout;

const FormBuilderHeader = () => {
  return (
    <Header style={{backgroundColor: 'white', boxShadow: '0px 0px 6px rgb(23 31 39 / 30%'}}>
      <Row type="flex" style={{ maxWidth: '1140px', margin: '0 auto' }}>
        <Col span={12}>
          <div className="d-flex">
            <a href="https://www.verygoodsecurity.com/" target="_blank" style={{ display: 'block', width: '215px'}}>
              <VGSLogo width="100%" style={{ verticalAlign: 'middle'}}/>
            </a>
          </div>
        </Col>
        <Col span={12}>
          <div className="d-flex j-end">
            <a href="https://www.verygoodsecurity.com/docs/vgs-collect/overview" target="_blank" className="mr-1">
              <Button type="primary" icon={<BookOutlined />}>Documentation</Button>
            </a>
            <a href="https://dashboard.verygoodsecurity.com" target="_blank">
              <Button type="outlined" icon={<LoginOutlined />}>Log in</Button>
            </a>
          </div>
        </Col>
      </Row>
    </Header>   
  )
}

export default FormBuilderHeader;

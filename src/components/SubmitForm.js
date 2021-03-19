import React, {useContext, useState, useEffect } from 'react';
import { Row, Col, Input, Select, Divider, Button, Tabs } from '@vgs/elemente';
import { Form } from 'antd';
import { FormContext } from '../context/form-context';

const { Option } = Select;
const { Item } = Form;

const SubmitForm = (props) => {
  const [state, dispatch] = useContext(FormContext);
  const [httpMethod, setHTTPMethod] = useState('POST');
  const [endpoint, setEndpoint] = useState('/');

  const handleFormSave = () => {
    dispatch({ type: "SET_HTTP_METHOD", payload: httpMethod });
    dispatch({ type: "SET_ENDPOINT", payload: endpoint });
  }

  return (
    <> 
      <Form name="submit-setup" initialValues={{endpoint: '/'}} onFinish={handleFormSave}>
        <Row type="flex" gutter={24}>
         <Col xs={24} sm={24} md={24} lg={12}>
            <Item label="HTTP Method" labelCol={{span: 24}} wrapperCol={{span: 24}}>
              <Select defaultValue="POST" style={{ width: '100%' }} onChange={(value) => setHTTPMethod(value)}>
                { ['POST', 'GET', 'PUT'].map((type, idx) => <Option value={type} key={idx}>{type}</Option>) }
              </Select>
            </Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Item label="Endpoint" name="endpoint" labelCol={{span: 24}} wrapperCol={{span: 24}} rules={[{required: true}]}>
              <Input placeholder="/path" onChange={(e) => setEndpoint(e.target.value)}/>
            </Item>
          </Col>
        </Row>
        <Row type="flex" justify="end">
          <Col>
            <Button type="primary" htmlType="submit">Save</Button>
          </Col>
        </Row>
      </Form>
      <Divider />
    </>
  )
}

export default SubmitForm;

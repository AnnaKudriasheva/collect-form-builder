import React, {useContext, useState, useEffect } from 'react';
import getCollectJSConfiguration from '../templates/collect';
import getCollectHTMLConfiguration from '../templates/collect-html';
import getCollectCSSConfiguration from '../templates/collect-css';
import CodeBlock from '../components/CodeBlock';
import { Row, Col, Input, Select, Divider, Button, Form, Tabs } from '@vgs/elemente';

import { FormContext } from '../context/form-context';

const { Option } = Select;
const { Item } = Form;

const SubmitForm = (props) => {
  const [state, dispatch] = useContext(FormContext);
  const [httpMethod, setHTTPMethod] = useState(false);
  const [endpoint, setEndpoint] = useState('');

  const handleFormSave = () => {
    dispatch({ type: "SET_HTTP_METHOD", payload: httpMethod });
    dispatch({ type: "SET_ENDPOINT", payload: endpoint });
  }

  return (
    <> 
      <Form name="test">
        <Row type="flex" gutter={24}>
         <Col xs={24} sm={24} md={24} lg={12}>
            <Item label="HTTP Method">
              <Select defaultValue="POST" style={{ width: '100%' }} onChange={(value) => setHTTPMethod(value)}>
                { ['POST', 'GET', 'PUT'].map((type, idx) => <Option value={type} key={idx}>{type}</Option>) }
              </Select>
            </Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Item label="Endpoint">
              <Input defaultValue="/" placeholder="path" onChange={(e) => setEndpoint(e.target.value)}/>
            </Item>
          </Col>
        </Row>
        <Row type="flex" justify="end">
          <Col>
            <Button onClick={handleFormSave} type="primary">Save</Button>
          </Col>
        </Row>
      </Form>
      <Divider />
    </>
  )
}

export default SubmitForm;

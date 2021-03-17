import React, {useContext, useState, useEffect } from 'react';
import getCollectJSConfiguration from '../templates/collect';
import getCollectHTMLConfiguration from '../templates/collect-html';
import getCollectCSSConfiguration from '../templates/collect-css';
import CodeBlock from '../components/CodeBlock';
import { Row, Col, Input, Select, Divider, Button, Tabs } from '@vgs/elemente';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';


import getRouteConfig from '../templates/inbound-route';
import yaml from 'js-yaml';
import { Form } from 'antd';

import { FormContext } from '../context/form-context';
import { FormStylesContext } from '../context/styles-context';

const { Option } = Select;
const { Item } = Form;
const { TabPane } = Tabs;

const GetCode = (props) => {
  const [state, dispatch] = useContext(FormContext);
  const [styles, dispatchStyles] = useContext(FormStylesContext);
  const [showCode, setShowCode] = useState(false);
  const [jsCode, updateJSCode] = useState('');
  const [htmlCode, updateHTMLCode] = useState('');
  const [cssCode, updateCSSCode] = useState('');

  const updateCodeExamples = () => {
    updateJSCode(getCollectJSConfiguration(state, styles.iframe));
    updateHTMLCode(getCollectHTMLConfiguration(state, styles.iframe));
    updateCSSCode(getCollectCSSConfiguration(state, styles.wrapper));
  }

  const handleFormSubmit = () => {
    updateCodeExamples();
    setShowCode(true);
  }

  const handleYAMLDownload = () => {
    const yamlConfig = yaml.dump(getRouteConfig(state));
    const file = new File([yamlConfig], 'test.yaml', { type: 'text/plain;charset=utf-8' });
    saveAs(file, 'collect.yaml');
  }

  const handleCodeDownload = () => {
    const zip = new JSZip();
    zip.folder('collect-form')
      .file('form.js', jsCode)
      .file('styles.css', cssCode)
      .file('index.html', htmlCode)
    zip.generateAsync({ type: 'blob' })
      .then((content) => {
        saveAs(content, 'collect-form.zip');
    });
  }

  useEffect(() => {
    updateCodeExamples();
  }, [state.form, styles]);

  return (
    <> 
      <Form name="test" initialValues={{ environment: 'sandbox' }} onFinish={handleFormSubmit}>
        <Row type="flex" gutter={24}>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Item label="Vault ID" name="vault-id" labelCol={{span: 24}} wrapperCol={{span: 24}} rules={[{required: true}]}>
              <Input placeholder="tntXXXXXXXX" onChange={(e) => dispatch({ type: "SET_VAULT_ID", payload: e.target.value })}/>
            </Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Item label="Environment" name="environment" wrapperCol={{span: 24}} labelCol={{span: 24}}>
              <Select style={{ width: '100%' }} onChange={(value) => dispatch({ type: "SET_ENV", payload: value })}>
                { ['sandbox', 'live', 'live-eu-1'].map((type, idx) => <Option value={type} key={idx}>{type}</Option>) }
              </Select>
            </Item>
          </Col>
        </Row>
        <Item>
          <Button htmlType="submit" style={{ width: 'fit-content' }}>Generate Code</Button>
        </Item>
      </Form>
      <Divider />
      {showCode && 
        <>
          <Tabs defaultActiveKey="1" type="card">
            <TabPane tab="JS" key="1">
              <CodeBlock code={jsCode} language="javascript" />
            </TabPane>
            <TabPane tab="HTML" key="2">
              <CodeBlock code={htmlCode} language="html" />
            </TabPane>
            <TabPane tab="CSS" key="3">
              <CodeBlock code={cssCode} language="css" />
            </TabPane>
          </Tabs>
          <Button onClick={handleCodeDownload}>Download Code</Button>
          <Divider />
          <Button onClick={handleYAMLDownload}>Download YAML</Button>
        </>
      }
    </>
  )
}

export default GetCode;

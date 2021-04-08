import React, {useContext, useState, useEffect } from 'react';
import { groupBy } from 'lodash';
import { Row, Col, Select, Divider, Button, Tabs, Spin } from '@vgs/elemente';
import { Form } from 'antd';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import yaml from 'js-yaml';

import getCollectJSConfiguration from '../templates/collect';
import getCollectHTMLConfiguration from '../templates/collect-html';
import getCollectCSSConfiguration from '../templates/collect-css';
import getRouteConfig from '../templates/inbound-route';
import { LINKS } from '../utils/constants';

import CodeBlock from '../components/CodeBlock';
import FormField from '../components/FormField';

import { FormContext, FormStylesContext, useUserContext, useAuthContext } from '../context';
import { checkVaultStatus, createRouteRequest, createVault } from '../api'
import { waitUntil } from '../utils'

const { Option } = Select;
const { Item } = Form;
const { TabPane } = Tabs;

const GetCode = () => {
  const [{ organization, organizations }] = useUserContext();
  const [{ isAuthenticated }] = useAuthContext();
  const [state, dispatch] = useContext(FormContext);
  const [styles] = useContext(FormStylesContext);
  const [showCode, setShowCode] = useState(false);
  const [jsCode, updateJSCode] = useState('');
  const [htmlCode, updateHTMLCode] = useState('');
  const [cssCode, updateCSSCode] = useState('');
  const [vaultName, setVaultName] = useState('');
  const [selectedOrg, setSelectedOrg] = useState(organization);
  const [isGeneratingVault, setIsGeneratingVault] = useState(false);
  const groupedOrgsById = groupBy(organizations, 'id');

  const updateCodeExamples = () => {
    updateJSCode(getCollectJSConfiguration(state, styles.iframe));
    updateHTMLCode(getCollectHTMLConfiguration(state, styles.iframe));
    updateCSSCode(getCollectCSSConfiguration(styles));
  }

  const handleFormSubmit = () => {
    updateCodeExamples();
    setShowCode(true);
  }

  const handleYAMLDownload = () => {
    const yamlConfig = yaml.dump(getRouteConfig(state));
    const file = new File([yamlConfig], 'collect.yaml', { type: 'text/plain;charset=utf-8' });
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

  const handleGenerateVault = async () => {
    if (vaultName && selectedOrg?.id) {
      setIsGeneratingVault(true);
      const vault = await createVault(selectedOrg?.id, vaultName)
      await waitUntil(
        () => checkVaultStatus(vault),
        (isProvisioned) => isProvisioned
      )
      const routeConfig = getRouteConfig(state)?.data?.[0];
      await createRouteRequest(vault, routeConfig);
      setIsGeneratingVault(false);
    } else {
      debugger
    }
  }

  useEffect(() => {
    if (!selectedOrg?.id) {
      setSelectedOrg(organization)
    }
  }, [organization])

  useEffect(() => {
    updateCodeExamples();
  }, [state.form, styles]);

  const vaultIdTooltip = (
    <>
      <p>
        <a href={LINKS.DASHBOARD} target="_blank" style={{color: 'white', textDecoration: 'underline' }}>Log in</a>
        to the Dashboard to get your vault id.
      </p>
      <img src="https://media.giphy.com/media/9OuoSIPkGI6PyG8hOM/giphy.gif" />
    </>
  )

  return (
    <>
      <Spin
        tip="Generating new Vault and Route..."
        spinning={isGeneratingVault}
        wrapperClassName="get-code-form__spin-wrapper"
      >
      <Form name="get-code" className="get-code-form" initialValues={{ environment: 'sandbox' }} onFinish={handleFormSubmit}>
        <Row type="flex" gutter={24}>
          <Col xs={24} sm={24} md={24} lg={12}>
            {
              isAuthenticated
                ? (
                  <Item label="Organization Name" wrapperCol={{span: 24}} labelCol={{span: 24}}>
                    {
                      organizations.length > 1
                        ? (
                          <Select
                            style={{ width: '100%' }}
                            defaultValue={
                              organization?.attributes ? `${organization?.attributes?.name}` : 'Select the organization'
                            }
                            onChange={(value) => setSelectedOrg(groupedOrgsById[value][0])}
                          >
                            { organizations.map(({ id, attributes: {name} }) => (
                                <Option value={id} key={id}>{name}</Option>
                              )
                            )}
                          </Select>
                        )
                        : organization?.attributes?.name
                    }
                  </Item>
                )
                : <FormField label="Vault ID" name="vault-id" tooltip={{title: vaultIdTooltip, placement: 'right'}} validation={{required: true}} placeholder="tntXXXXXXXX" onChange={(e) => dispatch({ type: "SET_VAULT_ID", payload: e.target.value })}/>
            }
          </Col>
          {
            isAuthenticated && (
              <Col xs={24} sm={24} md={24} lg={12}>
                <FormField label="Vault Name" name="vault-name" validation={{required: true}} onChange={({target: { value }}) => setVaultName(value)}/>
              </Col>
            )
          }
        </Row>
        <Item>
          <Button htmlType="submit" style={{ width: 'fit-content' }}>Generate Code</Button>
        </Item>
        {
          isAuthenticated && (
            <Item>
              <Button
                onClick={handleGenerateVault}
                style={{ width: 'fit-content' }}
              >Generate New Vault and Route</Button>
            </Item>
          )
        }
      </Form>
      </Spin>
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
          <Button onClick={handleCodeDownload} className="mr-1">Download Code</Button>
          <Button onClick={handleYAMLDownload}>Download YAML</Button>
          <Divider />
          <h3>Next steps:</h3>
          <ul>
            <li>Download code example and copy code into your application.</li>
            <li>Download YAML config file with Inbound Route configuration and <a href={LINKS.YAML_CONFIGURATION} target="_blank">import</a> it into your vault. </li>
            <li>Submit test data in your application!</li>
            <li>
              Replace <a href={LINKS.UPSTREAM_HOST} target="_blank">Upstream Host</a> with your own host.
              Our echo server https://echo.apps.verygood.systems/ should be used for the test purposes only, it can not be used for sensitive data.
            </li>
          </ul>
        </>
      }
    </>
  )
}

export default GetCode;

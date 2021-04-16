import React, { useContext, useState, useEffect } from 'react';
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

import { FormContext, FormStylesContext, useAuthContext } from '../context';
import { useCheckVaultProvisioning, useCreateRoute, useCreateVault, useUser } from '../hooks/user'

const { Option } = Select;
const { Item } = Form;
const { TabPane } = Tabs;

const GetCode = () => {
  const { vaultOrg } = useUser();
  const { organization, organizations } = vaultOrg?.data || {};
  const [{ isAuthenticated }] = useAuthContext();
  const { mutateAsync: createVault, ...createVaultInfo } = useCreateVault()
  const { mutateAsync: checkVaultProvisioning } = useCheckVaultProvisioning({ retryCount: 5 })
  const { mutateAsync: createRoute, ...createRouteInfo } = useCreateRoute()
  const [state] = useContext(FormContext);
  const [styles] = useContext(FormStylesContext);
  const [, setShowCode] = useState(false);
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

  // todo remove or not?
  const handleGenerateCode = () => {
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
    if (vaultName && selectedOrg?.id && createRouteInfo?.isIdle) {
      setIsGeneratingVault(true);
      const vault = await createVault({
        organizationId: selectedOrg?.id,
        vaultName,
      })
      await checkVaultProvisioning({ vault });
      const routeConfig = getRouteConfig(state)?.data?.[0];
      await createRoute({ vault, routeConfig });
      setIsGeneratingVault(false);
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

  // todo remove or not?
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
      <Form name="get-code" className="get-code-form" initialValues={{ environment: 'sandbox' }}>
        <Row type="flex" gutter={24}>
          <Col xs={24} sm={24} md={24} lg={12}>
            {
              isAuthenticated && (
                <Spin
                  tip="Fetching organization data..."
                  spinning={!vaultOrg?.isSuccess}
                  wrapperClassName="get-code-form__spin-wrapper"
                >
                  <Item label="Organization Name" wrapperCol={{span: 24}} labelCol={{span: 24}}>
                    {
                      organizations?.length > 1
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
                </Spin>
              )
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
        {
          isAuthenticated && (
          <Item>
            {
              createVaultInfo?.isIdle &&
              <Button
                onClick={handleGenerateVault}
                style={{ width: 'fit-content' }}
              >
                Generate New Vault and Route
              </Button>
            }
            {createRouteInfo?.isSuccess && 'New Vault and Route have been successfully created.'}
          </Item>
          )
        }
      </Form>
      </Spin>
      <Divider />
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
    </>
  )
};

export default GetCode;

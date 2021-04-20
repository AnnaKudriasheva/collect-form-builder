import React, { useContext, useState, useEffect } from 'react';
import { groupBy } from 'lodash';
import { Row, Col, Select, Divider, Button, Spin, Collapse, Alert } from 'antd';
import { Form } from 'antd';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import yaml from 'js-yaml';

import getCollectJSConfiguration from '../templates/collect';
import getCollectHTMLConfiguration from '../templates/collect-html';
import getCollectCSSConfiguration from '../templates/collect-css';
import getRouteConfig from '../templates/inbound-route';

import FormField from '../components/FormField';

import { FormContext, FormStylesContext, useAuthContext } from '../context';
import { useCheckVaultProvisioning, useCreateRoute, useCreateVault, useUser } from '../hooks/user';
import { checkWindow } from '../utils';

const { Option } = Select;
const { Item } = Form;
const { Panel } = Collapse;

const ConnectForm = () => {
  const { vaultOrg } = useUser();
  const { organization, organizations } = vaultOrg?.data || {};
  const [{ isAuthenticated, login }] = useAuthContext();
  const { mutateAsync: createVault, ...createVaultInfo } = useCreateVault()
  const { mutateAsync: checkVaultProvisioning } = useCheckVaultProvisioning({ retryCount: 5 })
  const { mutateAsync: createRoute, ...createRouteInfo } = useCreateRoute()
  const [state, dispatch] = useContext(FormContext);
  const [styles] = useContext(FormStylesContext);
  const [jsCode, updateJSCode] = useState('');
  const [htmlCode, updateHTMLCode] = useState('');
  const [cssCode, updateCSSCode] = useState('');
  const [vaultName, setVaultName] = useState('');
  const [vault, setVault] = useState({});
  const [selectedOrg, setSelectedOrg] = useState(organization);
  const [isGeneratingVault, setIsGeneratingVault] = useState(false);
  const groupedOrgsById = groupBy(organizations, 'id');

  const updateCodeExamples = () => {
    updateJSCode(getCollectJSConfiguration(state, styles.iframe));
    updateHTMLCode(getCollectHTMLConfiguration(state, styles.iframe));
    updateCSSCode(getCollectCSSConfiguration(styles));
  }

  useEffect(() => {
    dispatch({ type: 'SET_VAULT_ID', payload: vault?.attributes?.identifier });
  }, [vault]);

  useEffect(() => {
    if (!selectedOrg?.id) {
      setSelectedOrg(organization)
    }
  }, [organization])

  useEffect(() => {
    updateCodeExamples();
  }, [state.form, styles]);

  // TODO: discuss and remove
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

  const handleRouteView = () => {
    const url = `https://dashboard.verygoodsecurity.com/dashboard/v/${vault.id}/routes`;
    if (checkWindow()) {
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
      if (newWindow) newWindow.opener = null;
    }
  }

  const handleGenerateVault = async () => {
    if (vaultName && selectedOrg?.id && createRouteInfo?.isIdle) {
      setIsGeneratingVault(true);
      const vault = await createVault({
        organizationId: selectedOrg?.id,
        vaultName,
      });
      await checkVaultProvisioning({ vault });
      const routeConfig = getRouteConfig(state)?.data?.[0];
      await createRoute({ vault, routeConfig });
      setVault(vault);
      setIsGeneratingVault(false);
    }
  }

  return (
    <> 
      <Collapse defaultActiveKey={["1"]} className="form-builder-collapse" accordion>
        <Panel header="Automatic integration with VGS" key="1">
      <Spin
      tip="Generating new Vault and Route..."
      spinning={isGeneratingVault}
      wrapperClassName="get-code-form__spin-wrapper"
      >
      <Form name="get-code" className="get-code-form" initialValues={{ environment: 'sandbox' }}>
        <Row>
          <Col span={24}>
            {
              !isAuthenticated && (
                <>
                <p>To automatically connect your form with your VGS Vault, you must first login or create a VGS account.</p>
                <Button type="primary" className="b-center" onClick={login}>Log in or Sign Up</Button>
                </>
              )
            }
            {
              isAuthenticated && (
                <Spin
                  tip="Fetching organization data..."
                  spinning={!vaultOrg?.isSuccess}
                  wrapperClassName="get-code-form__spin-wrapper"
                >
                  <Item label="Select the Organization to connect this form with" wrapperCol={{span: 24}} labelCol={{span: 24}}>
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
              <Col span={24}>
                <FormField 
                label="Enter a name for the new Vault this form will connect to" 
                placeholder="Enter a Vault name"
                name="vault-name" 
                validation={{required: true}} 
                onChange={({target: { value }}) => setVaultName(value)}/>
              </Col>
            )
          }
        </Row>
        {
          isAuthenticated && (
            <>
            {
              createVaultInfo?.isIdle &&
              <>
                <Button
                  type="primary"
                  className="b-center mb-2"
                  onClick={handleGenerateVault}
                  style={{ width: 'fit-content' }}
                >
                  Generate New Vault and Route
                </Button>
                <Alert
                  message="Clicking the ‘Create Vault and Connect Form’ button will automatically create a new Vault within your Organization using the name entered above."
                  type="info"
                  showIcon
                />
             </>
            }
            {createRouteInfo?.isSuccess && 
            <>
              <Alert 
                type="success"
                message="Connected"
                showIcon
              />
              <Divider />
              <h4>Next Steps: </h4>
              <p>Download the code generated by the Form Builder for your form and paste it into your application.</p>
              <Button className="mb-2" onClick={handleCodeDownload}>Download Code</Button>
              <p>View the newly created Inbound Route in your Vault.</p>
              <Button onClick={handleRouteView}>View Inbound Route</Button>
            </>
            }
            </>
          )
        }
        <Divider />
      </Form>
      </Spin>
        </Panel>
      </Collapse>
      <Collapse defaultActiveKey={["1"]} className="form-builder-collapse" accordion>
        <Panel header="Manual integration with VGS" key="1">
          <i>You must create a Vault with a new Inbound Route in your Dashboard and manually connect your form to it.</i>
        </Panel>
      </Collapse>
      <>
      </>
    </>
  )
};

export default ConnectForm;

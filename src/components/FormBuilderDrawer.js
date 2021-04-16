
import React, { useState, useContext, useEffect } from 'react';
import { Drawer }  from 'antd';

import { FormContext } from '../context';
import { LINKS } from '../utils/constants';

const FormBuilderDrawer = () => {
  const [visible, setVisibility] = useState(false);
  const [state, dispatch] = useContext(FormContext);

  const { showDrawer } = state;

  useEffect(() => {
    setVisibility(showDrawer);
  }, [showDrawer]);

  return (
    <Drawer
      title="Collect.js Form Builder"
      placement="right"
      closable={false}
      visible={visible}
      width="500"
      onClose={() =>  dispatch({type: 'SET_DRAWER_STATE', payload: false})}
      key="right"
    >
      <h2>Welcome to the VGS Collect.js Instant Form Builder!</h2>
      <p><a href={LINKS.DOCUMENTATION} target="_blank">VGS Collect.js</a> is a JavaScript library that allows you to securely collect data via any form.
          Instantly create custom forms that adhere to PCI, HIPAA, GDPR or CCPA security requirements.
          VGS intercepts sensitive data before it hits your servers and replaces it with aliased versions while
          securing the original data in our vault. The form fields behave like traditional forms while preventing
          access to the unsecured data by injecting secure iframe components.
      </p>
      <img src="https://www.verygoodsecurity.com/docs/vgs_theme/static/img/vgs-collect-diagram.png" style={{width: '100%', marginBottom: '2rem'}}/>
      <h3>Simple Steps separating you from having a secure form:</h3>
      <ul>
        <li>Create Fields (from template or generate unique form)</li>
        <li>Style Form (apply various styles to the form fields)</li>
        <li>Setup Form submission</li>
        <li>Get Code Example</li>
      </ul>
      <h3>Useful Links:</h3>
      <ul>
        <li><a href={LINKS.DOCUMENTATION} target="_blank">Documentation</a></li>
        <li><a href={LINKS.EXAMPLES} target="_blank">Examples</a></li>
        <li><a href={LINKS.IOS_SDK} target="_blank">iOS SDK</a></li>
        <li><a href={LINKS.ANDROID_SDK} target="_blank">Android SDK</a></li>
      </ul>
    </Drawer>
  )
}

export default FormBuilderDrawer;

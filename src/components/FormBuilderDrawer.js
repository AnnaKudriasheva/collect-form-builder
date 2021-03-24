
import React, { useState, useContext, useEffect } from 'react';
import { Drawer }  from '@vgs/elemente';

import { FormContext } from '../context/form-context';

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
      <h2>Welcome to the VGS Collect.js instant Form Builder!</h2>
      <p>VGS Collect.js is a JavaScript library that allows you to securely collect data via any form.
          Instantly create custom forms that adhere to PCI, HIPAA, GDPR or CCPA security requirements.
          VGS intercepts sensitive data before it hits your servers and replaces it with aliased versions while
          securing the original data in our vault. The form fields behave like traditional forms while preventing
          access to the unsecured data by injecting secure iframe components.
      </p>
    </Drawer>
  )
}

export default FormBuilderDrawer;

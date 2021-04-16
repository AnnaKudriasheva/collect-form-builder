
import React, { useState, useContext, useEffect } from 'react';
import { Drawer, Button, Card }  from 'antd';

import { FormContext } from '../context';

import { payment_form_config } from '../templates/payment_form_config_template';
import { login_form_config } from '../templates/login_form_config_template';
import { ssn_form_config } from '../templates/ssn_form_config_template';

const FormBuilderDrawer = () => {
  const [visible, setVisibility] = useState(false);
  const [state, dispatch] = useContext(FormContext);

  const { showTemplatesDrawer } = state;

  useEffect(() => {
    setVisibility(showTemplatesDrawer);
  }, [showTemplatesDrawer]);



  return (
    <Drawer
      title="Form Templates"
      placement="left"
      closable={false}
      visible={visible}
      width="500"
      onClose={() =>  dispatch({type: 'SET_TEMPLATES_DRAWER', payload: false})}
      key="right"
    >
      <Card style={{ marginBottom: '2rem' }} title="Payment Form" extra={<Button onClick={() => dispatch({ type: 'SET_TEMPLATE', payload: payment_form_config })}>Apply</Button>} >
        <ul>
          <li>Cardholder name secure input</li>
          <li>Card number secure input</li>
          <li>Card expiration date</li>
          <li>Card security code</li>
        </ul>
      </Card>
      <Card style={{ marginBottom: '2rem' }} className="mb-2" title="Login Form" extra={<Button onClick={() => dispatch({ type: 'SET_TEMPLATE', payload: login_form_config })}>Apply</Button>} >
        <ul>
          <li>Email secure input</li>
          <li>Password secure input</li>
        </ul>
      </Card>
      <Card style={{ marginBottom: '2rem' }} className="mb-2" title="SSN Form" extra={<Button onClick={() => dispatch({ type: 'SET_TEMPLATE', payload: ssn_form_config })}>Apply</Button>}>
        <ul>
          <li>SSN secure input</li>
        </ul>
      </Card>
    </Drawer>
  )
}

export default FormBuilderDrawer;

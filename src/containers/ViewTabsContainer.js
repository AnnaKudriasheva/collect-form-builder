import React, { useContext } from 'react';
import { Tabs, Button } from '@vgs/elemente';

import FormLayout from '../components/FormLayout';
import StlyeForm from '../components/StyleForm';
import GetCode from '../components/GetCode';
import SubmitForm from '../components/SubmitForm';
import { FormContext } from '../context/form-context';

const { TabPane } = Tabs;

const ViewTabsContainer = () => {
  const [state, dispatch] = useContext(FormContext);
  return (
    <>
    <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>
      VGS Collect.js Form Builder
      <Button className="round-btn" type="default" onClick={() => dispatch({type: 'SET_DRAWER_STATE', payload: true})}>?</Button>
    </h3>
    <Tabs defaultActiveKey="1" animated={false} onChange={() => dispatch({type: 'SET_MODE', payload: ''})}>
      <TabPane tab="1. Create Fields" key="1">
        <FormLayout />
      </TabPane>
      <TabPane tab="2. Style Form" key="2">
        <StlyeForm />
      </TabPane>
      <TabPane tab="3. Submit Form" key="3">
        <SubmitForm />
      </TabPane>
      <TabPane tab="4. Get Code" key="4">
        <GetCode />
      </TabPane>
    </Tabs>
    </>
  )
}

export default ViewTabsContainer;
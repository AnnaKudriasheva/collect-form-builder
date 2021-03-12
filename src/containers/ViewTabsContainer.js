import React, { useContext } from 'react';
import { Tabs } from '@vgs/elemente';

import FormLayout from '../components/FormLayout';
import ManageForm from '../components/ManageForm';
import GetCode from '../components/GetCode';
import SubmitForm from '../components/SubmitForm';
import { FormContext } from '../context/form-context';

const { TabPane } = Tabs;

const ViewTabsContainer = () => {
  const [state, dispatch] = useContext(FormContext);
  return (
    <Tabs defaultActiveKey="1" animated={false} onChange={() => dispatch({ type: 'SET_MODE', payload: '' })}>
      <TabPane tab="Create Fields" key="1">
        <FormLayout />
      </TabPane>
      <TabPane tab="Style Form" key="2">
        <ManageForm />
      </TabPane>
      <TabPane tab="Submit Form" key="3">
        <SubmitForm />
      </TabPane>
      <TabPane tab="Get Code" key="4">
        <GetCode />
      </TabPane>
    </Tabs>
  )
}

export default ViewTabsContainer;

import React from 'react';
import FieldOptionsContainer from '../components/FieldOptionsContainer';
import FormBuilderContainer from '../components/FormBuilderContainer';
import { FormContextProvider } from "../context/form-context";
import { Layout }  from '@vgs/elemente';

const { Content } = Layout;

const FormBuilder = () => {
  return (
    <FormContextProvider>
      <Layout style={{ backgroundColor: 'white'}} className="collect-form-builder-container">
        <Content style={{ padding: '40px' }}>
          <FormBuilderContainer />
        </Content>
      </Layout>
      <FieldOptionsContainer />
    </FormContextProvider>
  )
}

export default FormBuilder;

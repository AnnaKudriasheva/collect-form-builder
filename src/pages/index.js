
import React from 'react';

import FieldOptionsContainer from '../containers/FieldOptionsContainer';
import FormBuilderContainer from '../containers/FormBuilderContainer';

import { FormContextProvider } from "../context/form-context";
import { FormStylesContextProvider } from "../context/styles-context";
import { Layout, PageHeader }  from '@vgs/elemente';
const { Content } = Layout;

const FormBuilder = () => {
  return (
    <div className="collect-form-builder-container">
      <FormContextProvider>
        <FormStylesContextProvider>
          <Layout style={{ backgroundColor: 'white'}}>
            <Content style={{ padding: '40px' }}>
              <FormBuilderContainer />
            </Content>
          </Layout>
          <FieldOptionsContainer />
        </FormStylesContextProvider>
      </FormContextProvider>
    </div>
  )
}

export default FormBuilder;

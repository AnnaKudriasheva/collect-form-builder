
import React from 'react';

import FieldOptionsContainer from '../containers/FieldOptionsContainer';
import FormBuilderContainer from '../containers/FormBuilderContainer';
import FormBuilderHeader from '../components/Header';

import { FormContextProvider } from "../context/form-context";
import { FormStylesContextProvider } from "../context/styles-context";
import { Layout }  from '@vgs/elemente';
import FormBuilderDrawer from '../components/FormBuilderDrawer';
import FormTemplatesDrawer from '../components/FormTemplatesDrawer';

const { Content } = Layout;

const FormBuilder = () => {
  return (
    <div className="collect-form-builder-container">
      <FormContextProvider>
        <FormStylesContextProvider>
          <FormTemplatesDrawer />
          <FormBuilderDrawer />
          <Layout style={{backgroundColor: 'white', height: '100vh'}}>
            <FormBuilderHeader />
            <Content>
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

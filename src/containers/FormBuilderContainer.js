import React, { useContext } from 'react';
import ViewTabsContainer from '../containers/ViewTabsContainer';
import FormPreview from '../components/FormPreview';

import { Row, Col }  from '@vgs/elemente';
import { FormContext } from '../context/form-context';

const FormBuilderContainer = () => {
  const [state] = useContext(FormContext);
  return (
    <>
    <Row type="flex" style={state.mode ? {height: '40%', overflow: 'scroll'} : {height: '100%'}}>
      <Col xs={24} sm={24} md={12} className="p-3 pb-5">
        <ViewTabsContainer />
      </Col>
      <Col xs={24} sm={24} md={12} className="bl-gray p-3">
        <FormPreview />
      </Col>
    </Row>
    </>
  )
}

export default FormBuilderContainer;
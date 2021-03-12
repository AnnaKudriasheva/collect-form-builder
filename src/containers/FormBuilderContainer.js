import React, { useContext } from 'react';
import ViewTabsContainer from '../containers/ViewTabsContainer';
import FormPreview from '../components/FormPreview';

import { Row, Col }  from '@vgs/elemente';
import { FormContext } from '../context/form-context';

const FormBuilderContainer = (props) => {
  const [state, dispatch] = useContext(FormContext);
  return (
    <Row gutter={80} type="flex" style={state.mode ? { height: '40%', overflow: 'scroll'} : { height: '100%' }}>
      <Col xs={24} sm={24} md={12}>
        <ViewTabsContainer />
      </Col>
      <Col xs={24} sm={24} md={12} className="bl-gray">
        <FormPreview />
      </Col>
    </Row>
  )
}

export default FormBuilderContainer;
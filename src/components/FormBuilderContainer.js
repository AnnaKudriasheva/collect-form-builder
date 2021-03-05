import React, { useContext } from 'react';
import ViewTabs from '../components/ViewTabs';
import Preview from '../components/Preview';

import { Row, Col, Divider }  from '@vgs/elemente';
import { FormContext } from '../context/form-context';

const FormBuilderContainer = (props) => {
  const [state, dispatch] = useContext(FormContext);
  return (
    <Row gutter={80} type="flex" style={state.mode ? { height: '40%', overflow: 'scroll'} : { height: '100%' }}>
      <Col xs={24} sm={24} md={12}>
        <ViewTabs />
        <Divider type="vertical" />
      </Col>
      <Col xs={24} sm={24} md={12} className="bl-gray br-gray">
        <Preview />
      </Col>
    </Row>
  )
}

export default FormBuilderContainer;
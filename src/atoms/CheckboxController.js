import React, { useState } from 'react';
import { Row, Col, Checkbox } from '@vgs/elemente';

const CheckboxController = (props) => {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <Row type="flex">
        <Col span={1}>
          <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} style={{ width: '2rem' }}/>
        </Col>
        <Col span={23}>
          <label>{props.label}</label>
          <p>{props.description}</p>
          {checked && props.children}
        </Col>
      </Row>
    </>
  )
}

export default CheckboxController;
import React, { useState, useEffect } from 'react';
import { Row, Col, Checkbox, Tooltip } from '@vgs/elemente';
import InfoTooltip from '../components/InfoTooltip';

const CheckboxController = (props) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(props.checked);
  }, [props.checked]);

  return (
    <Row>
      <Col span={24} className="mb-1">
        <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)}>
          {props.label}
          <InfoTooltip title="Test" />
        </Checkbox>
      </Col>
      <Col span={24}>
        <div style={{ maxWidth: '400px', marginLeft: '1.5rem' }}>
          {checked && props.children}
        </div>
      </Col>
    </Row>
  )
}

export default CheckboxController;

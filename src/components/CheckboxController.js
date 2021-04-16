import React, { useState, useEffect } from 'react';
import { Row, Col, Checkbox } from 'antd';
import InfoTooltip from '../components/InfoTooltip';

const CheckboxController = (props) => {
  const { checked, onUnchecked, tooltip } = props;
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  useEffect(() => {
    if (!isChecked && props.onUnchecked) {
      onUnchecked();
    }
  }, [isChecked])

  return (
    <Row>
      <Col span={24} className="mb-1">
        <Checkbox checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}>
          {props.label}
          {tooltip && <InfoTooltip title={tooltip} />}
        </Checkbox>
      </Col>
      <Col span={24}>
        <div style={{ maxWidth: '400px', marginLeft: '1.5rem' }}>
          {isChecked && props.children}
        </div>
      </Col>
    </Row>
  )
}

export default CheckboxController;

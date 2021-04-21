import React from 'react';
import FormField from '../../components/FormField';
import {  Row, Col } from 'antd';

import { numericValidation } from '../../utils/validation';

const Label = (props) => {
  const { updateLabelStyles } = props;
  return (
    <>
      <Row type="flex" gutter={24}>
        <Col span={8}>
          <FormField 
            type="number" 
            label="Font Size" 
            name="font-size"
            defaultValue={14} 
            placeholder="16"
            onChange={(value) => updateLabelStyles('font-size', value, 'px')}
            unit="px" 
            validation={numericValidation} 
          />
        </Col>
        <Col span={8}>
          <FormField 
            type="number"
            label="Font Weight" 
            name="font-weight" 
            placeholder="100"
            defaultValue={700}
            step={100} 
            onChange={(value) => updateLabelStyles('font-weight', value)} 
            validation={numericValidation}
          />
        </Col>
        <Col span={8}>
          <FormField 
            label="Margin Bottom"
            name="margin-bottom" 
            placeholder="8"
            defaultValue="8"
            onChange={(e) => updateLabelStyles('margin-bottom', e.target.value, 'px') }
            unit="px" 
            validation={numericValidation}
          />
        </Col>
      </Row>
      <Row type="flex" justify="start" gutter={24}>
        <Col span={8}>
          <FormField 
            type="color"
            label="Color"
            name="label-color" 
            placeholder="#40545F"
            defaultValue="#40545F"
            onChange={(value) => updateLabelStyles('color', value)}
          />
        </Col>
      </Row>
    </>
  )
}

export default Label;

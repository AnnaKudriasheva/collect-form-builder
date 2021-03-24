import React from 'react';
import ColorPicker from '../ColorPicker';
import FormField from '../../components/FormField';
import {  Row, Col, Select, InputNumber } from '@vgs/elemente';
import { Form } from 'antd'

import { numericValidation } from '../../utils/validation';
import { SYSTEM_FONTS } from '../../utils/constants';

const { Option } = Select;
const { Item } = Form;

const TextOptions = (props) => {
  const { updateIframeStyles } = props;
  return (
    <>
      <Row type="flex" gutter={24}>
        <Col span={24}>
          <Item label="Font Family" name="font-family" wrapperCol={{span: 24}} labelCol={{span: 24}}>
              <Select defaultValue="Arial, sans-serif" style={{ width: '100%' }} onChange={(value) => updateIframeStyles('font-family', value)}>
                { SYSTEM_FONTS.map((type, idx) => <Option value={type} key={idx}>{type}</Option>) }
              </Select>
              <small>To use a custom font, please check out our documentation.</small>
          </Item>
        </Col>
      </Row>
      <Row type="flex" gutter={24}>
        <Col span={8}>
          <FormField 
            type="number" 
            label="Font Size" 
            name="font-size"
            defaultValue={16} 
            placeholder="16"
            onChange={(value) => updateIframeStyles('font-size', value, 'px')}
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
            step={100} 
            onChange={(value) => updateIframeStyles('font-weight', value)} 
            validation={numericValidation}
          />
        </Col>
        <Col span={8}>
          <FormField 
            type="number"
            label="Line Height"
            name="line-height" 
            placeholder="16"
            onChange={(value) => updateIframeStyles('line-height', value, 'px') }
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
            name="text-color" 
            placeholder="#40545F"
            defaultValue="#40545F"
            onChange={(value) => updateIframeStyles('color', value)}
          />
        </Col>
        <Col span={8}>
          <FormField 
            type="color"
            label="Placeholder color"
            name="text-color" 
            placeholder="#C8D0DB"
            defaultValue="#C8D0DB"
            onChange={(value) => updateIframeStyles({ selector: '::placeholder', name: 'color' }, value)}
          />
        </Col>
      </Row>
    </>
  )
}

export default TextOptions;
import React from 'react';
import ColorPicker from '../ColorPicker';
import {  Row, Col, Select, InputNumber } from '@vgs/elemente';
import { Form } from 'antd'

import { numericValidation } from '../../utils/validation';
import { systemFonts } from '../../utils/constants';

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
                { systemFonts.map((type, idx) => <Option value={type} key={idx}>{type}</Option>) }
              </Select>
              <small>To use a custom font, please check out our documentation.</small>
          </Item>
        </Col>
      </Row>
      <Row type="flex" gutter={24}>
        <Col span={8}>
          <Item label="Font Size" name="font-size" wrapperCol={{span: 24}} labelCol={{span: 24}} rules={[numericValidation]}>
            <div className="d-flex align-center">
              <InputNumber defaultValue={16} placeholder="16" onChange={(value) => updateIframeStyles('font-size', value, 'px') }/>
              <span style={{ marginLeft: '8px' }}>px</span>
            </div>
          </Item>
        </Col>
        <Col span={8}>
          <Item label="Font Weight" name="font-weight" wrapperCol={{span: 24}} labelCol={{span: 24}} rules={[numericValidation]}>
            <InputNumber step={100} placeholder="100" onChange={(value) => updateIframeStyles('font-weight', value) }/>
          </Item>
        </Col>
        <Col span={8}>
          <Item label="Line Height" name="line-height" wrapperCol={{span: 24}} labelCol={{span: 24}} rules={[numericValidation]}>
            <div className="d-flex align-center">
              <InputNumber placeholder="16" onChange={(value) => updateIframeStyles('line-height', value, 'px') }/>
              <span style={{ marginLeft: '8px' }}>px</span>
            </div>
          </Item>
        </Col>
      </Row>
      <Row type="flex" justify="start" gutter={24}>
        <Col span={8}>
          <Item label="Color">
            <ColorPicker placeholder="#40545F" initialValue="#40545F" onChange={(value) => updateIframeStyles('color', value)} />
          </Item>
        </Col>
        <Col span={8}>
          <Item label="Placeholder color">
            <ColorPicker placeholder="#C8D0DB" initialValue="#C8D0DB" onChange={(value) => updateIframeStyles({ selector: '::placeholder', name: 'color' }, value)} />
          </Item>
        </Col>
      </Row>
    </>
  )
}

export default TextOptions;
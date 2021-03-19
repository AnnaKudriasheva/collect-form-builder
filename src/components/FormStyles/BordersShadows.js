import React from 'react';
import ColorPicker from '../ColorPicker';
import { numericValidation } from '../../utils/validation';
import  { borderStyles } from '../../utils/constants';
import {  Row, Col, Select, Input, InputNumber } from '@vgs/elemente';
import { Form } from 'antd';

const { Option } = Select;
const { Item } = Form;

const BordersShadows = (props) => {
  const { updateWrapperStyles } = props;
  return (
    <>
      <Row type="flex" gutter={24}>
        <Col span={6}>
          <Item label="Border Color" name="border-color" wrapperCol={{span: 24}} labelCol={{span: 24}} >
            <ColorPicker placeholder="#C8D0DB" initialValue="#C8D0DB" onChange={(value) => updateWrapperStyles("border-color" , value)}/>
          </Item>
        </Col>
        <Col span={6}>
          <Item label="Border Width" name="border-width" wrapperCol={{span: 24}} labelCol={{span: 24}} rules={[numericValidation]}>
            <div className="d-flex align-center">
              <InputNumber defaultValue={1} placeholder="1" onChange={(value) => updateWrapperStyles("border-width", value, 'px') }/>
              <span style={{ marginLeft: '8px' }}>px</span>
            </div>
          </Item>
        </Col>
        <Col span={6}>
          <Item label="Border Style" name="border-style" wrapperCol={{span: 24}} labelCol={{span: 24}} >
            <Select style={{ width: '100%' }} onChange={(value) => updateWrapperStyles("border-style", value)}>
              { borderStyles.map((type, idx) => <Option value={type} key={idx}>{type}</Option>) }
            </Select>
          </Item>
        </Col>
        <Col span={6}>
          <Item label="Border Radius" name="border-radius" wrapperCol={{span: 24}} labelCol={{span: 24}} rules={[numericValidation]}>
            <div className="d-flex align-center">
              <Input placeholder="4" defaultValue="4" onChange={(e) => updateWrapperStyles("border-radius", e.target.value, 'px') }/>
              <span style={{ marginLeft: '8px' }}>px</span>
            </div>
          </Item>
        </Col>
      </Row>
      <Row type="flex" gutter={24}>
        <Col span={12}>
          <Item label="Box shadow">
            <Input placeholder="0px 0px 3px rgba(23, 31, 39, 0.3)" defaultValue="0px 0px 3px rgba(23, 31, 39, 0.3)" onChange={(e) => updateWrapperStyles("box-shadow", e.target.value) }/>
          </Item>
        </Col>
      </Row>
    </>
  )
}

export default BordersShadows;
import React from 'react';
import {  Row, Col, Select, Input, InputNumber } from '@vgs/elemente';
import { Form } from 'antd';

import { numericValidation } from '../../utils/validation';
import { boxSizing } from '../../utils/constants';

const { Option } = Select;
const { Item } = Form;

const BoxModel = (props) => {
  const { updateWrapperStyles } = props;
  return (
    <>
     <Row type="flex" gutter={24}>
        <Col span={8}>
          <Item label="Height">
            <Input placeholder="25px" onChange={(e) => updateWrapperStyles("height", e.target.value) }/>
          </Item>
        </Col>
        <Col span={8}>
          <Item label="Width">
            <Input placeholder="100%" onChange={(e) => updateWrapperStyles("width", e.target.value) }/>
          </Item>
        </Col>
        <Col span={8}>
          <Item label="Box Sizing">
            <Select defaultValue="border-box" style={{ width: '100%' }} onChange={(value) => updateWrapperStyles("box-sizing", value)}>
              { boxSizing.map((type, idx) => <Option value={type} key={idx}>{type}</Option>) }
            </Select>
          </Item>
        </Col>
      </Row>
      <h4>Padding</h4>
      <Row type="flex" gutter={24}>
        <Col span={6}>
          <Item label="Top" name="padding-top" wrapperCol={{span: 24}} labelCol={{span: 24}} rules={[numericValidation]}>
            <div className="d-flex align-center">
              <InputNumber defaultValue={6} placeholder="0" onChange={(value) => updateWrapperStyles("padding-top", value, 'px') }/>
              <span style={{ marginLeft: '8px' }}>px</span>
            </div>
          </Item>
        </Col>
        <Col span={6}>
          <Item label="Right" name="padding-right" wrapperCol={{span: 24}} labelCol={{span: 24}} rules={[numericValidation]}>
            <div className="d-flex align-center">
              <InputNumber defaultValue={12} placeholder="0" onChange={(value) => updateWrapperStyles("padding-right", value, 'px') }/>
              <span style={{ marginLeft: '8px' }}>px</span>
            </div>
          </Item>
        </Col>
        <Col span={6}>
          <Item label="Bottom" name="padding-bottom" wrapperCol={{span: 24}} labelCol={{span: 24}} rules={[numericValidation]}>
           <div className="d-flex align-center">
              <InputNumber defaultValue={6} placeholder="0" onChange={(value) => updateWrapperStyles("padding-bottom", value, 'px') }/>
              <span style={{ marginLeft: '8px' }}>px</span>
            </div>
          </Item>
        </Col>
        <Col span={6}>
          <Item label="Left" name="padding-left" wrapperCol={{span: 24}} labelCol={{span: 24}} rules={[numericValidation]}>
            <div className="d-flex align-center">
              <InputNumber defaultValue={12} placeholder="0" onChange={(value) => updateWrapperStyles("padding-left", value, 'px') }/>
              <span style={{ marginLeft: '8px' }}>px</span>
            </div>
          </Item>
        </Col>
      </Row>
      <h4>Margin</h4>
      <Row type="flex" gutter={24}>
        <Col span={6}>
          <Item label="Top" name="margin-top" wrapperCol={{span: 24}} labelCol={{span: 24}} rules={[numericValidation]}>
            <div className="d-flex align-center">
              <InputNumber placeholder="0" onChange={(value) => updateWrapperStyles("margin-top", value, 'px') }/>
              <span style={{ marginLeft: '8px' }}>px</span>
            </div>
          </Item>
        </Col>
        <Col span={6}>
          <Item label="Right" name="margin-right" wrapperCol={{span: 24}} labelCol={{span: 24}} rules={[numericValidation]}>
            <div className="d-flex align-center">
              <InputNumber placeholder="0" onChange={(value) => updateWrapperStyles("margin-right", value, 'px') }/>
              <span style={{ marginLeft: '8px' }}>px</span>
            </div>
          </Item>
        </Col>
        <Col span={6}>
          <Item label="Bottom" name="margin-bottom" wrapperCol={{span: 24}} labelCol={{span: 24}} rules={[numericValidation]}>
            <div className="d-flex align-center">
              <InputNumber defaultValue={16} placeholder="0" onChange={(value) => updateWrapperStyles("margin-bottom", value, 'px') }/>
              <span style={{ marginLeft: '8px' }}>px</span>
            </div>
          </Item>
        </Col>
        <Col span={6}>
          <Item label="Left" name="margin-left" wrapperCol={{span: 24}} labelCol={{span: 24}} rules={[numericValidation]}>
            <div className="d-flex align-center">
              <InputNumber placeholder="0" onChange={(value) => updateWrapperStyles("margin-left", value, 'px') }/>
              <span style={{ marginLeft: '8px' }}>px</span>
            </div>
          </Item>
        </Col>
      </Row>
    </>
  )
}

export default BoxModel;
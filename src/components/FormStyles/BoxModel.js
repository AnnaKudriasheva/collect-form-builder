import React from 'react';
import {  Row, Col, Select, Form, Input } from '@vgs/elemente';

const { Option } = Select;
const { Item } = Form;

const boxSizing = ['border-box', 'content-box', 'inherit', 'initial'];

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
          <Item label="Top">
            <div className="d-flex align-center">
              <Input placeholder="0" type="number" onChange={(e) => updateWrapperStyles("padding-top", e.target.value, 'px') }/>
              <span style={{ marginLeft: '8px' }}>px</span>
            </div>
          </Item>
        </Col>
        <Col span={6}>
          <Item label="Right">
            <div className="d-flex align-center">
              <Input placeholder="0" type="number" onChange={(e) => updateWrapperStyles("padding-right", e.target.value, 'px') }/>
              <span style={{ marginLeft: '8px' }}>px</span>
            </div>
          </Item>
        </Col>
        <Col span={6}>
          <Item label="Bottom">
           <div className="d-flex align-center">
              <Input placeholder="0" type="number" onChange={(e) => updateWrapperStyles("padding-bottom", e.target.value, 'px') }/>
              <span style={{ marginLeft: '8px' }}>px</span>
            </div>
          </Item>
        </Col>
        <Col span={6}>
          <Item label="Left">
            <div className="d-flex align-center">
              <Input placeholder="0" type="number" onChange={(e) => updateWrapperStyles("padding-left", e.target.value, 'px') }/>
              <span style={{ marginLeft: '8px' }}>px</span>
            </div>
          </Item>
        </Col>
      </Row>
      <h4>Margin</h4>
      <Row type="flex" gutter={24}>
        <Col span={6}>
          <Item label="Top">
            <div className="d-flex align-center">
              <Input placeholder="0" type="number" onChange={(e) => updateWrapperStyles("margin-top", e.target.value, 'px') }/>
              <span style={{ marginLeft: '8px' }}>px</span>
            </div>
          </Item>
        </Col>
        <Col span={6}>
          <Item label="Right">
            <div className="d-flex align-center">
              <Input placeholder="0" type="number" onChange={(e) => updateWrapperStyles("margin-right", e.target.value, 'px') }/>
              <span style={{ marginLeft: '8px' }}>px</span>
            </div>
          </Item>
        </Col>
        <Col span={6}>
          <Item label="Bottom">
            <div className="d-flex align-center">
              <Input placeholder="0" type="number" onChange={(e) => updateWrapperStyles("margin-bottom", e.target.value, 'px') }/>
              <span style={{ marginLeft: '8px' }}>px</span>
            </div>
          </Item>
        </Col>
        <Col span={6}>
          <Item label="Left">
            <div className="d-flex align-center">
              <Input placeholder="0" type="number" onChange={(e) => updateWrapperStyles("margin-left", e.target.value, 'px') }/>
              <span style={{ marginLeft: '8px' }}>px</span>
            </div>
          </Item>
        </Col>
      </Row>
    </>
  )
}

export default BoxModel;
import React from 'react';
import ColorPicker from '../ColorPicker';
import {  Row, Col, Select, Form, Input } from '@vgs/elemente';

const { Option } = Select;
const { Item } = Form;

const borderStyles = ['dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'none', 'hidden'];

const BordersShadows = (props) => {
  const { updateWrapperStyles } = props;
  return (
    <>
      <Row type="flex" gutter={24}>
        <Col span={6}>
          <Item label="Border color">
            <ColorPicker placeholder="#C8D0DB" initialValue="#C8D0DB" onChange={(value) => updateWrapperStyles("border-color" , value)}/>
          </Item>
        </Col>
        <Col span={6}>
          <Item label="Border width">
            <div className="d-flex align-center">
              <Input defaultValue="1" placeholder="1" type="number" onChange={(e) => updateWrapperStyles("border-width", e.target.value, 'px') }/>
              <span style={{ marginLeft: '8px' }}>px</span>
            </div>
          </Item>
        </Col>
        <Col span={6}>
          <Item label="Border style">
            <Select defaultValue="solid" style={{ width: '100%' }} onChange={(value) => updateWrapperStyles("border-style", value)}>
              { borderStyles.map((type, idx) => <Option value={type} key={idx}>{type}</Option>) }
            </Select>
          </Item>
        </Col>
        <Col span={6}>
          <Item label="Border radius">
            <div className="d-flex align-center">
              <Input placeholder="4" onChange={(e) => updateWrapperStyles("border-radius", e.target.value, 'px') }/>
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
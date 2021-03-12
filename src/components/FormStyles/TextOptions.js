import React from 'react';
import ColorPicker from '../ColorPicker';
import {  Row, Col, Select, Form, Input } from '@vgs/elemente';

const { Option } = Select;
const { Item } = Form;

const systemFonts = ["Arial, sans-serif", "Verdana, sans-serif", "Helvetica, sans-serif", "Tahoma, sans-serif", "Trebuchet, sans-serif", "Georgia, serif", "Garamond, serif", "Courier New, monospace", ""];

const TextOptions = (props) => {
  const { updateIframeStyles } = props;
  return (
    <>
      <Row type="flex" gutter={24}>
        <Col span={24}>
          <Item label="Font Family">
              <Select defaultValue="Arial, sans-serif" style={{ width: '100%' }} onChange={(value) => updateIframeStyles('font-family', value)}>
                { systemFonts.map((type, idx) => <Option value={type} key={idx}>{type}</Option>) }
              </Select>
              <small>To use a custom font, please check out our documentation.</small>
          </Item>
        </Col>
      </Row>
      <Row type="flex" gutter={24}>
        <Col span={8}>
          <Item label="Font Size">
            <div className="d-flex align-center">
              <Input defaultValue="16" placeholder="16" onChange={(e) => updateIframeStyles('font-size', e.target.value, 'px') }/>
              <span style={{ marginLeft: '8px' }}>px</span>
            </div>
          </Item>
        </Col>
        <Col span={8}>
          <Item label="Font Weight">
            <Input defaultValue="400" placeholder="100" onChange={(e) => updateIframeStyles('font-weight', e.target.value) }/>
          </Item>
        </Col>
        <Col span={8}>
          <Item label="Line Height">
            <div className="d-flex align-center">
              <Input placeholder="16" onChange={(e) => updateIframeStyles('line-height', e.target.value, 'px') }/>
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
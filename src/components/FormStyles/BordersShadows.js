import React from 'react';
import  { BORDER_STYLES } from '../../utils/constants';
import FormField from '../../components/FormField';
import {  Row, Col, Select } from '@vgs/elemente';
import { Form } from 'antd';

const { Option } = Select;
const { Item } = Form;

const BordersShadows = (props) => {
  const { updateWrapperStyles } = props;
  return (
    <>
      <Row type="flex" gutter={24}>
        <Col span={6}>
          <FormField 
            type="color"
            label="Border Color" 
            name="border-color"
            placeholder="#C8D0DB" 
            defaultValue="#C8D0DB"
            onChange={(value) => updateWrapperStyles("border-color" , value)}
          />
        </Col>
        <Col span={6}>
          <FormField 
            type="number" 
            label="Border Width"
            name="border-width"
            placeholder="1"
            onChange={(value) => updateWrapperStyles("border-width", value, 'px')}
            unit="px"
          />
        </Col>
        <Col span={6}>
          <Item label="Border Style" name="border-style" wrapperCol={{span: 24}} labelCol={{span: 24}} >
            <Select style={{ width: '100%' }} onChange={(value) => updateWrapperStyles("border-style", value)}>
              { BORDER_STYLES.map((type, idx) => <Option value={type} key={idx}>{type}</Option>) }
            </Select>
          </Item>
        </Col>
        <Col span={6}>
          <FormField 
            label="Border Radius" 
            name="border-radius"
            placeholder="4" 
            defaultValue="4" 
            onChange={(e) => updateWrapperStyles("border-radius", e.target.value, 'px')}
            unit="px" 
          />
        </Col>
      </Row>
      <Row type="flex" gutter={24}>
        <Col span={12}>
          <FormField 
            label="Box shadow"
            name="border-radius" 
            placeholder="0px 0px 3px rgba(23, 31, 39, 0.3)" 
            defaultValue="0px 0px 3px rgba(23, 31, 39, 0.3)" 
             onChange={(e) => updateWrapperStyles("box-shadow", e.target.value) } 
          />
        </Col>
      </Row>
    </>
  )
}

export default BordersShadows;
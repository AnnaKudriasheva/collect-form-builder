import React from 'react';
import {  Row, Col, Select, Input } from 'antd';
import { Form } from 'antd';

import { numericValidation } from '../../utils/validation';
import { BOX_SIZING } from '../../utils/constants';
import FormField from '../../components/FormField';

const { Option } = Select;
const { Item } = Form;

const BoxModel = (props) => {
  const { updateWrapperStyles } = props;

  const paddings = [
    { top: 6 },
    { right: 12 },
    { bottom: 6 },
    { left: 12 }
  ];

  const margins = [
    { top: null },
    { right: null },
    { bottom: null },
    { left: null }
  ];

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
              { BOX_SIZING.map((type, idx) => <Option value={type} key={idx}>{type}</Option>) }
            </Select>
          </Item>
        </Col>
      </Row>
      <h4>Padding</h4>
      <Row type="flex" gutter={24}>
        {
          paddings.map((prop) => (
            <Col span={6}>
              <FormField 
                label={Object.keys(prop)[0]} 
                name={`padding-${Object.keys(prop)[0]}`}
                validation={numericValidation}
                defaultValue={prop[Object.keys(prop)[0]]}
                placeholder="0"
                onChange={(value => updateWrapperStyles(`padding-${Object.keys(prop)[0]}`, value, 'px'))}
                unit="px"
              />
            </Col>
          ))
        }
      </Row>
      <h4>Margin</h4>
      <Row type="flex" gutter={24}>
        {
          margins.map((prop) => (
            <Col span={6}>
              <FormField 
                label={Object.keys(prop)[0]} 
                name={`margin-${Object.keys(prop)[0]}`}
                validation={numericValidation}
                defaultValue={prop[Object.keys(prop)[0]]}
                placeholder="0"
                onChange={(value => updateWrapperStyles(`margin-${Object.keys(prop)[0]}`, value, 'px'))}
                unit="px"
              />
            </Col>
          ))
        }
      </Row>
    </>
  )
}

export default BoxModel;

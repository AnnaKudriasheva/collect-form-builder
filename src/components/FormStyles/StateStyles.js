import React from 'react';
import ColorPicker from '../ColorPicker';
import { Row, Col, Input } from '@vgs/elemente';
import CheckboxController from '../CheckboxController';
import { Form } from 'antd';

const { Item } = Form;

const StateStyles = (props) => {
  const { updateStateStyles, styles, onUnchecked } = props;
  return (
    <>
      <Row type="flex" gutter={24}>
        <Col span={12}>
          <CheckboxController label="Focused field state" checked={Object.keys(styles.focused).length !== 0} onUnchecked={() => onUnchecked('focused')}>
            <Item label="Border Color" name="focused-border-color" wrapperCol={{span: 24}} labelCol={{span: 24}} >
              <ColorPicker placeholder="#C8D0DB" initialValue="#145FF5"  onChange={(value) => updateStateStyles('focused', {'border-color': value})} />
            </Item>
            <Item label="Box Shadow" name="focused-box-shadow" wrapperCol={{span: 24}} labelCol={{span: 24}} >
              <Input placeholder="5px 5px 10px" onChange={(e) => updateStateStyles('focused', {'box-shadow': e.target.value})} />
            </Item>
          </CheckboxController>
        </Col>
        <Col span={12}>
          <CheckboxController label="Invalid field state" checked={Object.keys(styles.invalid).length !== 0} onUnchecked={() => onUnchecked('invalid')}>
            <Item label="Border Color" name="invalid-border-color" wrapperCol={{span: 24}} labelCol={{span: 24}} >
              <ColorPicker placeholder="#C8D0DB" initialValue="#FF0000"  onChange={(value) => updateStateStyles('invalid', {'border-color': value })} />
            </Item>
            <Item label="Box Shadow" name="invalid-box-shadow" wrapperCol={{span: 24}} labelCol={{span: 24}} >
              <Input placeholder="5px 5px 10px" onChange={(e) => updateStateStyles('invalid',{'box-shadow': e.target.value})} />
            </Item>
          </CheckboxController>
        </Col>
      </Row>
    </>
  )
}

export default StateStyles;
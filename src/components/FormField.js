import React from 'react';
import { Input, InputNumber } from 'antd';
import ColorPicker from '../components/ColorPicker';
import { Form } from 'antd';

const { Item } = Form;

const FormField = (props) => {
  const { 
    label,
    name,
    defaultValue,
    placeholder,
    onChange,
    unit,
    step = 1,
    validation = {},
    tooltip,
    type = 'text',
  } = props;

  const sharedProps = {
    placeholder,
    onChange,
    validation,
  }

  const mapTypeToComponent = {
    'text': Input,
    'number': InputNumber,
    'color': ColorPicker,
  }

  const Component = mapTypeToComponent[type];

  const getFieldProps = () => {
    switch(type) {
      case 'text':
        return { ...sharedProps, defaultValue }
      case 'number':
        return { ...sharedProps, defaultValue, step }
      case 'color':
        return { ...sharedProps, initialValue: defaultValue }
      default:
        return { ...sharedProps, defaultValue }
    }
  }

  return (
    <Item label={label} name={name} wrapperCol={{span: 24}} labelCol={{span: 24}} rules={[validation]} tooltip={tooltip}>
      <div className="d-flex align-center">
        <Component {...getFieldProps()} /> 
        {unit && <span style={{ marginLeft: '8px' }}>{unit}</span>}
      </div>
    </Item>
  )
}

export default FormField;

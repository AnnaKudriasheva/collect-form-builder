import React from 'react';
import { Select } from '@vgs/elemente';

const { Option } = Select;

const MultiSelect = (props) => {
  const { options, defaultValue } = props;

  return (
    <Select
      mode="multiple"
      style={{ width: '100%' }}
      placeholder="Please select validation"
      value={defaultValue}
      onChange={(v) => props.handleChange(v)}
    >
      {options.map((option, idx) => (<Option key={idx} value={option}>{option}</Option>))}
    </Select>
  )
}

export default MultiSelect;

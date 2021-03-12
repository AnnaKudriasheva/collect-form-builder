import React, { useState, useEffect } from 'react';
import { Input } from '@vgs/elemente';
import InputColor from 'react-input-color';

const ColorPicker = (props) => {
  const { placeholder, initialValue, onChange } = props;
  const [color, setColor] = useState('');

  useEffect(() => {
    setColor(initialValue)
  }, [props.initialValue]);

  useEffect(() => {
    onChange(color);
  }, [color]);

  return (
    <Input
      placeholder={placeholder}
      value={color}
      onChange={(e) => setColor(e.target.value)}
      suffix={
      <InputColor
        style={{ width: '24px', padding: '0' }}
        initialValue={color || initialValue}
        onChange={(color) => setColor(color.hex)}
        placement="right"
      />
    }/>
  )
}

export default ColorPicker;

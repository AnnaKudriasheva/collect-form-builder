import React, { useContext } from 'react';
import FieldOptions from './FieldOptions';
import { FormContext } from '../context/form-context';

const FieldOptionsContainer = (props) => {
  const [state, dispatch] = useContext(FormContext);
  return (
    <div className={`field-options-container ${state.mode ? '' : 'closed'}`}>
      <FieldOptions />
    </div>
  )
}

export default FieldOptionsContainer;
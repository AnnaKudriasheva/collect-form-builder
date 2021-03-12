import React, { useContext } from 'react';
import FieldOptions from '../components/FieldOptions';
import { FormContext } from '../context/form-context';

const FieldOptionsContainer = () => {
  const [state, dispatch] = useContext(FormContext);
  return (
    <div className={`field-options-container ${state.mode ? '' : 'closed'}`}>
      <FieldOptions />
    </div>
  )
}

export default FieldOptionsContainer;
import React, { useState, useEffect, useContext } from 'react';
import { Button, Input, Select, Divider, Checkbox, Row, Col, Card } from '@vgs/elemente';
import { Space } from 'antd';
import CheckboxController from '../atoms/CheckboxController';
import { FormContext } from '../context/form-context';

const availableConfiguration = {
  'text': {
    validations: ['required', 'regExp'],
    css: {}
  },
  'card-number': {
    validations: ['required', 'validCardNumber'],
    showCardIcon: true,
    css: {}
  },
  'card-expiration-date': {
    validations: ['required', 'validCardExpirationDate'],
    css: {}
  },
  'card-security-code': {
    validations: ['required', 'validCardSecurityCode'],
    showCardIcon: false,
    css: {}
  },
  'ssn': {
    validations: ['required', 'validSSN'],
    css: {}
  },
  'zip-code': {
    validations: ['required', 'regExp'],
    css: {}
  },
  'password': {
    validations: ['required', 'regExp'],
    css: {}
  },
  'number': {
    validations: ['required', 'regExp'],
    css: {}
  },
  'textarea': {
    validations: ['required', 'regExp'],
    css: {}
  },
  'checkbox': {
    validations: ['required', 'regExp'],
    css: {}
  },
  'radio': {
    validations: ['required', 'regExp'],
    css: {}
  },
}

const defaultCreatorValues = {
  name: '',
  type: 'text',
  placeholder: '',
  validations: ['required'],
  label: '',
  css: {
    fontSize: '16px',
    height: '100%',
    '&:placeholder': {
      color: 'grey',
    }
  }
};

const { Option } = Select;
const { TextArea } = Input; 

const FieldOptions = (props) => {
  const [field, updateField] = useState(defaultCreatorValues);
  const [state, dispatch] = useContext(FormContext);

  useEffect(() => {
    if (Object.keys(state.currentActiveField).length !== 0 && state.mode === 'edit') {
      console.log('here');
      updateField(state.currentActiveField);
    }
  }, [state.mode, state.currentActiveField]);

  const handleSelectChange = (value, prop) => {
    updateField({...field, [prop]: value })
  }

  const handleInputChange = (e) => {
    updateField({...field, [e.target.id]: e.target.value })
  }

  const handleCreateClick = () => {
    dispatch({ type: 'CREATE_FIELD', payload: field });
    resetMode();
  }

  const handleUpdateClick = () => {
    dispatch({ type: 'UPDATE_FIELD', payload: field });
    resetMode();
  }

  const resetMode = () => {
    dispatch({type: 'SET_MODE', payload: '',});
    updateField(defaultCreatorValues);
  }

  const controlButtons = (
    <Space align="center">
    <Button onClick={resetMode}>Cancel</Button>
    {
    state.mode && state.mode === 'edit' ? 
        <Button onClick={handleUpdateClick}>Update</Button> :
        <Button onClick={handleCreateClick}>Create</Button>  
    }
    </Space>
  );

  return (
  <Card title="Field Options" extra={controlButtons} style={{ width: '100%' }} bordered={false}>
      <Row gutter={48}>
        <Col span={12}>
          <label>*Select field type:</label>
          <Select value={field.type} style={{ width: '100%' }} onChange={(value) => handleSelectChange(value, 'type')}>
            { Object.keys(availableConfiguration).map((type, idx) => <Option value={type} key={idx}>{type}</Option>) }
          </Select>
          <p>The type of the data this field will collect</p>
        </Col>
        <Col span={12}>
          <label>*Enter field name:</label>
          <Input type="text" onChange={handleInputChange} id="name" value={field.name} placeholder="Field name"/>
          <p>How this field will be named in your code</p>
        </Col>
      </Row>
      <Divider />
      <Row gutter={48}>
        <Col span={12}>
          <div className="form-group">
            <CheckboxController label="Field label" description="Do you want a label above your field?">
              <Input type="text" style={{ width: '100%' }} onChange={handleInputChange} id="placeholder" value={field.label} placeholder="Field label"/>
            </CheckboxController>
          </div>
          <div className="form-group">
            <CheckboxController label="Placeholder text" description="Do you want placeholder text in your field?">
              <Input type="text" style={{ width: '100%' }} onChange={handleInputChange} id="placeholder" value={field.placeholder} placeholder="Field placeholder"/>
            </CheckboxController>
          </div>
        </Col>
        <Col span={12}>
          <div className="form-group">
            <label style={{ marginRight: '1rem' }}>Validations:</label>
            <Checkbox.Group options={availableConfiguration[field.type].validations} defaultValue={field.validations} onChange={(values) => handleSelectChange(values, 'validations')}/>
          </div>
          <div className="form-group">
            {availableConfiguration[field.type].showCardIcon && <Checkbox>Show card icon</Checkbox>}
          </div>
        </Col>
      </Row>
    </Card>
    // <div>
    //   <div className="mb-2">
    //     <div>
    //       <label>*Enter field name:</label>
    //       <Input type="text" onChange={handleInputChange} id="name" value={field.name} placeholder="Field name"/>
    //       <p>How do you want this field named in your code?</p>
    //     </div>
    //     <div className='mb-1'>
    //       <label>*Select field type:</label>
    //       <Select value={field.type} style={{ width: '100%' }} onChange={(value) => handleSelectChange(value, 'type')}>
    //         {Object.keys(availableConfiguration).map((type, idx) => <Option value={type} key={idx}>{type}</Option>)}
    //       </Select>
    //       <p>What type of data will this field collect?</p>
    //     </div>
    //   </div>
    //   <div>
    //     <h3>Field options</h3>
    //     <p>What functionality do you want your field to have?</p>
    //   </div>
    //   <div className='mb-1'>
    //     <SwitchController label="Field label" description="Do you want a label above your field?">
    //       <Input type="text" style={{ width: '100%' }} onChange={handleInputChange} id="placeholder" value={field.label} placeholder="Field label" />
    //     </SwitchController>
    //   </div>
    //   <div className='mb-1'>
    //     <SwitchController label="Placeholder text" description="Do you want placeholder text in your field?">
    //       <Input type="text" style={{ width: '100%' }} onChange={handleInputChange} id="placeholder" value={field.placeholder} placeholder="Field placeholder"/>
    //     </SwitchController>
    //   </div>
      // <div className='mb-1'>
      //   <label style={{ marginRight: '1rem' }}>Validations:</label>
      //   <Checkbox.Group options={availableConfiguration[field.type].validations} defaultValue={field.validations} onChange={(values) => handleSelectChange(values, 'validations')}/>
      // </div>
    //   <div className='mb-1'>
    //     <label>Style:</label>
    //     <TextArea rows={3} defaultValue={JSON.stringify(field.css)} />
    //   </div>
    //   {
    //     state.editMode ? 
    //     <Button onClick={handleUpdateClick}>Update Field</Button> :
    //     <Button onClick={handleCreateClick}>Create field</Button>
    //   }
    //   <Divider orientation="center">or</Divider> 
    //   <Button onClick={props.handleFormCreate}>Create form</Button>
    // </div>
  )
}

export default FieldOptions;

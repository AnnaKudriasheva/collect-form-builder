import React, { useState, useEffect, useContext } from 'react';
import { Button, Input, Select, Divider, Checkbox, Row, Col, Card, Collapse, Form } from '@vgs/elemente';
import { Space } from 'antd';
import CheckboxController from '../components/CheckboxController';
import { FormContext } from '../context/form-context';
import MultiSelect from '../components/MultiSelect';

import availableConfiguration from '../configs/collect_fields_configuration.json';
import defaultCreatorValues from '../configs/collect_default_configuration.json';

const { Option } = Select;
const { Panel } = Collapse;

const FieldOptions = () => {
  const [field, updateField] = useState(defaultCreatorValues.text);
  const [availableConfig, setAvailableConfig] = useState(availableConfiguration.text);
  const [state, dispatch] = useContext(FormContext);

  useEffect(() => {
    if (Object.keys(state.currentActiveField).length !== 0 && state.mode === 'edit') {
      updateField(state.currentActiveField);
    }
    if (Object.keys(state.currentActiveField).length !== 0 && state.mode === 'create') {
      updateField(defaultCreatorValues.text);
    }
  }, [state.mode, state.currentActiveField]);

  useEffect(() => {
    setAvailableConfig(availableConfiguration[field.type]);
  }, [field]);

  const handleTypeChange = (value) => {
    updateField(defaultCreatorValues[value]);
  }

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
    dispatch({type: 'SET_MODE', payload: ''});
    updateField(defaultCreatorValues.text);
  }

  const controlButtons = (
    <Space align="center">
    <Button onClick={resetMode} type="default">Cancel</Button>
    {state.mode === 'edit' && <Button onClick={handleUpdateClick}>Update</Button> }
    {state.mode === 'create' && <Button onClick={handleCreateClick}>Create</Button> }
    </Space>
  );

  return (
  <div className="field-options">
    <Card title={`Field Options ${state.mode === 'edit' ? `(${field.name})`: ''}`} extra={controlButtons} style={{ width: '100%' }} bordered={false}>
        <Row gutter={48}>
          <Col span={12}>
            <label>*Select field type:</label>
            <Select value={field.type} style={{ width: '100%' }} onChange={(value) => handleTypeChange(value)}>
              { Object.keys(availableConfiguration).map((type, idx) => <Option value={type} key={idx}>{type}</Option>) }
            </Select>

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
              <CheckboxController label="Field label" checked={!!field.label}>
                <Input type="text" style={{ width: '100%' }} onChange={handleInputChange} id="label" value={field.label} placeholder="Field label"/>
              </CheckboxController>
            </div>
            <div className="form-group">
              <CheckboxController label="Placeholder text" checked={!!field.placeholder}>
                <Input type="text" style={{ width: '100%' }} onChange={handleInputChange} id="placeholder" value={field.placeholder} placeholder="Field placeholder"/>
              </CheckboxController>
            </div>
          </Col>
          <Col span={12}>
            <div className="form-group">
              <label style={{ marginRight: '1rem' }}>Field validation types:</label>
              <MultiSelect options={availableConfig.validations} defaultValue={field.validations} handleChange={(v) => handleSelectChange(v, 'validations')} />
            </div>
            <div className="form-group">
              {availableConfig.showCardIcon && <Checkbox checked={field.showCardIcon} onChange={(e) => handleSelectChange(e.target.checked, 'showCardIcon')}>Show card icon</Checkbox>}
            </div>
            <div className="form-group">
              {availableConfig.hideValue && <Checkbox checked={field.hideValue} onChange={(e) => handleSelectChange(e.target.checked, 'hideValue')}>Mask CVV value</Checkbox>}
            </div>
          </Col>
        </Row>
        <Divider />
        <Collapse className="form-builder-collapse">
          <Panel header="Advanced field options" key="1">
          <Row gutter={48}>
            <Col span={12}>
              {availableConfig.autoComplete &&
              <div className="form-group">
                <CheckboxController label="Field autocomplete" checked={!!field.autoComplete}>
                  <Select value={field.autoComplete} style={{ width: '100%' }} onChange={(v) => handleSelectChange(v, 'autoComplete')} placeholder="Select attribute value">
                    {availableConfig.autoComplete.map((item, idx) => (
                      <Option value={item} key={idx}>{item}</Option>
                    ))}
                  </Select>
                </CheckboxController>
              </div>
              }
              <div className="form-group">
                <Checkbox checked={field.autoFocus} onChange={(e) => handleSelectChange(e.target.checked, 'autoFocus')}>Auto Focus</Checkbox>
              </div>
            </Col>
            <Col span={12}>
              <Checkbox checked={field.disabled} onChange={(e) => handleSelectChange(e.target.checked, 'disabled')}>Disabled field</Checkbox>
            </Col>
          </Row>
          </Panel>
        </Collapse>
      </Card>
    </div>
  )
}

export default FieldOptions;


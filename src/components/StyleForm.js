import React, { useContext, useEffect, useState } from 'react';
import { FormStylesContext } from '../context/styles-context';
import { Collapse, Row, Col, Button } from '@vgs/elemente';
import { Form, notification } from 'antd';

import TextOptions from '../components/FormStyles/TextOptions';
import BordersShadows from '../components/FormStyles/BordersShadows';
import BoxModel from '../components/FormStyles/BoxModel';
import StateStyles from '../components/FormStyles/StateStyles';
import Label from '../components/FormStyles/Label';

const { Panel } = Collapse;

const StlyeForm = () => {
  const [iframeStyles, setIframeStyles] = useState({});
  const [wrapperStyles, setWrapperStyles] = useState({});
  const [stateStyles, setStateStyles] = useState({});
  const [labelStyles, setLabelStyles] = useState({});
  const [styles, dispatchStyles] = useContext(FormStylesContext);

  useEffect(() => {
    setIframeStyles(styles.iframe);
    setWrapperStyles(styles.wrapper);
    setStateStyles(styles.state);
    setLabelStyles(styles.label);
  }, [styles]);

  const handleStylesUpdate = () => {
    dispatchStyles({ type: 'UPDATE_WRAPPER_STYLES', payload: wrapperStyles });
    dispatchStyles({ type: 'UPDATE_IFRAME_STYLES', payload: iframeStyles });
    dispatchStyles({ type: 'UPDATE_STATE_STYLES', payload: stateStyles });
    dispatchStyles({ type: 'UPDATE_LABEL_STYLES', payload: labelStyles });
    notification.success({ message: 'Applied successfully!', duration: 1 });
  }

  const updateStateStyles = (state, rule) => {
    setStateStyles({...stateStyles, [state]: { ...styles.state[state], ...rule }});
  }

  const updateLabelStyles = (rule, value, unit = '') => {
    setLabelStyles({ ...labelStyles, [rule]: value ? `${value}${unit}` : value })
  }

  const updateIframeStyles = (rule, value, unit = '') => {
    if (typeof rule === 'string') {
      setIframeStyles({ ...iframeStyles, [rule]: value ? `${value}${unit}` : value })
    }
    if (typeof rule === 'object') {
      const selector = `&${rule.selector}`;
      if (rule.selector && rule.name) {
        setIframeStyles({ ...iframeStyles, [selector]: {...iframeStyles[selector], [rule.name]: value ? `${value}${unit}` : value }});
      }
    }
  }

  const updateWrapperStyles = (rule, value, unit = '') => {
    if (typeof rule === 'string') {
      setWrapperStyles({ ...wrapperStyles, [rule]: value ? `${value}${unit}` : value })
    }
    if (typeof rule === 'object') {
      const selector = `&${rule.selector}`;
      if (rule.selector && rule.name) {
        setWrapperStyles({ ...wrapperStyles, [selector]: {...wrapperStyles[selector], [rule.name]: value ? `${value}${unit}` : value }});
      }
    }
  }

  const onUncheckedControlCheckbox = (state) => {
    setStateStyles({...stateStyles, [state]: {}});
  }

  return (
    <>
      <Form name="style-form" onFinish={handleStylesUpdate} initialValues={
        {
          "border-style": "solid",
          "focused-box-shadow": styles.state.focused['box-shadow'] || '',
          "focused-border-color": styles.state.focused['border-color'] || '',
          "invalid-box-shadow": styles.state.invalid['box-shadow'] || '',
          "invalid-border-color": styles.state.invalid['border-color'] || '',
        }
        }>
        <Collapse defaultActiveKey={["1"]} className="form-builder-collapse" accordion>
          <Panel header="Text options" key="1">
            <TextOptions updateIframeStyles={updateIframeStyles} />
          </Panel>
          <Panel header="Field borders and shadows" key="2">
            <BordersShadows updateWrapperStyles={updateWrapperStyles}/>
          </Panel>
          <Panel header="Label" key="3">
            <Label updateLabelStyles={updateLabelStyles}/>
          </Panel>
          <Panel header="Box model" key="4">
            <BoxModel updateWrapperStyles={updateWrapperStyles} />
          </Panel>
          <Panel header="Form state colors" key="5">
            <StateStyles updateStateStyles={updateStateStyles} styles={styles.state} onUnchecked={onUncheckedControlCheckbox}/>
          </Panel>
        </Collapse>
        <Row type="flex" justify="end" className="mb-2">
          <Col>
            <Button htmlType="submit" type="primary">Apply changes</Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default StlyeForm;

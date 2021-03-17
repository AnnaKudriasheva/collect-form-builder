import React, { useContext, useEffect, useState } from 'react';
import { FormStylesContext } from '../context/styles-context';
import { Collapse, Form, Row, Col, Button } from '@vgs/elemente';
import ColorPicker from '../components/ColorPicker';

import TextOptions from '../components/FormStyles/TextOptions';
import BordersShadows from '../components/FormStyles/BordersShadows';
import BoxModel from '../components/FormStyles/BoxModel';

const { Panel } = Collapse;
const { Item } = Form;

const ManageForm = () => {
  const [iframeStyles, setIframeStyles] = useState({});
  const [wrapperStyles, setWrapperStyles] = useState({});
  const [stateStyles, setStateStyles] = useState({});
  const [styles, dispatchStyles] = useContext(FormStylesContext);

  useEffect(() => {
    setIframeStyles(styles.iframe);
    setWrapperStyles(styles.wrapper);
  }, styles);

  const handleStylesUpdate = () => {
    dispatchStyles({ type: 'UPDATE_WRAPPER_STYLES', payload: wrapperStyles });
    dispatchStyles({ type: 'UPDATE_IFRAME_STYLES', payload: iframeStyles });
    dispatchStyles({ type: 'UPDATE_STATE_STYLES', payload: stateStyles });
  }

  const updateStateStyles = (rule, value, unit = '') => {
    setStateStyles({...stateStyles, rule: {color: value }});
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

  return (
    <>
      <Collapse defaultActiveKey={["1"]} className="form-builder-collapse">
        <Panel header="Text options" key="1">
          <TextOptions updateIframeStyles={updateIframeStyles} />
        </Panel>
        <Panel header="Field borders and shadows" key="2">
          <BordersShadows updateWrapperStyles={updateWrapperStyles}/>
        </Panel>
        <Panel header="Box model" key="3">
          <BoxModel updateWrapperStyles={updateWrapperStyles} />
        </Panel>
        <Panel header="Form colors" key="4">
          <Row type="flex" justify="start" gutter={24}>
            <Col span={8}>
              <Item label="Field focused">
                <ColorPicker placeholder="#40545F" initialValue="#40545F" onChange={(value) => updateStateStyles({ ...stateStyles, focused : { color: value }})} />
              </Item>
            </Col>
            <Col span={8}>
            </Col>
          </Row>
        </Panel>
      </Collapse>
      <Row type="flex" justify="end" className="mb-2">
        <Col>
          <Button onClick={handleStylesUpdate} type="primary">Save</Button>
        </Col>
      </Row>
    </>
  )
}

export default ManageForm;

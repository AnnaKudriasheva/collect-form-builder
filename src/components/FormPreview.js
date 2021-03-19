import React, { useContext, useEffect, useState } from 'react';
import { Form, Spin, Button } from '@vgs/elemente';
import { loadVGSCollect } from '@vgs/collect-js';
import { SyncOutlined } from '@ant-design/icons';
import { createUseStyles, ThemeProvider, useTheme } from 'react-jss';

import { FormContext } from '../context/form-context';
import { FormStylesContext } from '../context/styles-context';

const useStyles = createUseStyles({
  containerFocused: props => ({
    "& .vgs-collect-container__focused": props.state.focused
  }),
  containerInvalid: props => ({
    "& .vgs-collect-container__invalid.vgs-collect-container__dirty:not(.vgs-collect-container__focused)": props.state.invalid,
  }),
  wrapper: props => (props.wrapper)
});

const FormPreview = () => {
  const [state, dispatch] = useContext(FormContext);
  const [styles, dispatchStyles] = useContext(FormStylesContext);
  const [nodes, setNodes] = useState(['cardholder-name', 'card-number', 'card-expiration-date', 'card-security-code']);
  const [form, setForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const stateClasses = useStyles(styles);

  useEffect(() => {
    setLoading(true);
    loadVGSCollect({
      vaultId: 'tnt12345678',
      environment: 'sandbox',
      version: '2.5.0'
    }).then((collect) => {
      const form = collect.init(s => { 
        if (state && Object.keys(s).length === state.form.length) {
          setLoading(false);
        }
      });
      initCollectFields(form);
      setForm(form);
    });
  },[]);

  useEffect(() => {
    refreshForm();
  },[state.form, styles.iframe]);

  const refreshForm = () => {
    setLoading(true);
    if (state.form && window.VGSCollect) {
      const htmlNodes = state.form.map(field => field.name);
      form.fields.map(frame => frame.delete());
      Promise.resolve().then(() => {
        const form = window.VGSCollect.init(s => {
          if (Object.keys(s).length === state.form.length) {
            setLoading(false);
          }
        });
        setNodes(htmlNodes);
        if (!state.form.length) {
          setLoading(false);
        } else {
          initCollectFields(form);
        }
        setForm(form);
      });
    }
  }

  const initCollectFields = (form) => {
    state.form.forEach(field => {
      const { id, label, ...params } = field;
      form.field(`#${field.name.split(' ').join('-').toLowerCase()}`, {...params, css: styles.iframe});
    });
    setForm(form);
  }

  return (
    <>
      <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>
        Form Preview
        <Button 
          className="round-btn"
          type="default"
          onClick={refreshForm}
        >
          <SyncOutlined />
        </Button>
      </h3>
      <Spin spinning={loading}>
      {nodes.length ? 
        <Form className={`
          ${Object.keys(styles.state.focused).length && stateClasses.containerFocused} 
          ${Object.keys(styles.state.invalid).length && stateClasses.containerInvalid}
        `}>
          {
            nodes.map((field, idx) => (
              <>
                {state.form[idx] && state.form[idx].label && <label>{state.form[idx].label}</label>}
                <div id={field.split(' ').join('-').toLowerCase()} className={stateClasses.wrapper} key={idx}></div>
              </>
            ))
          }
        </Form> :
        <p className="form-preview-empty">Add at least one field for preview</p>
      }
      </Spin>
    </>
  )
}

export default FormPreview;

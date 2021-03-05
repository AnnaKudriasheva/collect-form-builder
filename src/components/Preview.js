import React, { useContext, useEffect, useState } from 'react';
import { Divider, Button } from '@vgs/elemente';
import { loadVGSCollect } from '@vgs/collect-js';

import { FormContext } from '../context/form-context';

const wrapperStyle = {
  boxShadow: '0px 0px 3px rgba(23, 31, 39, 0.3)',
  border: '1px solid transparent',
  height: '2.5rem',
  padding: '.375rem .75rem',
  borderRadius: '.25rem',
  marginBottom: '1rem',
  width: '100%',
}

const Preview = () => {
  const [state, dispatch] = useContext(FormContext);
  const [form, setForm] = useState(false);

  useEffect(() => {
    loadVGSCollect({
      vaultId: 'tnt12345678', // required
      environment: 'sandbox',
      version: '2.4.0'
    }).then((e) => {
      const loadForm = new Function(getCollectConfiguration());
      const form = loadForm();
      setForm(form);
    });
  },[]);

  useEffect(() => {
    if (state.form && window.VGSCollect) {
      form.fields.map(frame => frame.delete());

      setTimeout(() => {
        const loadForm = new Function(getCollectConfiguration());
        const form = loadForm();
        setForm(form);
      });
    }
  },[state.form]);


  const getCollectConfiguration = () => {
    return `
      const form = VGSCollect.create('tnt12345678',
                'sandbox', (state) => {});
      ${
        state.form.map(field => {
          return `
      form.field('#${field.name.split(' ').join('-').toLowerCase()}', {
        name: '${field.name.split(' ').join('-').toLowerCase()}',
        type: '${field.type}',
        placeholder: '${field.placeholder}',
        validations: ${JSON.stringify(field.validations)},
        css: ${JSON.stringify(field.css)},
      });`
      }).join('\n')
      }
      return form`.trim();
  };

  return (
    <>
      <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Form Preview</h3>
      {
        state.form.map((field) => (
          <div id={field.name.split(' ').join('-').toLowerCase()} style={wrapperStyle} className="mb-1"></div>
        ))
      }
      <Button>Submit</Button>
    </>
  )
}

export default Preview;
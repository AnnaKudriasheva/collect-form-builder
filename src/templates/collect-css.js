import endent from 'endent';

const stringify = (obj_from_json) => {
	if (typeof obj_from_json !== "object" || Array.isArray(obj_from_json)){
    	return JSON.stringify(obj_from_json);
    }
    let props = Object
    	.keys(obj_from_json)
        .map(key => obj_from_json[key] && `${key}: ${obj_from_json[key]};`)
        .join('\n');
    return props;
}


const getCollectCSSConfiguration = (styles) => {
  let { wrapper, state, label } = styles;

  if (!wrapper['border-width']) {
    delete wrapper['border-width'];
    delete wrapper['border-color'];
    delete wrapper['border-style'];
  }

  const rules = stringify(wrapper);
  const labelRules = stringify(label);
  return endent`
    * {
      box-sizing: border-box;
    }
    
    iframe {
      width: 100%;
      height: 100%;
    }
    label {
      ${labelRules}
    }
    .field-wrapper {
      ${rules}
    }
    .vgs-collect-container__focused {
      ${
        Object.keys(state.focused).length &&
        stringify(state.focused)
      }
    }
    .vgs-collect-container__invalid.vgs-collect-container__dirty:not(.vgs-collect-container__focused) {
      ${
        Object.keys(state.invalid).length &&
        stringify(state.invalid)
      }
    }
    `.trim();
};

export default getCollectCSSConfiguration;
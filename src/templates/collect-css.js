import endent from 'endent';

const stringify = (obj_from_json) => {
	if (typeof obj_from_json !== "object" || Array.isArray(obj_from_json)){
    	// not an object, stringify using native function
    	return JSON.stringify(obj_from_json);
    }
    // Implements recursive object serialization according to JSON spec
    // but without quotes around the keys.
    let props = Object
    	.keys(obj_from_json)
        .map(key => obj_from_json[key] && `${key}: ${obj_from_json[key]};`)
        .join('\n');
    return props;
}


const getCollectCSSConfiguration = (state, styles) => {
  const rules = stringify(styles);
  return endent`
    iframe {
      width: 100%;
      height: 100%;
    }
    .field-wrapper {
      ${rules}
    }
    `.trim();
};

export default getCollectCSSConfiguration;
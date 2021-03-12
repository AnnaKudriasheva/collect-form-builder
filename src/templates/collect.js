import endent from 'endent';

const getCollectConfiguration = (state, styles) => {
  const filteredStyles = Object.entries(styles).filter(([key, value]) => value);
  return endent`
    const form = window.VGSCollect.create('${state.vault_id}', '${state.environment}', (state) => {});\n
    const css = ${JSON.stringify(Object.fromEntries(filteredStyles))};\n
    ${
      state.form.map(field => {
        const { id, label, ...picked } = field;
        return endent`
          form.field('#${field.name.split(' ').join('-').toLowerCase()}', {
            ${Object.keys(picked).map(prop => `${prop}: ${JSON.stringify(picked[prop])}`).join(',\n')},
            css
          });
        `}
      ).join('\n')
    }\n
    form.submit('${state.httpMethod}', { method: '${state.endpoint}'}, (status, data) => { console.log(data) });
    `.trim();
};

export default getCollectConfiguration;

import endent from 'endent';

const getCollectConfiguration = (state, styles) => {
  const filteredStyles = Object.entries(styles).filter(([_key, value]) => value);
  const vaultId = state.vault_id || '<VAULT_ID>';
  return endent`
    const form = window.VGSCollect.create('${vaultId}', '${state.environment}', (state) => {});\n
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
    document.addEventListener('submit', (e) => {
      e.preventDefault();
      form.submit('${state.endpoint}', { method: '${state.httpMethod}'}, (status, data) => { 
        document.getElementById('response').innerText = JSON.stringify(data.json, null, ' ');
      });
    });
    `.trim();
};

export default getCollectConfiguration;

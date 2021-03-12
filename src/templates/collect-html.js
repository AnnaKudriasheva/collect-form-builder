import endent from 'endent';

const getCollectHTMLConfiguration = (state, styles) => {
  return endent`
  <form>
    ${
      state.form.map(field => {
        return endent`
          <div>
            <label>${field.label}</label>
            <div id="${field.name.split(' ').join('-').toLowerCase()}" class="field-wrapper"></div>
          </div>
        `}
      ).join('\n')
    }
  </form>
  <script src="https://js.verygoodvault.com/vgs-collect/2.4.0/vgs-collect.js"></script>
  `.trim();
};

export default getCollectHTMLConfiguration;

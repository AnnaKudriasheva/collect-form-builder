import endent from 'endent';

const getCollectHTMLConfiguration = (state) => {
  return endent`
  <!DOCTYPE html>
  <html>
  <head>
    <link rel="stylesheet" href="./styles.css">
  </head>
  <body>
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
      <button type="submit">Submit</button>
      <pre id="response"></pre>
    </form>
    <script src="https://js.verygoodvault.com/vgs-collect/2.5.0/vgs-collect.js"></script>
    <script src="./form.js"></script>
  </body>
  </html>
  `.trim();
};

export default getCollectHTMLConfiguration;

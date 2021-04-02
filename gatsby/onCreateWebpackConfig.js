const config = require('config');
const fs = require('fs');
const path = require('path');

const publicFolderPath = path.resolve(__dirname, '../public');

if (!fs.existsSync(publicFolderPath)) {
  fs.mkdirSync(publicFolderPath);
}

fs.writeFileSync(
  path.resolve(__dirname, '../public/client.json'),

  // can to 'omit(['secret'], config)' to clear sensitive data from config as it's publicly visible
  JSON.stringify(config)
);

module.exports = exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        config: path.resolve(__dirname, '../public/client.json'),
      },
    },
    devtool: 'source-map',
    node: {
      fs: 'empty',
    },
  });
};

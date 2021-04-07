const React = require("react");
const AuthContextProvider = require('./src/context/AuthContext').default;

require("./src/styles/main.less");

exports.wrapRootElement = ({ element }) => {
  return (
    <AuthContextProvider>
      {element}
    </AuthContextProvider>
  )
}

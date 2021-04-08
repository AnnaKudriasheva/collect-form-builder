const React = require("react");
const AuthContextProvider = require('./src/context/AuthContext').default;
const UserContextProvider = require('./src/context/UserContext').default;
const ErrorBoundary = require('./src/components/ErrorBoundary').default;

require("./src/styles/main.less");

exports.wrapRootElement = ({ element }) => {
  return (
    <ErrorBoundary>
      <AuthContextProvider>
        <UserContextProvider>
          {element}
        </UserContextProvider>
      </AuthContextProvider>
    </ErrorBoundary>
  )
}

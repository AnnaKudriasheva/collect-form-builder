const React = require("react");
const config = require("config");
const { QueryClient, QueryClientProvider } = require('react-query');
const AuthContextProvider = require('./src/context/AuthContext').default;
const ErrorBoundary = require('./src/components/ErrorBoundary').default;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

require("./src/styles/main.less");

exports.wrapRootElement = ({ element }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <AuthContextProvider>
          {element}
        </AuthContextProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  )
}

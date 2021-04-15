const React = require("react");
const config = require("config");
const { QueryClient, QueryClientProvider } = require('react-query');
const { HeapAnalyticsProvider, GoogleTagManagerProvider } = require('@vgs/elemente');
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
        <HeapAnalyticsProvider heapTrackingId={config.heapTrackingId}>
          <GoogleTagManagerProvider gtmConfig={config.googleTagManagerConfig}>
            <AuthContextProvider>
              {element}
            </AuthContextProvider>
          </GoogleTagManagerProvider>
        </HeapAnalyticsProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  )
}

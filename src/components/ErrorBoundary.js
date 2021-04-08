import React, { useEffect } from 'react'
import { ErrorBoundary as EB } from 'react-error-boundary'
import { initRollbar } from '../utils/rollbar'

const ErrorFallback = ({error, resetErrorBoundary}) => {
  return (
    <div role="alert">
      <p>Sorry, something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

const ErrorBoundary = ({ children }) => {
  useEffect(() => {
    initRollbar();
  }, [])

  return (
    <EB
      FallbackComponent={ErrorFallback}
    >
      {children}
    </EB>
  )
}

export default ErrorBoundary;

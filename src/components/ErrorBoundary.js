import React, { useEffect } from 'react'
import { Result, Button } from 'antd'
import { ErrorBoundary as EB } from 'react-error-boundary'
import { initRollbar } from '../utils/rollbar'

const ErrorFallback = ({_error, resetErrorBoundary}) => {
  return (
    <div role="alert">
      <Result
        status="warning"
        title="Sorry, something went wrong. 😔"
        extra={
          <Button onClick={() => {
            resetErrorBoundary();
            window.location.reload(false);
          }}>
            Reload page.
          </Button>
        }
      >
      </Result>
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

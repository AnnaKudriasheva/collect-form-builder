import { useMutation } from 'react-query'
import { checkVaultStatus } from '../../api'

const useCheckVaultProvisioning = ({ retryCount = 0 }) => {
  return useMutation(
    ({ vault }) => checkVaultStatus(vault),
    {
      retry: (errorCount) => {
        return errorCount <= retryCount;
      }
    }
  )
}

export default useCheckVaultProvisioning;

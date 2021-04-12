import { useMutation, useQueryClient } from 'react-query'
import { createVault } from '../../api'
import USER_QUERY, { USER_QUERY_TYPES } from './user_types'

const useCreateVault = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ organizationId, vaultName }) => createVault(organizationId, vaultName),
    {
      onSuccess: (vault) => {
        if (queryClient.getQueryData([USER_QUERY, USER_QUERY_TYPES.ORG_VAULT])) {
          queryClient.setQueryData([USER_QUERY, USER_QUERY_TYPES.ORG_VAULT], oldState => {
            return {
              ...oldState,
              vault,
              vaults: [...oldState.vaults, vault]
            }
          })
        } else {
          queryClient.setQueryData([USER_QUERY, USER_QUERY_TYPES.ORG_VAULT], [vault])
          queryClient.invalidateQueries([USER_QUERY, USER_QUERY_TYPES.ORG_VAULT])
        }
      },
    }
  )
}

export default useCreateVault;

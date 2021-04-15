import { useQuery } from 'react-query'
import { getRoutesByVault } from '../../api'
import { USER_QUERY_TYPES } from './userQueryTypes'

const useRoutes = ({ isEnabled, vault }) => {
  return useQuery(
    [USER_QUERY_TYPES.USER, USER_QUERY_TYPES.ROUTES],
    () => getRoutesByVault(vault),
    {
      enabled: !!isEnabled,
    }
  )
}

export default useRoutes

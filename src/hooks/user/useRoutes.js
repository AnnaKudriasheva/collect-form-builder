import { useQuery } from 'react-query'
import { getRoutesByVault } from '../../api'
import USER_TYPE, { USER_QUERY_TYPES } from './user_types'

const useRoutes = ({ isEnabled, vault }) => {
  return useQuery(
    [USER_TYPE, USER_QUERY_TYPES.ROUTES],
    () => getRoutesByVault(vault),
    {
      enabled: !!isEnabled,
    }
  )
}

export default useRoutes

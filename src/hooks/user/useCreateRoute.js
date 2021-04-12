import { useMutation } from 'react-query'
import { createRoute } from '../../api'

const useCreateRoute = () => {
  return useMutation(
    ({ vault, routeConfig }) => createRoute(vault, routeConfig),
  )
}

export default useCreateRoute;

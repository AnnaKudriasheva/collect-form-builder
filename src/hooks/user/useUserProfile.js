import { useQuery } from 'react-query'
import { getUserProfile } from '../../api'
import { USER_QUERY_TYPES } from './userQueryTypes'

const useUserProfile = ({ userId }) => {
  return useQuery(
    [USER_QUERY_TYPES.USER, USER_QUERY_TYPES.PROFILE],
    () => getUserProfile(userId),
    {
      enabled: !!userId,
    }
  )
}

export default useUserProfile

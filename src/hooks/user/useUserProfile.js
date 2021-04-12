import { useQuery } from 'react-query'
import { getUserProfile } from '../../api'
import USER_TYPE, { USER_QUERY_TYPES } from './user_types'

const useUserProfile = ({ userId }) => {
  return useQuery(
    [USER_TYPE, USER_QUERY_TYPES.PROFILE],
    () => getUserProfile(userId),
    {
      enabled: !!userId,
    }
  )
}

export default useUserProfile

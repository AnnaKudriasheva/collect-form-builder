import { useAuthContext } from '../../context'
import { useUserProfile, useVaultAndOrg } from './index'


const useUserQuery = () => {

  const [{ isAuthenticated, tokenParsed }] = useAuthContext()
  const userProfile = useUserProfile({ userId: tokenParsed?.sub })
  const vaultOrg = useVaultAndOrg(
    {
      isEnabled: isAuthenticated && userProfile?.data,
      userProfile: userProfile?.data
    }
  )

  return {
    userProfile,
    vaultOrg,
  }
}

export default useUserQuery

import { useQuery } from 'react-query'
import { getAllVaults } from '../../api'
import { groupBy } from 'lodash'
import { USER_QUERY_TYPES } from './userQueryTypes'

const useVaultAndOrg = ({ isEnabled, userProfile }) => {
  return useQuery(
    [USER_QUERY_TYPES.USER, USER_QUERY_TYPES.ORG_VAULT],
    async () => {
      const { data: vaults, included: organizations } = await getAllVaults();
      const userCurrentVaultId = userProfile?.settings?.current_vault;
      const vault = vaults.find(item => item.id === userCurrentVaultId) || vaults[0];
      const orgId = vault?.relationships?.organization?.data?.id;
      const vaultsGroupedByOrgId = groupBy(vaults, (vault) => vault.relationships.organization.data.id);
      const organization = organizations.find(({ id }) => id === orgId);
      return ({
        organization,
        organizations,
        vault,
        vaults: vaultsGroupedByOrgId[orgId],
      })
    },
    {
      enabled: !!isEnabled,
    }
  )
}

export default useVaultAndOrg

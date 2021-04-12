import config from 'config';
import HttpService from '../services/HttpService';

export const getAllVaults = async () => {
  const url = `${config?.accountsAPI}/vaults`;
  return (await HttpService.getData(url))?.data;
}

export const getUserProfile = async (userId) => {
  const url = `${config?.userPersonalizationService}/profiles/${userId}`;
  return (await HttpService.getData(url))?.data?.data;
}

export const getRoutesByVault = async (vault) => {
  const url = `${vault.links.vault_management_api}/rule-chains`;
  const options = {
    headers: {
      'VGS-Tenant': vault.attributes.identifier,
    },
  };

  return (await HttpService.getData(url, options))?.data?.data;
}

export const getVault = async (vault) => {
  const tenantId = vault.attributes.identifier;
  const url = `${vault.links.vault_management_api}/vaults/${tenantId}`;
  const options = {
    headers: {
      'VGS-Tenant': vault.attributes.identifier,
    },
  };

  return (await HttpService.getData(url, options))?.data?.data;
};

export const checkVaultStatus = async (vault) => {
  const response = await getVault(vault);
  const isProvisioned = response.attributes.state === 'PROVISIONED'
  if (isProvisioned) {
    return {
      isProvisioned,
      vault: response,
    };
  }

  throw new Error('Vault is being provisioning...')
}

export const createVault = async (organizationId, name) => {
  const url = `${config?.accountsAPI}/vaults/`;
  const data = {
    data: {
      attributes: {
        name,
        environment: 'SANDBOX',
      },
      type: 'vaults',
      relationships: {
        organization: {
          data: {
            type: 'organizations',
            id: organizationId,
          },
        },
      },
    },
  };

  return (await HttpService.postData(url, data))?.data?.data;
}

export const createRoute = async (vault, route) => {
  const url = `${vault.links.vault_management_api}/rule-chains`;
  const options = {
    headers: {
      'VGS-Tenant': vault.attributes.identifier
    }
  }
  const data = {
    data: { ...route },
  }
  return (await HttpService.postData(url, data, options))?.data?.data;
}

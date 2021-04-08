import React, { useReducer, createContext, useEffect } from 'react'
import config from 'config';
import { isEmpty, groupBy } from 'lodash';
import {
  createReducer,
} from '../utils';
import { makeDispatchable, useCreateUseContext } from './utils'
import { getAllVaults, getRoutesByVault, getUserProfile } from '../api'
import { useAuthContext } from './AuthContext'

export const userActionsTypes = {
  SET_VAULTS_AND_ORG: 'SET_VAULTS_AND_ORG',
  SET_ROUTES: 'SET_ROUTES',
  SET_USER_PROFILE: 'SET_USER_PROFILE',
};

export const Actions = {
  setVaultAndOrg: async (dispatch) => {
    const { data: vaults, included: organizations } = await getAllVaults();
    dispatch({
      type: userActionsTypes.SET_VAULTS_AND_ORG,
      payload: { vaults, organizations },
    })
  },
  setUserProfile: async (dispatch, userId) => {
    const userProfile = await getUserProfile(userId);
    dispatch({
      type: userActionsTypes.SET_USER_PROFILE,
      payload: userProfile,
    })
  },
  setRoutes: async (dispatch, vault) => {
    const routes = await getRoutesByVault(vault);
    dispatch({
      type: userActionsTypes.SET_ROUTES,
      payload: routes,
    })
  }
}

const initialState = {
  organization: {},
  organizations: [],
  vault: {},
  vaults: [],
  vaultRoutes: {},
  userProfile: {},
};

export const UserStateContext = createContext(
  initialState
);
export const UserDispatchContext = createContext(() => {
  return;
});

const reducer = createReducer(
  { ...initialState, activeClient: config.keycloakConfig.clientId },
  {
    [userActionsTypes.SET_VAULTS_AND_ORG]: (s, { payload }) => {
      const { vaults, organizations } = payload;
      const userCurrentVaultId = s.userProfile?.settings?.current_vault;
      const vault = vaults.find(item => item.id === userCurrentVaultId) || payload.data[0];
      const orgId = vault?.relationships?.organization?.data?.id;
      const vaultsGroupedByOrgId = groupBy(vaults, (vault) => vault.relationships.organization.data.id);
      const organization = organizations.find(({ id }) => id === orgId);
      return ({
        ...s,
        organization,
        organizations,
        vault,
        vaults: vaultsGroupedByOrgId[orgId],
      })
    },
    [userActionsTypes.SET_USER_PROFILE]: (s, a) => {
      return ({
        ...s,
        userProfile: a.payload,
      })
    },
    [userActionsTypes.SET_ROUTES]: (s, a) => {
      return ({
        ...s,
        vaultRoutes: a.payload,
      })
    },
  }
);

const UserContextProvider = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState, (state) => state);
  const DispatchableActions = makeDispatchable(dispatch, Actions);
  const [{ isAuthenticated, tokenParsed }] = useAuthContext();

  useEffect(() => {
    (async () => {
      if (isAuthenticated && isEmpty(state.userProfile) && isEmpty(state.vault)) {
        const userId = tokenParsed.sub;
        await DispatchableActions.setUserProfile(userId);
        await DispatchableActions.setVaultAndOrg();
      }
    })()
  }, [isAuthenticated])

  useEffect(() => {
    const { vault } = state;
    if(!isEmpty(vault)) {
      DispatchableActions.setRoutes(vault);
    }
  }, [state.vault])

  return (
    <UserStateContext.Provider value={{ ...state }}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

export const useUserContext = () =>
  useCreateUseContext(UserStateContext, UserDispatchContext);

export default UserContextProvider;

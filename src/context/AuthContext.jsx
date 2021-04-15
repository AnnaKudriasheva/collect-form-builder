import React, { useReducer, createContext, useState, useEffect, memo } from 'react'
import config from 'config';
import {
  checkWindow,
  createReducer,
} from '../utils';
import { makeDispatchable, useCreateUseContext } from './utils'

export const authActionsTypes = {
  INIT_CLIENT: 'INIT_CLIENT',
  SET_TOKEN: 'SET_TOKEN',
  AUTHENTICATING: 'AUTHENTICATING',
};

export const Actions = {
  setIsAuthenticating: (dispatch, isAuthenticating) => dispatch({
    type: authActionsTypes.AUTHENTICATING,
    payload: isAuthenticating,
  }),
  initClient: (dispatch, { tokenParsed, activeClient, AuthInstance }) => dispatch({
    type: authActionsTypes.INIT_CLIENT,
    payload: { tokenParsed, activeClient, isAuthenticated: AuthInstance.authenticated }
  })
}

const initialState = {
  tokenParsed: null,
  isAuthenticated: false,
  activeClient: '',
  isAuthenticating: true,
};

export const AuthStateContext = createContext(
  initialState
);
export const AuthDispatchContext = createContext(() => {
  return;
});

const reducer = createReducer(
  { ...initialState, activeClient: config.keycloakConfig.clientId },
  {
    [authActionsTypes.INIT_CLIENT]: (s, a) => ({
        ...s,
        ...a.payload
      }),
    [authActionsTypes.SET_TOKEN]: (s, a) => ({
      ...s,
      tokenParsed: a.payload,
    }),
    [authActionsTypes.AUTHENTICATING]: (s, a) => ({
      ...s,
      isAuthenticating: a.payload,
    }),
  }
);

const authenticate = (AuthInstance, DispatchableActions) => {
  const tokenParsed = AuthInstance.tokenParsed;
  const activeClient = AuthInstance.clientId;
  DispatchableActions.initClient({ tokenParsed, activeClient, AuthInstance })
}

const AuthContextProvider = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState, (state) => state);
  const [Auth, setAuth] = useState(null);
  const DispatchableActions = makeDispatchable(dispatch, Actions);

  useEffect(() => {
    if (checkWindow()) {
      DispatchableActions.setIsAuthenticating(true)
      import('../services/AuthService')
        .then(AuthService => {
          const Authz = AuthService.default;
          Authz.init(() => {
            authenticate(Authz.instance, DispatchableActions)
          });

          setAuth(Authz);
        })
        .catch(error => console.error(error))
        .finally(() => DispatchableActions.setIsAuthenticating(false))
    }
  }, [state.isAuthenticated])

  const login = () => {
    if (Auth) {
      Auth.login()
        .then(() => {
          authenticate(Auth.instance, dispatch)
        })
    }
  }

  return (
    <AuthStateContext.Provider value={{ ...state, Auth, login }}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export const useAuthContext = () =>
  useCreateUseContext(AuthStateContext, AuthDispatchContext);

export default memo(AuthContextProvider);

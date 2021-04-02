import React, { useReducer, createContext, useState, useEffect } from 'react'
import config from 'config';
import {
  checkWindow,
  createReducer,
} from '../utils';
import { useCreateUseContext } from './utils';

export const authActionsTypes = {
  INIT_CLIENT: 'INIT_CLIENT',
  SET_TOKEN: 'SET_TOKEN',
  AUTHENTICATING: 'AUTHENTICATING',
};

export const Actions = {
  [authActionsTypes.AUTHENTICATING]: (isAuthenticating) => ({
    type: authActionsTypes.AUTHENTICATING,
    payload: isAuthenticating,
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

export let accessToken = '';

const AuthContextProvider = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState, (state) => state);
  const [Auth, setAuth] = useState(null);

  useEffect(() => {
    if (checkWindow()) {
      dispatch(Actions[authActionsTypes.AUTHENTICATING](true))
      import('../services/AuthService')
        .then(AuthService => {
          const _Auth = new AuthService.default(config.keycloakConfig, {redirectUri: window.location.origin})
          _Auth.init(() => {
            accessToken = _Auth.instance.token;
            const tokenParsed = _Auth.instance.tokenParsed;
            const activeClient = _Auth.instance.clientId;
            dispatch({
              type: authActionsTypes.INIT_CLIENT,
              payload: { tokenParsed, activeClient, isAuthenticated: _Auth.instance.authenticated }
            })
          });

          console.log(_Auth)
          setAuth(_Auth);
        })
        .catch(error => console.error(error))
        .finally(() => dispatch(Actions[authActionsTypes.AUTHENTICATING](false)))
    }
  }, [state.isAuthenticated])

  return (
    <AuthStateContext.Provider value={{ ...state, Auth }}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export const useAuthContext = () =>
  useCreateUseContext(AuthStateContext, AuthDispatchContext);

export default AuthContextProvider;

import React, { useReducer, createContext, useEffect } from 'react';
import { payment_form_config } from '../templates/payment_form_config_template';
export const FormContext = createContext();

const initialState = JSON.parse(localStorage.getItem("form_state")) || {
  form: payment_form_config,
  currentActiveField: {},
  mode: '',
  previewLoading: false,
  vault_id: '',
  environment: 'sandbox',
  isLoading: false,
  httpMethod: 'POST',
  endpoint: '/post',
  showDrawer: false,
  showTemplatesDrawer: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        form: state.form.map(field => field.id === action.payload.id ? action.payload : field)
      };
    case "CREATE_FIELD":
      return {
        ...state,
        form: [...state.form, { 
          ...action.payload,
          id: state.form.length.toString() 
        }]
      };
    case "UPDATE_FIELDS_ORDER":
      return {
        ...state,
        form: action.payload
      };
    case "REMOVE_FIELD":
      return {
        ...state,
        form: state.form.filter(item => item.id !== action.payload)
      };
    case "SET_MODE":
      return { ...state, mode: action.payload };
    case "PREVIEW_LOADING":
      return { ...state, previewLoading: action.payload };
    case "SET_ACTIVE_FIELD":
      return { ...state, currentActiveField: action.payload };
    case "SET_VAULT_ID":
      return { ...state, vault_id: action.payload };
    case "SET_ENV":
      return { ...state, environment: action.payload };
    case "SET_HTTP_METHOD":
      return { ...state, httpMethod: action.payload };
    case "SET_ENDPOINT":
      return { ...state, endpoint: action.payload };
    case "SET_DRAWER_STATE":
        return { ...state, showDrawer: action.payload };
    case "SET_TEMPLATES_DRAWER":
      return { ...state, showTemplatesDrawer: action.payload };
    case "SET_TEMPLATE":
      return { ...state, 
        form: action.payload
      };
    default:
      return state;
  }
};

export const FormContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('form_state', JSON.stringify(state));
  }, [state]);

  return (
    <FormContext.Provider value={[state, dispatch]}>
      {props.children}
    </FormContext.Provider>
  );
};

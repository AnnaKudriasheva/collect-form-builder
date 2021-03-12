import React, { useReducer, createContext } from 'react';
export const FormContext = createContext();

const initialState = {
  form: [
    {
      id: '0',
      label: 'Cardholder Name:',
      name: 'cardholder-name',
      type: 'text',
      placeholder: 'Cardholder name',
      validations: ['required'],
      autoComplete: "cc-name",
    },
    {
      id: '1',
      label: 'Card number:',
      name: 'card-number',
      type: 'card-number',
      placeholder: '0000 0000 0000 0000',
      validations: ['required', 'validCardNumber'],
      showCardIcon: 'true',
      autoComplete: "cc-number",
    },
    {
      id: '2',
      label: 'Expiration Date:',
      name: 'card-expiration-date',
      type: 'card-expiration-date',
      placeholder: 'MM / YY',
      validations: ['required', 'validCardExpirationDate'],
      autoComplete: "cc-exp",
    },
    {
      id: '3',
      label: 'Card Security Code:',
      name: 'card-security-code',
      type: 'card-security-code',
      placeholder: 'CVV',
      validations: ['required', 'validCardSecurityCode'],
      autoComplete: "cc-csc",
  }],
  currentActiveField: {},
  mode: '',
  previewLoading: false,
  vault_id: '',
  environment: 'sandbox',
  isLoading: false,
  httpMethod: 'POST',
  endpoint: '/',
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
    default:
      return state;
  }
};

export const FormContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <FormContext.Provider value={[state, dispatch]}>
      {props.children}
    </FormContext.Provider>
  );
};

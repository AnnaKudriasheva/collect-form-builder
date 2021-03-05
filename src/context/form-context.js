// @ts-nocheck
import React, { useReducer, createContext } from 'react';

export const FormContext = createContext();


const css = {
  fontSize: '16px',
  '&:placeholder': {
    color: 'C8D0DB',
  }
};

const initialState = {
  form: [
    {
      id: '0',
      name: 'Cardholder name',
      type: 'text',
      placeholder: 'Cardholder name',
      validations: ['required'],
      css,
    },
    {
      id: '1',
      name: 'Card number',
      type: 'card-number',
      placeholder: '0000 0000 0000 0000',
      validations: ['required', 'validCardNumber'],
      css,
    },
    {
      id: '2',
      name: 'Card expiration date',
      type: 'card-expiration-date',
      placeholder: 'MM / YY',
      validations: ['required', 'validCardExpirationDate'],
      css,
    },
    {
      id: '3',
      name: 'Card security code',
      type: 'card-security-code',
      placeholder: 'CVV',
      validations: ['required', 'validCardSecurityCode'],
      css,
  }],
  currentActiveField: {},
  mode: '',
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
    case "SET_ACTIVE_FIELD":
      return { ...state, currentActiveField: action.payload };
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

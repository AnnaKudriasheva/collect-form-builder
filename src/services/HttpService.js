import axios from 'axios'
import { get } from 'lodash'
import { sendErrorToRollbar } from '../utils/rollbar'
import { message } from 'antd';
import { checkWindow, isJSON } from '../utils'

const FETCH_FAILED_ERROR_TEXT = 'Failed to fetch request';

const _VGSClient = axios.create({
  headers: {
    'Content-Type': 'application/vnd.api+json',
    Accept: 'application/vnd.api+json',
    Authorization: 'Bearer [TOKEN]',
  }
})

_VGSClient.interceptors.request.use(async (config) => {
  const { headers } = config;
  if (headers.Authorization === 'Bearer [TOKEN]') {
    if (checkWindow()) {
      await import('../services/AuthService')
        .then(async AuthService => {
          const Authz = AuthService.default;
          await Authz.updateToken();
          if (Authz.accessToken) {
            headers.Authorization = `Bearer ${Authz.accessToken}`;
          }
        })
        .catch(error => console.error(error))
    }
  }
  return config;
})

_VGSClient.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response) {
    let errorMessage;

    const errorResponse = get(error, 'response.data.errors[0]') || get(error, 'message');

    if (errorResponse && errorResponse.code || (errorResponse.status && errorResponse.title && errorResponse.detail)) {
      if (isJSON(errorResponse.detail)) {
        errorMessage = JSON.parse(errorResponse.detail);
      }
      errorMessage = errorResponse.detail
    } else if (get(error, 'response.data.message')) {
      errorMessage = error.response.data.message;
    } else {
      errorMessage = FETCH_FAILED_ERROR_TEXT;
    }

    message.error(errorMessage)
  }
  sendErrorToRollbar(error);
  return Promise.reject(error);
});

const getData = (url, options = {}) => _VGSClient.request({ url, method: 'GET', headers: options.headers });
const postData = (url, data, options = {}) => _VGSClient.request({ data, url, method: 'POST', headers: options.headers });

const HttpService = {
  getData,
  postData,
}

export default HttpService;

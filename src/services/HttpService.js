import axios from 'axios'
import { fetchJSONApi } from '../api/utils'
import { accessToken } from '../context/AuthContext'

const _VGSClient = axios.create({
  headers: {
    'Content-Type': 'application/vnd.api+json',
    Accept: 'application/vnd.api+json',
    Authorization: 'Bearer [TOKEN]',
  }
})

_VGSClient.interceptors.request.use(({ headers }) => {
  if (
    headers.Authorization === 'Bearer [TOKEN]' &&
    accessToken
  ) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
})

_VGSClient.interceptors.response.use((response) => {
  return response;
}, (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

const getData = (url, options = {}) => fetchJSONApi(url, { method: 'GET', headers: options.headers }, options.handlers);
const postData = (url, data, options = {}) => fetchJSONApi(url, { data: { data }, method: 'POST', headers: options.headers }, options.handlers);

const getVGSClient = () => _VGSClient
const HttpService = {
  getVGSClient,
  getData,
  postData,
}

export default HttpService;

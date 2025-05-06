import axios from 'axios';
import {getBaseUrl, getToken, getUserInfo} from '../storage';

const request = axios.create({
  baseURL: '',
});

request.interceptors.request.use(
  async config => {
    const baseURL = await getBaseUrl();
    config.baseURL = baseURL;
    console.log(config);

    if (
      config.url != '/auth/login'
      // &&
      // config.url != '/api/keepalive/keepalive'
    ) {
      const token = await getToken();
      const {id} = await getUserInfo();
      console.log(token);
      if (token) {
        config.headers['x-nd-authorization'] = `Bearer ${token}`;
        config.headers['x-nd-client-unique-id'] = id;
      }
    }

    return config;
  },
  error => {
    console.log('req error:', error);

    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (error.response.status === 401) {
      // 用refreshToken获取新token
      // const newToken = await refreshToken();
      //[host]/api/keepalive/keepalive
      const url = '/api/keepalive/keepalive';
      const res = await request.get(url);
    }
    console.log('res error:', error);
    return Promise.reject(error);
  },
);

export default request;

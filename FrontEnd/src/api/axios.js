import axios from 'axios';
import { API_CONFIG } from './config';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

// 요청 인터셉터 - 토큰 자동 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('config?.headers?.Authorization = ', config?.headers?.Authorization);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 만료 인터셉터 - 토큰 만료시 서버에서 만료 응답 오면 자동 제거
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      //서버가 응답을 함
      const { status, data } = error.response;
      switch (status) {
        case 401:
          //인증에러
          window.location.href = '/login';
          break;
        case 403:
          console.error(data?.message || '접근권한이 없습니다.');
          break;
        case 404:
          console.error(data?.message || '요청한 리소스를 찾을 수 없습니다.');
          break;
        case 500:
          console.error(data?.message || '서버 에러 발생');
          break;
        default:
          console.error(data?.message || 'API 에러 :', data);
      }
    } else if (error.request) {
      //요청은 했지만 응답을 받지 못함
      console.error('네트워크 에러 : ', error.request);
    } else {
      console.error('에러 :', error.message);
    }

    return Promise.reject(error);
  }
);

export default api;

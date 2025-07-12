import api, { fileApi } from './axios';
import { API_CONFIG, API_ENDPOINTS, IMG_CONFIG } from './config';

export const worcationService = {
  list: async () => {
    const response = await api.get(API_ENDPOINTS.WORCATION.LIST);
    return response.data;
  },
  getMyWorcationList: async (user_no) => {
    const response = await api.get(API_ENDPOINTS.WORCATION.LISTALL(user_no));
    return response.data;
  },

  getDetail: async (worcation_no) => {
    const response = await api.get(API_ENDPOINTS.WORCATION.DETAIL(worcation_no));
    return response.data;
  },
  addReview: async (review) => {
    const response = await api.post(API_ENDPOINTS.REVIEW.ADD, review);
    return response.data;
  },
  save: async (data) => {
    const response = await api.post(API_ENDPOINTS.WORCATION.SAVE, data);
    return response.data;
  },
  saveTmpWorcation: async (payload) => {
    const response = await api.post(API_ENDPOINTS.WORCATION.SAVETMP, payload);
    return response.data;
  },

  update: async (worcation_no, data) => {
    const response = await api.patch(API_ENDPOINTS.WORCATION.UPDATE(worcation_no), data);
    return response.data;
  },
  delete: async (worcation_no) => {
    const response = await api.delete(API_ENDPOINTS.WORCATION.DELETE(worcation_no));
    return response.data;
  },

  updateReview: async (review_no, reviewData) => {
    const response = await api.patch(API_ENDPOINTS.REVIEW.UPDATE(review_no), reviewData, {
      headers: { ...API_CONFIG.HEADERS },
    });
    return response.data;
  },
  deleteReview: async (review_no) => {
    const response = await api.delete(API_ENDPOINTS.REVIEW.DELETE(review_no));
    return response.data;
  },
  applicationList: async () => {
    const response = await api.get(API_ENDPOINTS.APPLICATION.LIST);
    return response.data;
  },
  validate: async (b_no) => {
    const response = await api.post(API_ENDPOINTS.WORCATION.VALIDATE(), { b_no });
    return response.data;
  },

  WorcationName: async (user_no) => {
    const response = await api.get(API_ENDPOINTS.WORCATION.WORCATIONNAME(user_no));
    return response.data;
  },

  WorcationReservation: async (user_no) => {
    const response = await api.get(API_ENDPOINTS.WORCATION.WORCATIONRESERVATION(user_no));
    return response.data;
  },
  getMyList: async (user_no) => {
    const response = await api.get(API_ENDPOINTS.WORCATION.GETMYLIST(user_no));
    return response.data;
  },
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    // fileApi 사용 (일관성 유지)
    const response = await fileApi.post('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.imageUrl; // 서버에서 반환한 imageUrl 필드
  },
};

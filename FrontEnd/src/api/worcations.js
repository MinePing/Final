import api from './axios';
import { API_BUSINESS, API_ENDPOINTS } from './config';

export const worcationService = {
  list : async() =>{
    const response = await api.get(API_ENDPOINTS.WORCATION.LIST);
    return response.data;
  },

  getDetail : async(worcation_no) =>{
    const response = await api.get(API_ENDPOINTS.WORCATION.DETAIL(worcation_no));
    return response.data;
  },

};

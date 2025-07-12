import api from './axios';
const { VITE_API_BUSSINESS_BASE_URL, VITE_API_BUSINESS_ENDPOINTS, VITE_API_BUSSINESS_KEY } = import.meta.env;

export async function businessApi({ business_id, licensee, open_date }) {
  const url = `${VITE_API_BUSSINESS_BASE_URL}${VITE_API_BUSINESS_ENDPOINTS}${VITE_API_BUSSINESS_KEY}`;

  // open_date가 문자열이면 Date 객체로 변환
  const dateObj = open_date instanceof Date ? open_date : new Date(open_date);
  const yyyy = dateObj.getFullYear();
  const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
  const dd = String(dateObj.getDate()).padStart(2, '0');
  const start_dt = `${yyyy}${mm}${dd}`;

  const data = {
    businesses: [
      {
        b_no: business_id,
        start_dt,
        p_nm: licensee,
      },
    ],
  };

  const response = await api.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  return response.data;
}

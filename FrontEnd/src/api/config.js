const { VITE_API_URL, VITE_API_TIMEOUT = 5000, VITE_API_VERSION = 'v1', VITE_API_BUSINESS } = import.meta.env;

export const API_CONFIG = {
  BASE_URL: `${VITE_API_URL}/${VITE_API_VERSION}`, //localhost:8080/api/v1
  // BASE_URL: `${VITE_API_URL}`,
  TIMEOUT: VITE_API_TIMEOUT,
  HEADERS: {
    'Content-Type': 'application/json', //내가 서버로 보내는 데이터는 json이야
    Accept: 'application/json', //json으로 응답해줘.
  },
};

export const API_BUSINESS = {
  BUSINESS_VALIDATE: `${VITE_API_BUSINESS}`,
  TIMEOUT: VITE_API_TIMEOUT,
  HEADERS: {
    'Content-Type': 'application/json', //내가 서버로 보내는 데이터는 json이야
    Accept: 'application/json', //json으로 응답해줘.
  },
};

export const API_ENDPOINTS = {
  MEMBER: {
    SIGNUP: (role) => `/member/signUp/${role}`,
    MY_INFO: '/member/userInfo',
  },
  COMPANY: {
    SEARCH: (company_name) => `/company/search?company_name=${company_name}`,
    DEPARTMENT_SEARCH: (company_no) => `/company/search/department/${company_no}`,
  },
  COMPANY_PROFILE: '/companyProfiles',
  WORCATION: {
    LIST: '/worcations',
    DETAIL: (worcation_no) => `/worcations/${worcation_no}`,
  },
  LOGIN: '/member/login',
  MENTALS: {
    STRESS: '/mental_stress',
    BURNOUT: '/mental_burnout',
    //스프링 구현하면 지울 내용//
    BASE: (mental_no) => `/mental?mental_no=${mental_no}`,
    //스프링 구현하면 지울 내용//
  },
  // 스프링 구현하면 지울 내용//
  MEMBER_PREFERENCE: '/member_preference',
  // 스프링 구현하면 지울 내용//
  // 스프링 구현하면 쓰일 내용//
  // MEMBER_PREFERENCE: (uesr_no) => `/member_preference/${uesr_no}`,
  // 스프링 구현하면 쓰일 내용//

  MEMBER_PREFERENCE_GET: (preference_no) => `/member_preference?preference_no=${preference_no}`,
};

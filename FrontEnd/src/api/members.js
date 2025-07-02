import axiosInstance from './axios';
import { API_ENDPOINTS } from './config';

//로그인
const memberService = {
  login: async ({ userId, userPwd }) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.LOGIN, {
        user_id: userId,
        user_pwd: userPwd,
      });

      if (!response?.data?.token) {
        throw new Error('로그인에 실패했습니다.');
      }

      return response.data;
    } catch (error) {
      throw error?.response?.data?.message;
    }
  },

  //회원가입
  register: async (formData1, formData2) => {
    const { userPwdCheck: _, ...sendData1 } = formData1;
    const sendData2 = { ...formData2 };
    const role = formData1.role;

    // MemberDto 객체 구성
    const memberJoinDto = {
      user_id: sendData1.user_id,
      user_pwd: sendData1.user_pwd,
      name: sendData1.name,
      gender: sendData1.gender,
      role: sendData1.role,
      address: sendData1.address,
      birthday: sendData1.birthday,
      email: sendData1.email,
      phone: sendData1.phone,
    };

    // role에 따라 다른 객체 구성
    let payload;
    if (role === 'EMPLOYEE') {
      const companyProfileJoinDto = {
        company_no: sendData2.company_no,
        department_name: sendData2.department_name,
        position: sendData2.position_name,
        company_email: sendData2.company_email,
        company_phone: sendData2.company_phone,
      };

      payload = {
        memberJoinDto: memberJoinDto,
        companyProfileJoinDto: companyProfileJoinDto,
      };
    } else if (role === 'MASTER') {
      const companyJoinDto = {
        company_name: sendData2.company_name,
        company_address: sendData2.company_address,
        business_id: sendData2.business_id,
        business_email: sendData2.business_email,
        licensee: sendData2.licensee,
        department_name: sendData2.department_name,
        company_tel: sendData2.company_tel,
        open_date: sendData2.open_date,
      };

      payload = {
        memberJoinDto: memberJoinDto,
        companyJoinDto: companyJoinDto,
      };
    } else if (role === 'WORCATION') {
      payload = {
        memberJoinDto: memberJoinDto,
      };
    }
    console.log('payload', payload);

    const { data: result } = await axiosInstance.post(API_ENDPOINTS.MEMBER.SIGNUP(role), payload);
    return result;
  },

  // 회사명 검색
  searchCompany: async (company_name) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.COMPANY.SEARCH(company_name));
    return data;
  },

  searchDepartment: async (company_no) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.COMPANY.DEPARTMENT_SEARCH(company_no));
    return data;
  },

  // 내 정보 조회 (JWT 토큰 사용)
  getMyInfo: async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.MEMBER.MY_INFO);
      return response.data;
    } catch (error) {
      throw error?.response?.data?.message;
    }
  },
};
export default memberService;

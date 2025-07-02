import { create } from 'zustand';
import memberService from '../api/members';

const useAuthStore = create((set) => ({
  loginUser: null,
  setLoginUser: (user) => set({ loginUser: user }),
  logout: () => {
    localStorage.removeItem('token');
    set({ loginUser: null });
  },
  fetchUserInfo: async () => {
    try {
      const { loginUser, setLoginUser } = useAuthStore.getState();
      if (!loginUser) {
        const user = await memberService.getMyInfo();
        console.log('loginUser =', user);
        setLoginUser(user);
      }
    } catch (error) {
      alert('사용자 정보 조회 실패:', error);
    }
  },
}));
export default useAuthStore;

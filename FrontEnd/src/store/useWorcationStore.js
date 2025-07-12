// store/useWorcationStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = {
  // 1. 신청 정보
  application: {
    companyNo: '',
    businessName: '',
    ownerName: '',
    tel: '',
    worcation_name: '',
    companyType: '',
    business_id: '',
    licensee: '',
    open_date: '',
  },
  // 2. 기본 정보
  info: {
    category: '',
    intro: '',
    theme: '',
    maxPeople: '',
    tel: '',
    price: '',
    policy: '',
  },
  // 3. 설명/소개
  description: {
    detailIntro: '',
  },
  // 4. 사진
  photos: {
    officePhotos: [],
    stayPhotos: [],
  },
  // 5. 편의시설
  amenities: [],
  // 6. 위치
  location: {
    address: '',
    locationDescription: '',
    navigate: '',
  },
  // 7. 정책
  policy: {
    refundPolicy: '',
    notice: '',
    checkinPeriod: 'AM',
    checkinHour: '9',
    checkinMinute: '00',
    checkoutPeriod: 'AM',
    checkoutHour: '11',
    checkoutMinute: '00',
    officeStartPeriod: 'AM',
    officeStartHour: '9',
    officeStartMinute: '00',
    officeEndPeriod: 'PM',
    officeEndHour: '6',
    officeEndMinute: '00',
    policyGuide: '',
  },
  // 8. 특징
  feature: {
    locationType: '',
    dominantColor: '',
    spaceMood: '',
    bestFor: '',
    activities: [],
    accommodationType: '',
  },
};

const useWorcationStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      // 각 섹션별 setter
      setApplication: (data) => set({ application: { ...get().application, ...data } }),
      setInfo: (data) => {
        const newInfo = typeof data === 'function' ? data(get().info) : { ...get().info, ...data };
        set({ info: newInfo });
      },
      setDescription: (data) => set({ description: { ...get().description, ...data } }),
      setPhotos: (data) => set({ photos: { ...get().photos, ...data } }),
      setAmenities: (data) => set({ amenities: data }),
      setLocation: (data) => set({ location: { ...get().location, ...data } }),
      setPolicy: (data) => set({ policy: { ...get().policy, ...data } }),
      setFeature: (data) => set({ feature: { ...get().feature, ...data } }),

      // 전체 초기화
      resetAll: () => set(initialState),

      // 데이터 한 번에 설정 (수정 시 사용)
      setAllData: (data) =>
        set((state) => ({
          ...state,
          ...data,
        })),

      // 유효성 검사 예시
      isNonNull: () => {
        const { application, info, location } = get();
        return !!application.companyNo && !!info.worcationName && !!info.category && !!location.address;
      },
      isValidate: () => {
        const { info } = get();
        return info.worcationName.length >= 2; // 예시
      },

      // 모든 데이터 한 번에 반환
      getAll: () => {
        const state = get();
        return {
          application: state.application,
          info: state.info,
          description: state.description,
          photos: state.photos,
          amenities: state.amenities,
          location: state.location,
          policy: state.policy,
          feature: state.feature,
        };
      },
    }),
    {
      name: 'worcation-store',
      version: 1,
      partialize: (state) => state, // 모든 상태를 저장
      skipHydration: false,
    }
  )
);

export default useWorcationStore;

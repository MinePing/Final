import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Menu from '../../../components/worcation/Register/Menu.jsx';
import ApplicationForm from '../../../components/worcation/Register/Form/ApplicationForm.jsx';
import InfoForm from '../../../components/worcation/Register/Form/InfoForm.jsx';
import DescriptionForm from '../../../components/worcation/Register/Form/DescriptionForm.jsx';
import PhotoForm from '../../../components/worcation/Register/Form/PhotoForm.jsx';
import AmenitiesForm from '../../../components/worcation/Register/Form/AmenitiesForm.jsx';
import LocationForm from '../../../components/worcation/Register/Form/LocationForm.jsx';
import PolicyForm from '../../../components/worcation/Register/Form/PolicyForm.jsx';
import FeatureForm from '../../../components/worcation/Register/Form/FeatureForm.jsx';
import { BtnWhiteYellowBorder } from '../../../styles/Button.styles.js';
import Swal from 'sweetalert2';
import SwalStyles from '../../../styles/SwalStyles.js';
import useWorcationStore from '../../../store/useWorcationStore.js';
import { worcationService } from '../../../api/worcations.js';
import useAuthStore from '../../../store/authStore.js';
import { useLocation, useParams } from 'react-router-dom';

const Register = () => {
  const location = useLocation();
  const { worcation_no } = useParams();
  const worcation = location.state?.worcation;

  const [selectedMenu, setSelectedMenu] = useState('Application');
  const [isLoading, setIsLoading] = useState(false);
  const applicationFormRef = useRef();
  const descriptionFormRef = useRef();
  const photoFormRef = useRef();
  const amenitiesFormRef = useRef();
  const locationFormRef = useRef();
  const policyFormRef = useRef();
  const featureFormRef = useRef();
  const getAll = useWorcationStore((state) => state.getAll);
  const setAllData = useWorcationStore((state) => state.setAllData);
  const loginUser = useAuthStore((state) => state.loginUser);

  useEffect(() => {
    const initializeStore = async () => {
      setIsLoading(true);
      try {
        if (worcation) {
          // store에 기존 데이터 설정
          setAllData({
            application: {
              worcation_name: worcation.worcation_name || '',
              business_id: worcation.business_id || '',
              licensee: worcation.licensee || '',
              open_date: worcation.open_date || null,
              companyType: worcation.worcation_category || 'Office',
              partner_price: worcation.partner_price || '',
              charge_amount: worcation.charge_amount || '',
              status: worcation.status || 'N',
            },
            info: {
              theme: worcation.worcation_thema || '',
              maxPeople: worcation.max_people || '',
              price: worcation.non_partner_price || '',
              tel: worcation.worcation_tel || '',
            },
            description: {
              detailIntro: worcation.content || '',
            },
            location: {
              address: worcation.worcation_address || '',
              navigate: worcation.navigate || '',
            },
            policy: {
              availableTime: worcation.available_time || '',
              refundPolicy: worcation.refund_policy || '',
            },
            feature: {
              locationType: worcation.location_type || '',
              dominantColor: worcation.dominant_color || '',
              spaceMood: worcation.space_mood || '',
              bestFor: worcation.best_for || '',
              activities: worcation.activities ? worcation.activities.split(',') : [],
              accommodationType: worcation.accommodation_type || '',
            },
          });
        } else if (worcation_no) {
          const data = await worcationService.getDetail(worcation_no);
          setAllData({
            application: {
              worcation_name: data.worcation_name || '',
              business_id: data.business_id || '',
              licensee: data.licensee || '',
              open_date: data.open_date || null,
              companyType: data.worcation_category || 'Office',
              partner_price: data.partner_price || '',
              charge_amount: data.charge_amount || '',
              status: data.status || 'N',
            },
            info: {
              theme: data.worcation_thema || '',
              maxPeople: data.max_people || '',
              price: data.non_partner_price || '',
              tel: data.worcation_tel || '',
            },
            description: {
              detailIntro: data.content || '',
            },
            location: {
              address: data.worcation_address || '',
              navigate: data.navigate || '',
            },
            policy: {
              availableTime: data.available_time || '',
              refundPolicy: data.refund_policy || '',
            },
            feature: {
              locationType: data.location_type || '',
              dominantColor: data.dominant_color || '',
              spaceMood: data.space_mood || '',
              bestFor: data.best_for || '',
              activities: data.activities ? data.activities.split(',') : [],
              accommodationType: data.accommodation_type || '',
            },
          });
        }
      } catch (error) {
        console.error('워케이션 데이터 로드 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeStore();
  }, [worcation, worcation_no]); // 의존성 추가하여 데이터 변경 시 재실행

  const renderForm = () => {
    switch (selectedMenu) {
      case 'Application':
        return <ApplicationForm ref={applicationFormRef} />;
      case 'Info':
        return <InfoForm />;
      case 'Description':
        return <DescriptionForm ref={descriptionFormRef} />;
      case 'Photo':
        return <PhotoForm ref={photoFormRef} />;
      case 'Amenities':
        return <AmenitiesForm ref={amenitiesFormRef} />;
      case 'Location':
        return <LocationForm ref={locationFormRef} />;
      case 'Policy':
        return <PolicyForm ref={policyFormRef} />;
      case 'Feature':
        return <FeatureForm ref={featureFormRef} />;
      default:
        return <ApplicationForm ref={applicationFormRef} />;
    }
  };

  function removeEmpty(obj) {
    return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== '' && v !== null && v !== undefined));
  }

  function makePayload(allValues, loginUser) {
    return removeEmpty({
      worcation_name: allValues.application.worcation_name,
      worcation_category: allValues.application.companyType,
      main_change_photo: allValues.photos.mainPhoto,
      worcation_thema: allValues.info.theme,
      max_people: allValues.info.maxPeople,
      partner_price: allValues.application.partnerPrice,
      non_partner_price: allValues.info.price,
      worcation_address: allValues.location.address,
      member_id: loginUser?.user_no,
      area_id: allValues.location.areaId,
      status: allValues.application.status,

      // Detail
      licensee: allValues.application.licensee,
      business_id: allValues.application.business_id,
      worcation_tel: allValues.info.tel,
      charge_amount: allValues.application.chargeAmount,
      content: allValues.description.detailIntro,
      navigate: allValues.location.navigate,
      available_time: allValues.policy.availableTime,
      refund_policy: allValues.policy.refundPolicy,
      open_date: allValues.application.open_date
        ? new Date(allValues.application.open_date).toISOString().slice(0, 10)
        : undefined,

      // Features
      location_type: allValues.feature.locationType,
      dominant_color: allValues.feature.dominantColor,
      space_mood: allValues.feature.spaceMood,
      best_for: allValues.feature.bestFor,
      activities: Array.isArray(allValues.feature.activities)
        ? allValues.feature.activities.join(',')
        : allValues.feature.activities,
      accommodation_type: allValues.feature.accommodationType,

      // List
      amenities: allValues.amenities,
      photo_urls: allValues.photos.officePhotos,
    });
  }

  // 파일 업로드 처리 함수
  async function uploadPhotos(photos) {
    const uploadedUrls = [];

    for (const photo of photos) {
      if (photo && photo.file && !photo.uploaded) {
        try {
          const imageUrl = await worcationService.uploadImage(photo.file);
          uploadedUrls.push(imageUrl);
        } catch (error) {
          console.error('파일 업로드 실패:', error);
          throw new Error('파일 업로드에 실패했습니다.');
        }
      } else if (photo && photo.uploaded) {
        // 이미 업로드된 파일은 URL 그대로 사용
        uploadedUrls.push(photo.url || photo);
      }
    }

    return uploadedUrls;
  }

  async function showConfirmSwal(title) {
    return await Swal.fire({
      title,
      showCancelButton: true,
      confirmButtonText: '저장',
      cancelButtonText: '취소',
    });
  }

  const handleSave = async () => {
    const allValues = getAll();
    if (!allValues.application.business_id || !allValues.application.licensee) {
      alert('사업자번호와 상호명을 입력해주세요.');
      return;
    }

    try {
      // 임시저장 시에는 사진 정보를 빈 배열로 전달 (File 객체는 서버에서 처리 불가)
      const payload = makePayload(
        {
          ...allValues,
          photos: {
            mainPhoto: '',
            officePhotos: [],
            stayPhotos: [],
          },
        },
        loginUser
      );

      const tmp = await showConfirmSwal('임시 저장하시겠습니까?');
      if (tmp.isConfirmed) {
        await worcationService.saveTmpWorcation(payload);
        Swal.fire('임시 저장되었습니다.', '', 'success');
      }
    } catch (error) {
      Swal.fire('저장에 실패하였습니다.', error.message, 'error');
    }
  };

  const handleSubmit = async () => {
    if (!applicationFormRef.current?.isValid) {
      alert('사업자 정보(기본 정보)를 올바르게 입력해주세요.');
      return;
    }

    try {
      // 자동 진위확인 수행
      const isBusinessValid = await applicationFormRef.current.autoCheckBusiness();
      if (!isBusinessValid) {
        Swal.fire('사업자 정보 확인 실패', '사업자 정보를 다시 확인해주세요.', 'error');
        return;
      }

      const allValues = getAll();

      // 최종 등록 시에만 사진 업로드 처리
      const officePhotoUrls = await uploadPhotos(allValues.photos.officePhotos || []);
      const stayPhotoUrls = await uploadPhotos(allValues.photos.stayPhotos || []);

      const payload = makePayload(
        {
          ...allValues,
          photos: {
            ...allValues.photos,
            officePhotos: officePhotoUrls,
            stayPhotos: stayPhotoUrls,
          },
        },
        loginUser
      );

      // 수정 모드인지 확인 (미등록 목록에서는 등록 모드로 처리)
      const isEditMode =
        (worcation || worcation_no) && (worcation?.status === 'Y' || allValues.application.status === 'Y');
      const confirmMessage = isEditMode ? '수정하시겠습니까?' : '등록하시겠습니까?';
      const successMessage = isEditMode ? '수정되었습니다.' : '등록되었습니다.';

      const res = await showConfirmSwal(confirmMessage);
      if (res.isConfirmed) {
        if (isEditMode) {
          // 수정 모드: PATCH API 호출
          const targetWorcationNo = worcation?.worcation_no || worcation_no;
          await worcationService.update(targetWorcationNo, payload);
        } else {
          // 새로 등록 모드: POST API 호출
          await worcationService.save(payload);
        }
        Swal.fire(successMessage, '', 'success');
      }
    } catch (error) {
      Swal.fire('처리에 실패하였습니다.', error.message, 'error');
    }
  };

  return (
    <RegisterContainer>
      <SwalStyles />
      {isLoading ? (
        <div>데이터를 불러오는 중...</div>
      ) : (
        <RegisterForm>
          <MenuBar>
            <Menu onMenuSelect={setSelectedMenu} selectedMenu={selectedMenu} />
            <ContentContainer>
              <BtnGroup>
                <ActionButton type="button">미리 보기</ActionButton>
              </BtnGroup>
              <RenderForm>{renderForm()}</RenderForm>
            </ContentContainer>
          </MenuBar>
          <BtnGroup>
            <ActionButton type="button" onClick={handleSave}>
              임시 저장
            </ActionButton>
            <ActionButton type="button" onClick={handleSubmit}>
              등록
            </ActionButton>
          </BtnGroup>
        </RegisterForm>
      )}
    </RegisterContainer>
  );
};

export default Register;

const ActionButton = styled(BtnWhiteYellowBorder)`
  max-height: 20px;
`;
const BtnGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  min-height: 50px;
  gap: 10px;
`;
const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 1280px;
  min-height: 500px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 10px;
`;

const RegisterContainer = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const MenuBar = styled.div`
  display: flex;
  gap: 20px;
`;
const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-end;
  flex-direction: column;
`;
const RenderForm = styled.div`
  background-color: #fff;
  display: flex;
  min-width: 1000px;
  border: 2px solid ${({ theme }) => theme.colors.gray[200]};
`;

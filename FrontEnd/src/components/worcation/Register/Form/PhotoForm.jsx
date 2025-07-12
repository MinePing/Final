import React, { forwardRef, useImperativeHandle, useEffect, useState } from 'react';
import styled from 'styled-components';
import AddButton from '../../../common/AddButton';
import ImageUploader from '../../../common/ImageUploader';
import useWorcationStore from '../../../../store/useWorcationStore';

const PhotoForm = forwardRef((props, ref) => {
  const photos = useWorcationStore((state) => state.photos);
  const setPhotos = useWorcationStore((state) => state.setPhotos);

  // 컴포넌트 내부에서만 사용할 preview URL들을 관리
  const [previewUrls, setPreviewUrls] = useState({
    office: {},
    stay: {},
  });

  useImperativeHandle(ref, () => ({})); // 필요시 getValues 등 추가 가능

  // store의 값을 그대로 사용 (초기화 제거)
  const officePhotos = photos?.officePhotos || [];
  const stayPhotos = photos?.stayPhotos || [];

  // 컴포넌트 마운트 시 File 객체로부터 preview URL 생성
  useEffect(() => {
    const generatePreviewUrls = () => {
      const newPreviewUrls = { office: {}, stay: {} };

      // 오피스 사진 preview URL 생성
      officePhotos.forEach((photo, index) => {
        if (photo?.file && !previewUrls.office[index]) {
          newPreviewUrls.office[index] = URL.createObjectURL(photo.file);
        }
      });

      // 숙소 사진 preview URL 생성
      stayPhotos.forEach((photo, index) => {
        if (photo?.file && !previewUrls.stay[index]) {
          newPreviewUrls.stay[index] = URL.createObjectURL(photo.file);
        }
      });

      setPreviewUrls((prev) => ({
        office: { ...prev.office, ...newPreviewUrls.office },
        stay: { ...prev.stay, ...newPreviewUrls.stay },
      }));
    };

    generatePreviewUrls();
  }, [officePhotos, stayPhotos]);

  // 컴포넌트 언마운트 시 모든 blob URL 정리
  useEffect(() => {
    return () => {
      Object.values(previewUrls.office).forEach((url) => {
        if (url && url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
      Object.values(previewUrls.stay).forEach((url) => {
        if (url && url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, []);

  const handleAddOfficePhoto = () => {
    if (officePhotos.length >= 4) return;
    setPhotos({
      ...photos,
      officePhotos: [...officePhotos, null],
    });
  };

  const handleAddStayPhoto = () => {
    if (stayPhotos.length >= 4) return;
    setPhotos({
      ...photos,
      stayPhotos: [...stayPhotos, null],
    });
  };

  const handleOfficeChange = async (file, index) => {
    try {
      // 기존 preview URL 정리
      if (previewUrls.office[index]) {
        URL.revokeObjectURL(previewUrls.office[index]);
      }

      // 새로운 preview URL 생성
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrls((prev) => ({
        ...prev,
        office: { ...prev.office, [index]: newPreviewUrl },
      }));

      // File 객체만 스토어에 저장 (previewUrl 제외)
      const newList = [...officePhotos];
      newList[index] = {
        file: file,
        uploaded: false,
      };
      setPhotos({
        ...photos,
        officePhotos: newList,
      });
    } catch (error) {
      console.error('오피스 이미지 처리 실패:', error);
      alert('오피스 이미지 처리 실패');
    }
  };

  const handleStayChange = async (file, index) => {
    try {
      // 기존 preview URL 정리
      if (previewUrls.stay[index]) {
        URL.revokeObjectURL(previewUrls.stay[index]);
      }

      // 새로운 preview URL 생성
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrls((prev) => ({
        ...prev,
        stay: { ...prev.stay, [index]: newPreviewUrl },
      }));

      // File 객체만 스토어에 저장 (previewUrl 제외)
      const newList = [...stayPhotos];
      newList[index] = {
        file: file,
        uploaded: false,
      };
      setPhotos({
        ...photos,
        stayPhotos: newList,
      });
    } catch (error) {
      console.error('숙소 이미지 처리 실패:', error);
      alert('숙소 이미지 처리 실패');
    }
  };

  const handleOfficeDelete = (index) => {
    // preview URL 정리
    if (previewUrls.office[index]) {
      URL.revokeObjectURL(previewUrls.office[index]);
    }

    // preview URL 상태에서 제거
    setPreviewUrls((prev) => {
      const newOffice = { ...prev.office };
      delete newOffice[index];
      return { ...prev, office: newOffice };
    });

    const newList = [...officePhotos];
    newList.splice(index, 1);
    setPhotos({
      ...photos,
      officePhotos: newList,
    });
  };

  const handleStayDelete = (index) => {
    // preview URL 정리
    if (previewUrls.stay[index]) {
      URL.revokeObjectURL(previewUrls.stay[index]);
    }

    // preview URL 상태에서 제거
    setPreviewUrls((prev) => {
      const newStay = { ...prev.stay };
      delete newStay[index];
      return { ...prev, stay: newStay };
    });

    const newList = [...stayPhotos];
    newList.splice(index, 1);
    setPhotos({
      ...photos,
      stayPhotos: newList,
    });
  };

  return (
    <Body>
      <Title>사진을 추가해주세요.(각 최대 4개)</Title>
      <Table>
        <TBody>
          <TR>
            <TH>오피스 사진</TH>
            <TD>
              {officePhotos.map((photo, i) => (
                <ImageUploader
                  key={i}
                  label={i === 0 ? '메인 사진' : '추가 사진'}
                  onChange={(file) => handleOfficeChange(file, i)}
                  onDelete={() => handleOfficeDelete(i)}
                  previewUrl={previewUrls.office[i] || photo?.url || photo}
                />
              ))}
              {officePhotos.length < 4 && (
                <AddContainer onClick={handleAddOfficePhoto}>
                  <AddButton />
                  <p>사진 추가</p>
                </AddContainer>
              )}
            </TD>
          </TR>
          <TR>
            <TH>숙소 사진</TH>
            <TD>
              {stayPhotos.map((photo, i) => (
                <ImageUploader
                  key={i}
                  label={i === 0 ? '메인 사진' : '추가 사진'}
                  onChange={(file) => handleStayChange(file, i)}
                  onDelete={() => handleStayDelete(i)}
                  previewUrl={previewUrls.stay[i] || photo?.url || photo}
                />
              ))}
              {stayPhotos.length < 4 && (
                <AddContainer onClick={handleAddStayPhoto}>
                  <AddButton />
                  <p>사진 추가</p>
                </AddContainer>
              )}
            </TD>
          </TR>
        </TBody>
      </Table>
    </Body>
  );
});

export default PhotoForm;

const AddContainer = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  p {
    color: ${({ theme }) => theme.colors.gray[500]};
  }
  cursor: pointer;
`;

const Body = styled.div`
  gap: 40px;
  padding: 40px;
  height: 562px;
  background: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

const Title = styled.div`
  text-align: start;
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 16px 12px;
`;
const TBody = styled.tbody`
  display: flex;
  flex-direction: column;
  gap: 42px;
`;

const TR = styled.tr`
  vertical-align: middle;
  display: flex;
  align-items: center;
`;

const TH = styled.th`
  text-align: left;
  vertical-align: middle;
  width: 200px;
  font-weight: 500;
  margin-bottom: 40px;
`;

const TD = styled.td`
  display: flex;
  gap: 30px;
  align-items: flex-start;
`;

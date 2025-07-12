import React, { forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { ButtonBorder } from '../../../../styles/Button.styles.js';
import Checkbox from '../../../common/Checkbox';
import useWorcationStore from '../../../../store/useWorcationStore.js';

const AmenitiesForm = forwardRef((props, ref) => {
  const selectedAmenities = useWorcationStore((state) => state.amenities);
  const setSelectedAmenities = useWorcationStore((state) => state.setAmenities);

  useImperativeHandle(ref, () => ({})); // 필요시 getValues 등 추가 가능

  // 초기화 로직 제거 - 스토어에서 직접 값을 가져옴

  const handleAmenityChange = (value) => {
    if (selectedAmenities.includes(value)) {
      setSelectedAmenities(selectedAmenities.filter((item) => item !== value));
    } else {
      setSelectedAmenities([...selectedAmenities, value]);
    }
  };

  const amenities = [
    // office
    { label: '고속 와이파이', value: 1, category: 'office' },
    { label: '소회의실', value: 2, category: 'office' },
    { label: '화상회의 부스', value: 3, category: 'office' },
    { label: '프린터', value: 4, category: 'office' },
    { label: '개인 업무 책상', value: 5, category: 'office' },
    { label: '멀티탭', value: 6, category: 'office' },
    // stay
    { label: '에어컨', value: 7, category: 'stay' },
    { label: '조리공간', value: 8, category: 'stay' },
    { label: '세탁기', value: 9, category: 'stay' },
    { label: '편의점 도보거리', value: 10, category: 'stay' },
    { label: '주차', value: 11, category: 'stay' },
    { label: '청소 서비스', value: 12, category: 'stay' },
    // relax
    { label: '전용 테라스', value: 13, category: 'relax' },
    { label: '루프탑', value: 14, category: 'relax' },
    { label: '피트니스', value: 15, category: 'relax' },
    { label: '자연 접근성', value: 16, category: 'relax' },
    { label: '요가 공간', value: 17, category: 'relax' },
    // safety
    { label: '보안 도어락', value: 18, category: 'safety' },
    { label: 'CCTV', value: 19, category: 'safety' },
    { label: '전용 입구', value: 20, category: 'safety' },
    { label: '라커', value: 21, category: 'safety' },
    // digital
    { label: '무인 체크인', value: 22, category: 'digital' },
    { label: '모바일 컨시어지', value: 23, category: 'digital' },
    { label: '커뮤니티 기능', value: 24, category: 'digital' },
  ];

  const getAmenitiesByCategory = (category) => {
    return amenities.filter((item) => item.category === category);
  };

  const categoryNames = {
    office: '오피스 시설',
    stay: '숙소 시설',
    relax: '휴식 공간',
    safety: '안전 시설',
    digital: '디지털 서비스',
  };

  return (
    <Body>
      <Title>편의시설을 선택해주세요.(다중 선택 가능)</Title>
      <Table>
        <TBody>
          {['office', 'stay', 'relax', 'safety', 'digital'].map((category) => (
            <TR key={category}>
              <TH>{categoryNames[category]}</TH>
              <TD>
                <AmenitiesContainer>
                  {getAmenitiesByCategory(category).map((amenity) => (
                    <Checkbox
                      key={amenity.value}
                      id={String(amenity.value)}
                      label={amenity.label}
                      checked={selectedAmenities.includes(amenity.value)}
                      onChange={() => handleAmenityChange(amenity.value)}
                    />
                  ))}
                </AmenitiesContainer>
              </TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </Body>
  );
});

export default AmenitiesForm;

const Body = styled.div`
  padding: 40px;
  gap: 40px;
  height: 562px;
  display: flex;
  flex-direction: column;
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.gray[100]};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.gray[300]};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.gray[400]};
  }
`;

const Title = styled.div`
  text-align: start;
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 16px 12px;
  min-width: 800px;
`;
const TBody = styled.tbody`
  display: flex;
  flex-direction: column;
  gap: 42px;
`;

const TR = styled.tr`
  vertical-align: middle;
  display: flex;
`;

const TH = styled.th`
  text-align: left;
  vertical-align: middle;
  width: 200px;
  font-weight: 500;
`;

const TD = styled.td`
  display: flex;
`;

const AmenitiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
`;

const ButtonYellow = styled(ButtonBorder)`
  height: 30px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  margin-left: 50px;
`;

import React, { forwardRef, useImperativeHandle, useEffect } from 'react';
import styled from 'styled-components';
import CustomSelect from '../../../common/Select';
import Checkbox from '../../../common/Checkbox';
import useWorcationStore from '../../../../store/useWorcationStore';

const FeatureForm = forwardRef((props, ref) => {
  const feature = useWorcationStore((state) => state.feature);
  const setFeature = useWorcationStore((state) => state.setFeature);

  useImperativeHandle(ref, () => ({})); // 필요시 getValues 등 추가 가능

  // store의 feature 값이 변경될 때마다 동기화 (무한 루프 방지)
  useEffect(() => {
    // store에 이미 값이 있으면 그대로 사용, 없으면 기본값으로 초기화
    if (feature.activities === undefined) {
      setFeature({ activities: [] });
    }
  }, []); // 마운트 시에만 실행

  const locationTypeOptions = [
    { value: 'mountain', label: '산' },
    { value: 'river', label: '강가' },
    { value: 'sea', label: '바닷가' },
    { value: 'plain', label: '평야, 들판' },
    { value: 'city', label: '도심' },
  ];

  const dominantColorOptions = [
    { value: 'nature_earth', label: '숲 속(초록, 갈색)' },
    { value: 'blue_sky', label: '시원한 색감 (하늘색)' },
    { value: 'achromatic', label: '모던한 느낌 (무채색)' },
    { value: 'yellow_orange', label: '밝고 따뜻한(노랑, 주황)' },
    { value: 'purple', label: '몽환적, 감성적 느낌(보라)' },
  ];

  const spaceMoodOptions = [
    { value: 'modern', label: '모던' },
    { value: 'eco_friendly', label: '자연 친화' },
    { value: 'quiet', label: '조용한 공간' },
    { value: 'urban_nature', label: '도시+자연' },
    { value: 'camping', label: '캠핑 스타일' },
  ];

  const bestForOptions = [
    { value: 'work_efficiency', label: '업무 효율' },
    { value: 'scenery', label: '자연 경치' },
    { value: 'activity', label: '액티비티' },
    { value: 'rest', label: '휴식 공간' },
    { value: 'overall_vibe', label: '전체 분위기' },
  ];

  const activitiesOptions = [
    { value: 'reading', label: '독서/산책' },
    { value: 'swimming', label: '수영·해양 스포츠' },
    { value: 'food_tour', label: '지역 탐방·맛집' },
    { value: 'meditation', label: '명상·요가·휴식' },
    { value: 'social', label: '교류 활동' },
  ];

  const accommodationTypeOptions = [
    { value: 'clean_convenient', label: '깔끔하고 편리한 숙소' },
    { value: 'nature_lodging', label: '자연 속 숙소' },
    { value: 'camping_car', label: '캠핑 또는 차박' },
    { value: 'emotional_style', label: '감성적인 숙소' },
    { value: 'shared_space', label: '공유 공간 포함 숙소' },
  ];

  const handleActivitiesChange = (value) => {
    const updated = feature.activities.includes(value)
      ? feature.activities.filter((item) => item !== value)
      : [...feature.activities, value];
    setFeature({ activities: updated });
  };
  return (
    <Body>
      <Title>워케이션 특징을 선택하세요.</Title>
      <Table>
        <TBody>
          <TR>
            <TH>위치 유형</TH>
            <TD>
              <CustomSelect
                options={locationTypeOptions}
                value={feature.locationType}
                onChange={(e) => setFeature({ locationType: e.target.value })}
              />
            </TD>
          </TR>
          <TR>
            <TH>전반적 색감</TH>
            <TD>
              <CustomSelect
                options={dominantColorOptions}
                value={feature.dominantColor}
                onChange={(e) => setFeature({ dominantColor: e.target.value })}
              />
            </TD>
          </TR>
          <TR>
            <TH>공간 분위기</TH>
            <TD>
              <CustomSelect
                options={spaceMoodOptions}
                value={feature.spaceMood}
                onChange={(e) => setFeature({ spaceMood: e.target.value })}
              />
            </TD>
          </TR>
          <TR>
            <TH>추천 목적</TH>
            <TD>
              <CustomSelect
                options={bestForOptions}
                value={feature.bestFor}
                onChange={(e) => setFeature({ bestFor: e.target.value })}
              />
            </TD>
          </TR>
          <TR>
            <TH>여가 활동</TH>
            <TD>
              <AmenitiesContainer>
                {activitiesOptions.map((activity) => (
                  <Checkbox
                    key={activity.value}
                    id={activity.value}
                    label={activity.label}
                    checked={feature.activities.includes(activity.value)}
                    onChange={() => handleActivitiesChange(activity.value)}
                  />
                ))}
              </AmenitiesContainer>
            </TD>
          </TR>
          <TR>
            <TH>숙소 형태</TH>
            <TD>
              <CustomSelect
                options={accommodationTypeOptions}
                value={feature.accommodationType}
                onChange={(e) => setFeature({ accommodationType: e.target.value })}
              />
            </TD>
          </TR>
        </TBody>
      </Table>
    </Body>
  );
});

export default FeatureForm;

const Body = styled.div`
  gap: 40px;
  padding: 40px;
  height: 562px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

const Title = styled.div`
  text-align: start;
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 16px 12px; /* 셀 간격 조정 */
`;
const TBody = styled.tbody`
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const TR = styled.tr`
  vertical-align: middle;
  display: flex;
`;

const TH = styled.th`
  display: flex;
  align-items: center;
  text-align: left;
  width: 200px;
  font-weight: 500;
`;

const TD = styled.td`
  display: flex;
`;

const AmenitiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

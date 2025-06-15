import React from 'react';
import styled from 'styled-components';

const InfoListData = [
  {
    icon: '아이콘',
    title: '근무자',
    count: 100,
  },

  {
    icon: '아이콘',
    title: '워케이션 근무자',
    count: 100,
  },
  {
    icon: '아이콘',
    title: '총 인원',
    count: 200,
  },
];

const CalenderContainoer = () => {
  return (
    <Container>
      <DateHeader>
        <DateHeaderTitle>2025년 6월</DateHeaderTitle>
      </DateHeader>
      <Contents>
        <Calender>Calender</Calender>
        <InfoList>
          <InfoListUl>
            {InfoListData.map((item, index) => (
              <InfoListLi key={index}>
                <LeftInfo>
                  <i>{item.icon}</i>
                  <span>{item.title}</span>
                </LeftInfo>
                <RightInfo>
                  <span>{item.count}</span>
                </RightInfo>
              </InfoListLi>
            ))}
          </InfoListUl>
        </InfoList>
      </Contents>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.s6};
  margin-bottom: ${({ theme }) => theme.spacing.s6};
`;
const DateHeader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.s4};
`;
const DateHeaderTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.black};
`;
const Contents = styled.div`
  width: 100%;
  max-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Calender = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InfoList = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
`;
const InfoListUl = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  padding: 12px;
`;
const InfoListLi = styled.li`
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  padding: ${({ theme }) => theme.spacing.s3};
  margin: ${({ theme }) => theme.spacing.s1};
`;
const LeftInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.s6};
`;
const RightInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default CalenderContainoer;

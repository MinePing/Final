import React from 'react'
import styled from 'styled-components';
import { ButtonBorder, ButtonDetail } from '../../styles/Button.styles';
const WorcationCardList = ({ data, navigate }) => (
    <CardList>
      {data.map((item) => (
        <PlaceCard key={item.worcation_no}>
          <PlaceImage src={item.main_change_photo} alt={item.worcation_name} />
          <CardContent>
            <InfoBlock>
              <PlaceLocation>{item.address}</PlaceLocation>
              <PlaceName>{item.worcation_name}</PlaceName>
              <PlaceReview>
              리뷰 ({item.reviews ? item.reviews.length : 0})
              </PlaceReview>
            </InfoBlock>
            <ThemeBlock>
              <ThemeLabel>테마</ThemeLabel>
              <ThemeText>{item.worcation_thema || '미지정'}</ThemeText>
              <ButtonDetail onClick={() => navigate(`/worcation/${item.worcation_no}`)}>상세보기</ButtonDetail>
            </ThemeBlock>
          </CardContent>
        </PlaceCard>
      ))}
    </CardList>
  );

export default WorcationCardList

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4%;
`;

const PlaceCard = styled.div`
  display: flex;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 20px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 30px;
`;

const PlaceImage = styled.img`
  width: 250px;
  height: 150px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  margin: 20px 0 20px 40px;
`;

const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 65%;
  padding: 3%;
  gap: 30%;
  flex-wrap: wrap;
`;

const InfoBlock = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 12px;
`;

const PlaceLocation = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray[600]};
`;

const PlaceName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: bold;
`;

const PlaceReview = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray[800]};
`;
const ThemeBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  border-left: 2px solid ${({ theme }) => theme.colors.yellow};
  padding-left: 5%;
`;

const ThemeLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const ThemeText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.black};
`;
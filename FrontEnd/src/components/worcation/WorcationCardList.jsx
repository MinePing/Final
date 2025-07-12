import React from 'react';
import styled from 'styled-components';
import { ButtonDetail } from '../../styles/Button.styles';
import { worcationService } from '../../api/worcations';
import useAuthStore from '../../store/authStore';

const WorcationCardList = ({ data, navigate, mode = 'view' }) => {
  const loginUser = useAuthStore((state) => state.loginUser);

  const handleDelete = async (worcation_no) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await worcationService.delete(worcation_no);
        console.log('삭제 성공 : ', worcation_no);
      } catch (error) {
        console.error('삭제 실패:', error);
      }
    }
  };

  return (
    <CardList>
      {data && data.length > 0 ? (
        data.map((item) => (
          <PlaceCard key={item.worcation_no}>
            <picture>
              {item.main_change_photo ? (
                <>
                  <source srcSet={item.main_change_photo + '.webp'} type="image/webp" />
                  <PlaceImage
                    src={item.main_change_photo}
                    alt={item.worcation_name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = '/default-image.png';
                    }}
                  />
                </>
              ) : (
                <PlaceImage src="/default-image.png" alt="no image" loading="lazy" />
              )}
            </picture>
            <CardContent>
              <InfoBlock>
                <PlaceLocation>
                  {item.worcation_address ? item.worcation_address.split(' ').slice(0, 2).join(' ') : ''}
                </PlaceLocation>
                <PlaceName>{item.worcation_name}</PlaceName>
                <PlaceReview>리뷰 ({item.reviews ? item.reviews.length : 0})</PlaceReview>
              </InfoBlock>
              <ThemeBlock>
                <ThemeLabel>테마</ThemeLabel>
                <ThemeText>{item.worcation_thema || '미지정'}</ThemeText>
                {mode === 'host' && item.member_id === loginUser.user_no ? (
                  <ButtonGroup>
                    <ButtonDetail
                      onClick={() =>
                        navigate(`/worcation/edit/${item.worcation_no}`, {
                          state: { worcation: item },
                        })
                      }
                    >
                      수정
                    </ButtonDetail>
                    <ButtonDetail onClick={() => handleDelete(item.worcation_no)}>삭제</ButtonDetail>
                  </ButtonGroup>
                ) : (
                  <ButtonDetail onClick={() => navigate(`/worcation/${item.worcation_no}`)}>상세보기</ButtonDetail>
                )}
              </ThemeBlock>
            </CardContent>
          </PlaceCard>
        ))
      ) : (
        <div>목록이 없습니다.</div>
      )}
    </CardList>
  );
};

export default WorcationCardList;

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
  min-width: 250px;
  min-height: 150px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  margin: 20px 0 20px 40px;
  background: #f5f5f5;
  display: block;
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
  align-items: flex-start;
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

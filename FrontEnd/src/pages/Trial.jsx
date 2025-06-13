import Button from '../styles/Button';
import styled from 'styled-components';
import { Col } from 'antd';

const Trial = () => {
  return (
    <>
      <Content>
        <TestBox>
          <NameBox>
            <TestName>스트레스 검사</TestName>
            <div>
              <img
                src="src/assets/stress.png"
                alt="Rectangle"
                style={{ width: '150px', height: '120px', objectFit: 'cover' }}
              />
              사진 내용
            </div>
          </NameBox>
          <Textbox>
            <button style={Button.buttonWhite2}>테스트하러 가기</button>
          </Textbox>
        </TestBox>
        <TestBox>
          <NameBox>
            <TestName>번아웃 검사</TestName>
            <div>사진 내용</div>
          </NameBox>
          <Textbox>
            <button style={Button.buttonWhite2}>테스트하러 가기</button>
          </Textbox>
        </TestBox>
        <TestBox>
          <NameBox>
            <TestName>성향 검사</TestName>
            <div>사진 내용</div>
          </NameBox>
          <Textbox>
            <button style={Button.buttonWhite2}>테스트하러 가기</button>
          </Textbox>
        </TestBox>
      </Content>
    </>
  );
};

const TestBox = styled.div`
  display: flex;
  width: 1000px;
`;

const Textbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 150px;
  background: ${({ theme }) => theme.colors.primary};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column; /* 요소들을 세로로 쌓기 */
  justify-content: center; /* 수직 가운데 정렬 (column일 때는 수직) */
  align-items: center; /* 수평 가운데 정렬 */
  padding: 30px;
  background: ${({ theme }) => theme.colors.gray['100']};
  width: 100%;
  gap: ${({ theme }) => theme.spacing.s3};
`;

const NameBox = styled.div`
  width: 500px;
  background: ${({ theme }) => theme.colors.white};
`;

const TestName = styled.p`
  display: flex;
  padding-left: 10px;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export default Trial;

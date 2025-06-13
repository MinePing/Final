import React from 'react';
import styled from 'styled-components';
import Input from '../styles/Input';
import btn from '../styles/Button';

const BodyInfo = () => {
  return (
    <>
      <Content>
        <TitleBox>
          <Title>나의 신체 정보</Title>
        </TitleBox>
        <Form>
          <Box>
            <InputGroup>
              <InputName>몸무게(kg)</InputName>
              <InputText style={Input.InputGray} type="text" />
            </InputGroup>
            <InputGroup>
              <InputName>키(cm)</InputName>
              <InputText style={Input.InputGray} type="text" />
            </InputGroup>
            <InputGroup>
              <InputName>체질량지수(BMI) (15.0 ~ 40.0)</InputName>
              <InputText style={Input.InputGray} type="text" />
            </InputGroup>
            <InputGroup>
              <InputName>혈압 수치(수축기/이완기)</InputName>
              <InputText style={Input.InputGray} type="text" />
            </InputGroup>
            <InputGroup>
              <InputName>혈당 수치(mg/DL)</InputName>
              <InputText style={Input.InputGray} type="text" />
            </InputGroup>
          </Box>
          <Box>
            <InputGroup>
              <InputName>콜레스테롤 수치(mg/dL)</InputName>
              <InputText style={Input.InputGray} type="text" />
            </InputGroup>
            <InputGroup>
              <InputName>흡연습관</InputName>
              <Select style={Input.InputGray}>
                <option value="">선택하세요</option>
                <option value="none">비흡연</option>
                <option value="light">가끔 흡연</option>
                <option value="regular">정기적으로 흡연</option>
              </Select>
            </InputGroup>
            <InputGroup>
              <InputName>음주 수준</InputName>
              <InputText style={Input.InputGray} type="text" />
            </InputGroup>
            <InputGroup>
              <InputName>신체 활동 수준</InputName>
              <InputText style={Input.InputGray} type="text" />
            </InputGroup>
            <InputGroup>
              <InputName>평균 수면 시간</InputName>
              <InputText style={Input.InputGray} type="text" />
            </InputGroup>
          </Box>
          <Box>
            <InputGroup>
              <InputName>식단 유형</InputName>
              <InputText style={Input.InputGray} type="text" />
            </InputGroup>
            <InputGroup>
              <InputName>건강 상태</InputName>
              <InputText style={Input.InputGray} type="text" />
            </InputGroup>
          </Box>
        </Form>
        <ButnContent>
          <ButnBox>
            <button style={btn.buttonYbShadow}>취소</button>
            <button style={btn.buttonWbShadow}>완료</button>
          </ButnBox>
        </ButnContent>
      </Content>
    </>
  );
};

const Select = styled.select`
  width: 250px;
  height: 35px;
`;
const ButnContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButnBox = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-between;
`;

const InputText = styled.input`
  width: 250px;
  height: 35px;
`;

const Box = styled.div``;

const InputGroup = styled.div`
  height: 90px;
`;

const Form = styled.form`
  display: flex;
  padding-top: 20px;
  justify-content: space-around;
`;

const Content = styled.div`
  width: 1100px;
  padding-left: 30px;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: left;
  width: 100%;
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.fontSizes[`4xl`]};
`;

const InputName = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-family: ${({ theme }) => theme.fontFamily.secondary};
  display: flex;
  justify-content: left;
`;

export default BodyInfo;

import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import loginBg from '../../assets/loginBgImg.jpg';
import logo from '../../assets/LoginLogo.png';
import logoText from '../../assets/LoginText.png';
import memberService from '../../api/members';
import { validateForm, useDefaultForm, useEmployeeForm, useMasterForm } from '../../hooks/useAuth';
import DefaultStep from '../../components/auth/Default';
import EmployeeStep from '../../components/auth/Employee';
import MasterStep from '../../components/auth/Master';

const SignUp = () => {
  const [formStep, setFormStep] = useState(1);
  const [formData1, setFormData1] = useState({
    gender: 'M',
    role: 'EMPLOYEE',
  });
  const [formData2, setFormData2] = useState({});
  const [selectedRole, setSelectedRole] = useState('EMPLOYEE');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleNext = async () => {
    const valid = await validateForm(useDefaultForm, formData1);
    setIsFormValid(valid);
    if (!valid) return;
    setFormStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setFormStep((prev) => (prev > 1 ? prev - 1 : prev));
    setFormData2({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData1.user_pwd !== formData1.user_pwd_check) {
      alert('비밀번호가 일치하지 않습니다.');
      setIsFormValid(false);
      return;
    }
    let isValidStep2 = true;
    if (formStep === 2) {
      let schema = null;
      if (selectedRole === 'EMPLOYEE') schema = useEmployeeForm;
      else if (selectedRole === 'MASTER') schema = useMasterForm;
      if (schema) {
        isValidStep2 = await validateForm(schema, formData2);
        setIsFormValid(isValidStep2);
        if (!isValidStep2) return;
      }
    }
    try {
      await memberService.register(formData1, formData2);
      alert('회원가입이 완료되었습니다.');
      window.location.href = '/login';
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <SignUpWrap>
      <ContentWrap>
        <SignUpCard>
          {/* 로고 영역 */}
          <LogoWrap>
            <LogoImg src={logo} alt="logo" />
            <img src={logoText} />
          </LogoWrap>

          {/* STEP 1 - 기본 정보 입력 */}
          {formStep === 1 && (
            <DefaultStep
              formData1={formData1}
              setFormData1={setFormData1}
              setSelectedRole={setSelectedRole}
              setFormData2={setFormData2}
            />
          )}

          {/* STEP 2 - 직원 */}
          {formStep === 2 && formData1.role === 'EMPLOYEE' && (
            <EmployeeStep setFormData1={setFormData1} formData2={formData2} setFormData2={setFormData2} />
          )}

          {/* STEP 2 - 회사 */}
          {formStep === 2 && formData1.role === 'MASTER' && (
            <MasterStep setFormData1={setFormData1} formData2={formData2} setFormData2={setFormData2} />
          )}

          {/* 버튼 영역 */}
          <BtnFlex>
            {/* 타입 A, 1단계 → 취소 & 다음 */}
            {formStep === 1 && (
              <>
                <Btn onClick={() => window.history.back()}>취소</Btn>
                <Btn onClick={selectedRole === 'WORCATION' ? handleSubmit : handleNext}>
                  {selectedRole === 'WORCATION' ? '완료' : '다음'}
                </Btn>
              </>
            )}

            {formStep === 2 && (
              <>
                <Btn onClick={handlePrev}>이전</Btn>
                <Btn onClick={handleSubmit}>완료</Btn>
              </>
            )}
          </BtnFlex>
        </SignUpCard>
      </ContentWrap>
    </SignUpWrap>
  );
};

const SignUpWrap = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${loginBg});
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  color: ${({ theme }) => theme.colors.black};
`;

const ContentWrap = styled.div`
  width: 1280px;
  height: 80vh;
  display: flex;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.67);
  box-shadow: 4px 4px 8px 8px rgba(0, 0, 0, 0.08);
  padding: ${({ theme }) => theme.spacing.s8} ${({ theme }) => theme.spacing.s3};
`;

const SignUpCard = styled.div`
  width: 80%;
  font-family: ${({ theme }) => theme.fontFamily.primary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.base};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.s4};
`;

const LogoImg = styled.img`
  width: 70px;
  height: 70px;
`;

const BtnFlex = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.s3};
`;
const Btn = styled.button`
  width: 100px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.black};
  border: none;
`;

export default SignUp;

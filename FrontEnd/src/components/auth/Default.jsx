import React, { useState, useEffect } from 'react';
import CustomDatePicker from '../common/DatePicker';
import styled from 'styled-components';

const DefaultStep = ({ formData1, setFormData1, setSelectedRole, setFormData2 }) => {
  const [isPostcodeReady, setIsPostcodeReady] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    script.onload = () => setIsPostcodeReady(true);
    script.onerror = () => console.error('주소 검색 스크립트 로드 실패');
    document.body.appendChild(script);
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handleChange = (e, step) => {
    const { name, value } = e.target;
    if (step === 1) setFormData1((prev) => ({ ...prev, [name]: value }));
    else if (step === 2) setFormData2((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setSelectedRole(value);
    setFormData1((prev) => ({ ...prev, role: value }));
    setFormData2({});
  };

  const handleAddressSearch = () => {
    if (!isPostcodeReady) {
      alert('주소 검색 스크립트가 아직 준비되지 않았습니다.');
      return;
    }
    new window.daum.Postcode({
      oncomplete: function (data) {
        const addr = data.address;
        setFormData1((prev) => ({ ...prev, address: addr }));
      },
    }).open();
  };

  return (
    <Body className="InputWrap">
      {/* 왼쪽 컬럼 */}
      <Left>
        <div style={{ marginBottom: '16px' }}>
          <Label htmlFor="user_id">아이디</Label>
          <InputBox
            name="user_id"
            type="text"
            placeholder="아이디"
            value={formData1.user_id || ''}
            onChange={(e) => handleChange(e, 1)}
            variant="yellow"
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <Label htmlFor="user_pwd">비밀번호</Label>
          <InputBox
            name="user_pwd"
            type="password"
            placeholder="비밀번호"
            value={formData1.user_pwd || ''}
            onChange={(e) => handleChange(e, 1)}
            variant="yellow"
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <Label htmlFor="user_pwd_check">비밀번호 확인</Label>
          <InputBox
            name="user_pwd_check"
            type="password"
            placeholder="비밀번호 확인"
            value={formData1.user_pwd_check || ''}
            onChange={(e) => handleChange(e, 1)}
            variant="yellow"
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <Label htmlFor="name">이름</Label>
          <InputBox
            name="name"
            type="text"
            placeholder="이름"
            value={formData1.name || ''}
            onChange={(e) => handleChange(e, 1)}
            variant="yellow"
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <Label>성별</Label>
          <RadioGroup>
            <input
              type="radio"
              name="gender"
              value="M"
              checked={formData1.gender === 'M'}
              onChange={(e) => handleChange(e, 1)}
            />{' '}
            남성
            <input
              type="radio"
              name="gender"
              value="W"
              checked={formData1.gender === 'W'}
              onChange={(e) => handleChange(e, 1)}
            />{' '}
            여성
          </RadioGroup>
        </div>
      </Left>
      {/* 오른쪽 컬럼 */}
      <Right>
        <div style={{ marginBottom: '16px' }}>
          <Label htmlFor="address">주소</Label>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', width: '400px' }}>
            <InputBox
              name="address"
              type="text"
              value={formData1.address || ''}
              readOnly
              placeholder="주소"
              variant="yellow"
            />
            <AddressSearchButton type="button" onClick={handleAddressSearch} disabled={!isPostcodeReady}>
              검색
            </AddressSearchButton>
          </div>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <Label htmlFor="birthday">생년월일</Label>
          <StyledDatePickerWrapper>
            <CustomDatePicker
              selected={formData1.birthday || null}
              onChange={(date) => handleChange({ target: { name: 'birthday', value: date } }, 1)}
            />
          </StyledDatePickerWrapper>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <Label htmlFor="email">이메일</Label>
          <InputBox
            name="email"
            type="text"
            placeholder="이메일"
            value={formData1.email || ''}
            onChange={(e) => handleChange(e, 1)}
            variant="yellow"
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <Label htmlFor="phone">연락처</Label>
          <InputBox
            name="phone"
            type="text"
            placeholder="연락처"
            value={formData1.phone || ''}
            onChange={(e) => handleChange(e, 1)}
            variant="yellow"
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <Label>회원 유형</Label>
          <RadioGroup>
            <input
              type="radio"
              name="role"
              value="EMPLOYEE"
              checked={formData1.role === 'EMPLOYEE'}
              onChange={handleRadioChange}
            />
            직원
            <input
              type="radio"
              name="role"
              value="MASTER"
              checked={formData1.role === 'MASTER'}
              onChange={handleRadioChange}
            />
            기업
            <input
              type="radio"
              name="role"
              value="WORCATION"
              checked={formData1.role === 'WORCATION'}
              onChange={handleRadioChange}
            />
            워케이션 업체
          </RadioGroup>
        </div>
      </Right>
    </Body>
  );
};

export default DefaultStep;

const Body = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 100px;
  align-items: stretch;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const InputBox = styled.input`
  ${({ variant }) => {
    switch (variant) {
      case 'yellow':
        return `
          background: #ffffff;
          border: 3px solid #ffeb8c;
          border-radius: 10px;
          color: black;
        `;
      case 'gray':
        return `
          background: #f3f3f3;
          border: 3px solid #d1d5db;
          border-radius: 10px;
          color: black;
        `;
      case 'orange':
        return `
          background: #ffffff;
          border: 3px solid #f59e0b;
          border-radius: 10px;
          color: black;
        `;
      default:
        return '';
    }
  }};
  width: 400px;
  padding: ${({ theme }) => theme.spacing.s3};
  box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.25);
  margin: ${({ theme }) => theme.spacing.s0};
`;

const RadioGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.spacing.s10};
  margin: ${({ theme }) => theme.spacing.s9} ${({ theme }) => theme.spacing.s0};
`;

const Label = styled.label`
  display: block;
  text-align: left;
  margin-bottom: ${({ theme }) => theme.spacing.s2};
  margin-left: ${({ theme }) => theme.spacing.s1};
`;

const StyledDatePickerWrapper = styled.div`
  .react-datepicker__input-container input {
    box-sizing: border-box;
    max-width: 100%;
    width: 400px;
    height: 52.41px;
    background: #ffffff;
    border: 3px solid #ffeb8c;
    border-radius: 10px;
    color: black;
    padding: 0 12px;
    font-size: ${({ theme }) => theme.fontSizes.base};
    outline: none;
    margin: 0;
    box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.25);
  }
  .react-datepicker__input-container input::placeholder {
    color: #adadad;
    opacity: 1;
  }
  .react-datepicker__input-container input:focus {
    border-color: #ffeb8c;
    background: #fff;
  }
`;

const AddressSearchButton = styled.button`
  height: 52.41px;
  min-width: 80px;
  padding: 0 12px;
  background: #feffe0;
  border: 3px solid #dda900;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-family: ${({ theme }) => theme.fontFamily.primary};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

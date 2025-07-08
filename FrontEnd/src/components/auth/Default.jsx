import React, { useState, useEffect } from 'react';
import CustomDatePicker from '../common/DatePicker';
import styled from 'styled-components';
import memberService from '../../api/members';
import { toast } from 'react-toastify';

const DefaultStep = ({ formData1, setFormData1, setSelectedRole, setFormData2 }) => {
  const [isPostcodeReady, setIsPostcodeReady] = useState(false);
  const [socialInfo, setSocialInfo] = useState({});
  const [isSocial, setIsSocial] = useState(false);
  const fetchInitData = async () => {
    try {
      const initData = await memberService.init();
      setSocialInfo(initData);
      setIsSocial(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInitData(); // 호출

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
            value={isSocial.user_id || formData1.user_id || ''}
            onChange={(e) => handleChange(e, 1)}
            variant="yellow"
            readOnly={isSocial}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <Label htmlFor="user_pwd">비밀번호</Label>
          <InputBox
            name="user_pwd"
            type="password"
            placeholder="비밀번호"
            value={isSocial ? 'YUI^&*678' : formData1.user_pwd || ''}
            onChange={(e) => handleChange(e, 1)}
            variant="yellow"
            readOnly={isSocial}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <Label htmlFor="user_pwd_check">비밀번호 확인</Label>
          <InputBox
            name="user_pwd_check"
            type="password"
            placeholder="비밀번호 확인"
            value={isSocial ? 'YUI^&*678' : formData1.user_pwd_check || ''}
            onChange={(e) => handleChange(e, 1)}
            variant="yellow"
            readOnly={isSocial}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <Label htmlFor="name">이름</Label>
          <InputBox
            name="name"
            type="text"
            placeholder="이름"
            value={isSocial.name || formData1.name || ''}
            onChange={(e) => handleChange(e, 1)}
            variant="yellow"
            readOnly={isSocial}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <Label>성별</Label>
          <RadioGroup>
            <RadioItem>
              <input
                type="radio"
                id="gender-male"
                name="gender"
                value="M"
                checked={formData1.gender === 'M'}
                onChange={(e) => handleChange(e, 1)}
              />
              <label htmlFor="gender-male">남성</label>
            </RadioItem>
            <RadioItem>
              <input
                type="radio"
                id="gender-female"
                name="gender"
                value="W"
                checked={formData1.gender === 'W'}
                onChange={(e) => handleChange(e, 1)}
              />
              <label htmlFor="gender-female">여성</label>
            </RadioItem>
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
              onClick={handleAddressSearch}
            />
            <AddressSearchButton type="button" onClick={handleAddressSearch} disabled={!isPostcodeReady}>
              검색
            </AddressSearchButton>
          </div>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <Label htmlFor="birthday">생년월일</Label>
          <CustomDatePicker
            selected={formData1.birthday || null}
            onChange={(date) => handleChange({ target: { name: 'birthday', value: date } }, 1)}
            variant="yellow"
          />
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
          <Label htmlFor="phone">휴대폰 번호</Label>
          <InputBox
            name="phone"
            type="text"
            placeholder="(-)를 포함해서 입력"
            value={formData1.phone || ''}
            onChange={(e) => handleChange(e, 1)}
            variant="yellow"
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <Label>회원 유형</Label>
          <RadioGroup>
            <RadioItem>
              <input
                type="radio"
                id="role-employee"
                name="role"
                value="EMPLOYEE"
                checked={formData1.role === 'EMPLOYEE'}
                onChange={handleRadioChange}
              />
              <label htmlFor="role-employee">직원</label>
            </RadioItem>
            <RadioItem>
              <input
                type="radio"
                id="role-master"
                name="role"
                value="MASTER"
                checked={formData1.role === 'MASTER'}
                onChange={handleRadioChange}
              />
              <label htmlFor="role-master">기업</label>
            </RadioItem>
            <RadioItem>
              <input
                type="radio"
                id="role-worcation"
                name="role"
                value="WORCATION"
                checked={formData1.role === 'WORCATION'}
                onChange={handleRadioChange}
              />
              <label htmlFor="role-worcation">워케이션 업체</label>
            </RadioItem>
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

const RadioItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  input[type='radio'] {
    cursor: pointer;
  }

  label {
    cursor: pointer;
    margin: 0;
  }
`;

const Label = styled.label`
  display: block;
  text-align: left;
  margin-bottom: ${({ theme }) => theme.spacing.s2};
  margin-left: ${({ theme }) => theme.spacing.s1};
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

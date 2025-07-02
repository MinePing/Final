import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import loginBg from '../../assets/loginBgImg.jpg';
import logo from '../../assets/LoginLogo.png';
import logoText from '../../assets/LoginText.png';
import Input from '../../styles/Input';
import { Link, useNavigate } from 'react-router-dom';
import memberService from '../../api/members';

import useAuthStore from '../../store/authStore';


const Login = () => {
  const [userId, setUserId] = useState('');
  const [userPwd, setUserPwd] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await memberService.login({ userId, userPwd });
      const { token } = response;
      localStorage.setItem('token', token);
      await useAuthStore.getState().fetchUserInfo();

      alert('로그인 성공!');
      navigate('/');
    } catch (error) {
      alert(`로그인 실패 : ${error}`);
    }
  };
  useEffect(() => {
    (async () => {
      if (localStorage.getItem('token')) {
        try {
          await useAuthStore.getState().fetchUserInfo();
          window.location.href = '/';
        } catch (error) {
          alert(`로그인 실패 : ${error}`);
        }
      }
    })();
  }, []);

  return (
    <LoginWrap>
      <ContentWrap>
        <LoginCard>
          <LogoWrap>
            <LogoImg src={logo} alt="logo" />
            <img src={logoText} alt="logoText" />
          </LogoWrap>
          <form onSubmit={handleLogin}>
            {/* variant: 'yellow' | 'gray' | 'orange' */}
            <InputBox
              variant="yellow"
              type="text"
              placeholder="아이디 입력"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <InputBox
              variant="yellow"
              type="password"
              placeholder="비밀번호 입력"
              value={userPwd}
              onChange={(e) => setUserPwd(e.target.value)}
            />
            <BtnFlex>
              <SignInBtn type="submit">로그인</SignInBtn>
              <SignUpLink to="/signUp">회원가입</SignUpLink>
            </BtnFlex>
            <button type="button">
              <br />
              구글 로그인 영역
            </button>
          </form>
        </LoginCard>
      </ContentWrap>
    </LoginWrap>
  );
};
const LoginWrap = styled.div`
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
  width: 800px;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.67);
  box-shadow: 4px 4px 8px 8px rgba(0, 0, 0, 0.08);
`;

const LoginCard = styled.div`
  width: 66%;
  height: 66%;
  font-family: ${({ theme }) => theme.fontFamily.primary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.s4};
  margin: ${({ theme }) => theme.spacing.s5} ${({ theme }) => theme.spacing.s3};
`;

const LogoImg = styled.img`
  width: 70px;
  height: 70px;
`;

const InputBox = styled.input`
  ${({ variant }) => {
    switch (variant) {
      case 'yellow':
        return Input.InputYellow;
      case 'gray':
        return Input.InputGray;
      case 'orange':
        return Input.InputOrange;
      default:
        return '';
    }
  }};
  width: 100%;
  box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.25);
  margin: ${({ theme }) => theme.spacing.s4} ${({ theme }) => theme.spacing.s0};
  padding: ${({ theme }) => theme.spacing.s3};
`;
const BtnFlex = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.s12};
`;

const CommonLoginPage = css`
  width: 50%;
  color: ${({ theme }) => theme.colors.black};
  border: 3px solid ${({ theme }) => theme.colors.black};
  border-radius: ${({ theme }) => theme.borderRadius['3xl']};
  margin: ${({ theme }) => theme.spacing.s3} ${({ theme }) => theme.spacing.s0};
  padding: ${({ theme }) => theme.spacing.s3} ${({ theme }) => theme.spacing.s0};
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  &:hover {
    border-color: ${({ theme }) => theme.colors.orange};
    color: ${({ theme }) => theme.colors.black};
    text-decoration: none;
  }
`;

const SignInBtn = styled.button`
  ${CommonLoginPage}
`;

const SignUpLink = styled(Link)`
  ${CommonLoginPage}
`;
export default Login;

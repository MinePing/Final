import React, { useState } from 'react';
import styled from 'styled-components';
import bgImg from '../../assets/backgroundImg.jpg';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const menuData = [
  {
    title: '심리검사',
    path: '/trial',
    items: [
      { title: '스트레스 검사', path: '/trial/stress' },
      { title: '번아웃 검사', path: '/trial/burnout' },
      { title: '성향 검사', path: '/trial/tendency' },
    ],
  },
  {
    title: '워케이션',
    path: '/workation/all',
    items: [
      { title: '전체보기', path: '/workation/all' },
      { title: '제휴업체', path: '/workation/partners' },
      { title: 'AI 추천', path: '/workation/ai' },
      { title: '워케이션 등록', path: '/workation/register' },
    ],
  },
  {
    title: '식단정보',
    path: '/eat',
    items: [' '],
  },
  {
    title: '직원관리',
    path: '/member/list',
    items: [
      { title: '직원목록', path: '/member/list' },
      { title: '워케이션 신청자', path: '/member/workation-applies' },
      { title: '상담 필요자', path: '/member/needs-consult' },
      { title: '직원 신청', path: '/member/applies' },
    ],
  },
  {
    title: '로그인',
    items: [
      { title: '내 정보', path: '/my/info' },
      { title: '신체 정보', path: '/my/body' },
      { title: '워케이션 신청내역', path: '/my/workation-history' },
    ],
  },
];

const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  return (
    <HeaderWrap onMouseEnter={() => setDropdownVisible(true)} onMouseLeave={() => setDropdownVisible(false)}>
      <HeaderBg>
        <HeaderInner>
          <LogoWrap>
            <LogoImg src={logo} alt="logo" />
          </LogoWrap>
          <NavWrap>
            <Nav>
              {menuData.map((menu, idx) => (
                <NavItem key={idx} className="nav-item">
                  {menu.title === '로그인' ? (
                    <StyleLinkButton to="/login">{menu.title}</StyleLinkButton>
                  ) : menu.path ? (
                    <StyleLink to={menu.path}>{menu.title}</StyleLink>
                  ) : (
                    menu.title
                  )}
                </NavItem>
              ))}
            </Nav>
          </NavWrap>
        </HeaderInner>
      </HeaderBg>

      {isDropdownVisible && (
        <DropdownWrap>
          <DropdownContent>
            {menuData
              .filter((menu) => menu.items && menu.items.length > 0)
              .map((menu, idx) => (
                <DropdownColumn key={idx}>
                  <ul>
                    {menu.items.map((item, subIdx) => (
                      <li key={subIdx}>
                        <StyleLink to={item.path}>{item.title}</StyleLink>
                      </li>
                    ))}
                  </ul>
                </DropdownColumn>
              ))}
          </DropdownContent>
        </DropdownWrap>
      )}
    </HeaderWrap>
  );
};

const HeaderWrap = styled.header`
  position: absolute;
  font-family: sans-serif;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
`;

const HeaderBg = styled.div`
  background-image: url(${bgImg});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 120px;
  position: relative;
`;

const HeaderInner = styled.div`
  max-width: 1280px;
  height: 100%;
  margin: ${({ theme }) => theme.spacing.s0} auto;
  padding: ${({ theme }) => theme.spacing.s0} ${({ theme }) => theme.spacing.s4};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.s2};
`;

const LogoImg = styled.img`
  width: 100px;
  height: 100px;
`;

const NavWrap = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Nav = styled.ul`
  display: flex;
  width: 100%;
  list-style: none;
  margin: ${({ theme }) => theme.spacing.s0};
  padding: ${({ theme }) => theme.spacing.s0};
  font-weight: bold;
  justify-content: space-between;
  align-items: center;
`;

const NavItem = styled.li`
  flex: 1;
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const DropdownWrap = styled.div`
  position: absolute;
  top: 120px;
  left: 0;
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  z-index: ${({ theme }) => theme.zIndices.docked};
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.s6} ${({ theme }) => theme.spacing.s0};
`;

const DropdownContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  max-width: 1280px;
  padding: ${({ theme }) => theme.spacing.s0} ${({ theme }) => theme.spacing.s4};

  &::before {
    content: '';
    display: block;
    width: 100px;
    margin-right: ${({ theme }) => theme.spacing.s2};
  }
`;

const DropdownColumn = styled.div`
  flex: 1;
  min-width: 180px;
  text-align: center;

  ul {
    list-style: none;
    padding: ${({ theme }) => theme.spacing.s0};
    margin: ${({ theme }) => theme.spacing.s0};

    li {
      padding: ${({ theme }) => theme.spacing.s3} ${({ theme }) => theme.spacing.s0};
      color: ${({ theme }) => theme.colors.black};
      cursor: pointer;

      &:hover {
        text-decoration: none;
      }
    }
  }
`;

const StyleLinkButton = styled(Link)`
  padding: ${({ theme }) => theme.spacing.s2} ${({ theme }) => theme.spacing.s4};
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.black};
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.colors.gray[100]};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary};
  }
`;

const StyleLink = styled(Link)`
  color: ${({ theme }) => theme.colors.black};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  &:focus {
    outline: none;
    border-radius: ${({ theme }) => theme.borderRadius.base};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary};
  }
`;

export default Header;

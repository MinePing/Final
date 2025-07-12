import React from 'react';
import styled from 'styled-components';
import FolderIcon from '../../common/Folder.jsx';
import useWorcationStore from '../../../store/useWorcationStore.js';

const Menu = ({ onMenuSelect, selectedMenu }) => {
  const isValidate = useWorcationStore((state) => state.isValidate);

  const menuItems = [
    { id: 'Info', label: '업체 정보' },
    { id: 'Description', label: '소개' },
    { id: 'Photo', label: '사진' },
    { id: 'Amenities', label: '편의시설' },
    { id: 'Location', label: '위치/주소' },
    { id: 'Policy', label: '운영 정책' },
    { id: 'Feature', label: '워케이션 특징' },
  ];

  return (
    <MenuContainer>
      <MenuHeader>워케이션 관리</MenuHeader>
      <MenuList>
        <MenuItem
          key="Application"
          isActive={selectedMenu === 'Application'}
          onClick={() => onMenuSelect('Application')}
        >
          <FolderIcon />
          <MenuLabel>호스트 신청</MenuLabel>
        </MenuItem>
        {isValidate
          ? menuItems.map((item) => (
              <MenuItem key={item.id} isActive={selectedMenu === item.id} onClick={() => onMenuSelect(item.id)}>
                <FolderIcon />
                <MenuLabel>{item.label}</MenuLabel>
              </MenuItem>
            ))
          : menuItems.map((item) => (
              <MenuItem key={item.id} style={{ cursor: 'not-allowed', PointerEvent: 'none' }}>
                <FolderIcon style={{ color: '#aaa' }} />
                <MenuLabel style={{ color: '#aaa' }}>{item.label}</MenuLabel>
              </MenuItem>
            ))}
      </MenuList>
    </MenuContainer>
  );
};

export default Menu;

const MenuContainer = styled.div``;

const MenuHeader = styled.div`
  display: flex;
  min-height: 50px;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.white};
  border-left: 2px solid ${({ theme }) => theme.colors.gray[200]};
  border-right: 2px solid ${({ theme }) => theme.colors.gray[200]};
  border-top: 2px solid ${({ theme }) => theme.colors.gray[200]};
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 566px;
  background: #fff;
  padding: 40px;
  border: 2px solid ${({ theme }) => theme.colors.gray[200]};
`;

const MenuItem = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isActive',
})`
  display: flex;
  align-items: center;
  gap: 9px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
  color: ${({ theme, isActive }) => (isActive ? theme.colors.secondary : theme.colors.black)};
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const MenuLabel = styled.label`
  font-weight: bold;
  cursor: pointer;
`;

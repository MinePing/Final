import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import memberService from '../../api/members';

const EmployeeStep = ({ setFormData1, formData2, setFormData2 }) => {
  const [companySearchResults, setCompanySearchResults] = useState([]);
  const [departmentSearchResults, setDepartmentSearchResults] = useState([]);
  const [positionList, setPositionList] = useState([]);
  const companyNameTimeout = useRef();
  const positions = [
    { position_name: '사원' },
    { position_name: '주임' },
    { position_name: '대리' },
    { position_name: '과장' },
    { position_name: '차장' },
    { position_name: '부장' },
    { position_name: '이사' },
    { position_name: '상무' },
    { position_name: '전무' },
    { position_name: '부사장' },
    { position_name: '사장' },
    { position_name: '회장' },
  ];

  const handleChange = (e, step) => {
    const { name, value } = e.target;
    if (step === 1) setFormData1((prev) => ({ ...prev, [name]: value }));
    else if (step === 2) setFormData2((prev) => ({ ...prev, [name]: value }));
  };

  const handleCompanyNameKeyUp = (e) => {
    const value = e.target.value;
    if (companyNameTimeout.current) clearTimeout(companyNameTimeout.current);
    companyNameTimeout.current = setTimeout(async () => {
      if (!value) {
        setCompanySearchResults([]);
        return;
      }
      try {
        const data = await memberService.searchCompany(value);
        setCompanySearchResults(Array.isArray(data) ? data : []);
      } catch (err) {
        setCompanySearchResults([]);
        console.error('회사명 검색 에러:', err);
      }
    }, 330);
  }; 

  const handleDepartmentClick = async (e) => {
    try {
      const data = await memberService.searchDepartment(formData2.company_no);
      setDepartmentSearchResults(data);
    } catch (err) {
      setDepartmentSearchResults([]);
    }
  };

  const handlePositionClick = async (e) => {
    setPositionList(positions);
  };

  const handleCompanySelect = (company) => {
    setFormData2((prev) => ({
      ...prev,
      company_no: company.company_no,
      company_name: company.company_name,
      company_address: company.company_address,
    }));
    setCompanySearchResults([]);
  };

  const handleDepartmentSelect = (department) => {
    setFormData2((prev) => ({
      ...prev,
      department_name: department.department_name,
    }));
    setDepartmentSearchResults([]);
  };

  const handlePositionSelect = (position) => {
    setFormData2((prev) => ({
      ...prev,
      position_name: position.position_name,
    }));
    setPositionList([]);
  };

  return (
    <Body className="InputWrap">
      {/* 왼쪽 컬럼 */}
      <Left>
        <div style={{ marginBottom: '16px' }}>
          <Label htmlFor="company_name">회사명</Label>
          <div style={{ position: 'relative' }}>
            <InputBox
              name="company_name"
              type="text"
              placeholder="회사명"
              value={formData2.company_name || ''}
              onChange={(e) => handleChange(e, 2)}
              onKeyUp={handleCompanyNameKeyUp}
              autoComplete="off"
              variant="yellow"
            />
            {companySearchResults.length > 0 && (
              <CompanyDropdown>
                {companySearchResults.map((company) => (
                  <DropdownItem key={company.company_no} onClick={() => handleCompanySelect(company)}>
                    {company.company_name}
                  </DropdownItem>
                ))}
              </CompanyDropdown>
            )}
          </div>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <Label htmlFor="department">부서명</Label>
          <div style={{ position: 'relative' }}>
            <InputBox
              name="department"
              type="text"
              placeholder="부서명"
              value={formData2.department_name || ''}
              onClick={handleDepartmentClick}
              variant="yellow"
              readOnly
            />
            {departmentSearchResults.length > 0 && (
              <CompanyDropdown>
                {departmentSearchResults.map((department) => (
                  <DropdownItem key={department.department_no} onClick={() => handleDepartmentSelect(department)}>
                    {department.department_name}
                  </DropdownItem>
                ))}
              </CompanyDropdown>
            )}
          </div>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <Label htmlFor="position">직급</Label>
          <div style={{ position: 'relative' }}>
            <InputBox
              name="position"
              type="text"
              placeholder="직급"
              value={formData2.position_name || ''}
              onClick={handlePositionClick}
              variant="yellow"
              readOnly
            />
            {positionList.length > 0 && (
              <CompanyDropdown>
                {positionList.map((position) => (
                  <DropdownItem key={position.position_no} onClick={() => handlePositionSelect(position)}>
                    {position.position_name}
                  </DropdownItem>
                ))}
              </CompanyDropdown>
            )}
          </div>
        </div>
      </Left>
      {/* 오른쪽 컬럼 */}
      <Right>
        <div style={{ marginBottom: '16px' }}>
          <Label htmlFor="company_address">회사주소</Label>
          <InputBox
            name="company_address"
            type="text"
            placeholder="회사주소"
            value={formData2.company_address || ''}
            onChange={(e) => handleChange(e, 2)}
            variant="yellow"
            readOnly
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <Label htmlFor="company_email">회사 이메일</Label>
          <InputBox
            name="company_email"
            type="text"
            placeholder="회사 이메일"
            value={formData2.company_email || ''}
            onChange={(e) => handleChange(e, 2)}
            variant="yellow"
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <Label htmlFor="company_phone">회사 전화번호</Label>
          <InputBox
            name="company_phone"
            type="text"
            placeholder="회사 전화번호"
            value={formData2.company_phone || ''}
            onChange={(e) => handleChange(e, 2)}
            variant="yellow"
          />
        </div>
      </Right>
    </Body>
  );
};

export default EmployeeStep;

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

const Label = styled.label`
  display: block;
  text-align: left;
  margin-bottom: ${({ theme }) => theme.spacing.s2};
  margin-left: ${({ theme }) => theme.spacing.s1};
`;

const CompanyDropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #fffbe6;
  border: 1px solid #ffeb8c;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  z-index: 10;
  max-height: 220px;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const DropdownItem = styled.li`
  padding: 10px 16px;
  height: 44px;
  cursor: pointer;
  &:hover {
    background: #fff3b0;
  }
`;

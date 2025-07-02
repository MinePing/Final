import React from 'react';
import styled from 'styled-components';
import CustomTextArea from '../../../common/TextArea';
import useWorcationStore from '../../../../store/useWorcationStore';
import { ButtonBorder } from '../../../../styles/Button.styles';
const Form = () => {
  const description = useWorcationStore((state) => state.description);
  const setDescription = useWorcationStore((state) => state.setDescription);

  const handleChange = (e) => {
    setDescription({ detailIntro: e.target.value });
  };
  return (
    <Body>
      <Title>상세페이지에 공개되는 내용입니다.</Title>
      <Table>
        <TBody>
          <TR>
            <TH>설명</TH>
            <TD>
              <CustomTextArea
                value={description.detailIntro}
                // onChange={(e) => setPolicy(e.target.value)}
                onChange={handleChange}
                rows={13}
              />
            </TD>
          </TR>
        </TBody>
      </Table>
    </Body>
  );
};

export default Form;

const Body = styled.div`
  gap: 40px;
  padding: 40px;
  height: 562px;
  background: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.gray[200]};
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

const Title = styled.div`
  text-align: start;
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 16px 12px; /* 셀 간격 조정 */
`;
const TBody = styled.tbody`
  display: flex;
  flex-direction: column;
  gap: 42px;
`;

const TR = styled.tr`
  vertical-align: middle;
  display: flex;
`;

const TH = styled.th`
  text-align: left;
  vertical-align: middle;
  width: 200px;
  font-weight: 500;
`;

const TD = styled.td`
  display: flex;

  textarea:focus {
    background: ${({ theme }) => theme.colors.white};
  }
`;

const ButtonYellow = styled(ButtonBorder)`
  height: 30px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  margin-left: 50px;
`;

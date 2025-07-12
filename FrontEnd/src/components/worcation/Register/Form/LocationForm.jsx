import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { InputLightGray } from '../../../../styles/Input.styles';
import { ButtonBorder } from '../../../../styles/Button.styles.js';
import CustomTextArea from '../../../common/TextArea';
import useWorcationStore from '../../../../store/useWorcationStore';

const LocationForm = forwardRef((props, ref) => {
  const location = useWorcationStore((state) => state.location);
  const setLocation = useWorcationStore((state) => state.setLocation);
  const [isPostcodeReady, setIsPostcodeReady] = useState(false);

  useImperativeHandle(ref, () => ({})); // 필요시 getValues 등 추가 가능

  // store의 location 값이 변경될 때마다 동기화 (무한 루프 방지)
  useEffect(() => {
    // store에 이미 값이 있으면 그대로 사용, 없으면 빈 문자열로 초기화
    if (location.address === undefined) {
      setLocation({ address: '', locationDescription: '' });
    }
  }, []); // 마운트 시에만 실행

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

  const handleSearch = () => {
    if (!isPostcodeReady) {
      alert('주소 검색 스크립트가 아직 준비되지 않았습니다.');
      return;
    }
    new window.daum.Postcode({
      oncomplete: function (data) {
        const addr = data.address;
        setLocation({ ...location, address: addr });
      },
    }).open();
  };

  const handleGuideChange = (e) => {
    setLocation({ ...location, locationDescription: e.target.value });
  };
  return (
    <Body>
      <Title>위치 / 주소를 입력해주세요.</Title>
      <Table>
        <TBody>
          <TR>
            <TH>주소</TH>
            <TD>
              <InputLightGray type="text" value={location.address || ''} readOnly placeholder="주소" />
              <ButtonBorder type="button" onClick={handleSearch} disabled={!isPostcodeReady}>
                주소 검색
              </ButtonBorder>
            </TD>
          </TR>
          <TR>
            <TH>길 안내</TH>
            <TD>
              <CustomTextArea
                rows={13}
                value={location.locationDescription || ''}
                onChange={handleGuideChange}
                placeholder="위치에 대한 상세한 길 안내를 입력해주세요."
              ></CustomTextArea>
            </TD>
          </TR>
        </TBody>
      </Table>
    </Body>
  );
});

export default LocationForm;

const Body = styled.div`
  gap: 40px;
  padding: 40px;
  height: 562px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

const Title = styled.div`
  text-align: start;
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 16px 12px;
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
  gap: 20px;
`;

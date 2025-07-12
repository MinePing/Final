import React, { forwardRef, useImperativeHandle, useEffect } from 'react';
import styled from 'styled-components';
import CustomTextArea from '../../../common/TextArea.jsx';
import useWorcationStore from '../../../../store/useWorcationStore';

const PolicyForm = forwardRef((props, ref) => {
  const policy = useWorcationStore((state) => state.policy);
  const setPolicy = useWorcationStore((state) => state.setPolicy);

  useImperativeHandle(ref, () => ({})); // 필요시 getValues 등 추가 가능

  // store의 policy 값이 변경될 때마다 동기화 (무한 루프 방지)
  useEffect(() => {
    // store에 이미 값이 있으면 그대로 사용, 없으면 기본값으로 초기화
    if (policy.checkinHour === undefined || policy.refundPolicy === undefined) {
      setPolicy({
        checkinPeriod: policy.checkinPeriod || 'AM',
        checkinHour: policy.checkinHour || '9',
        checkinMinute: policy.checkinMinute || '00',
        checkoutPeriod: policy.checkoutPeriod || 'AM',
        checkoutHour: policy.checkoutHour || '11',
        checkoutMinute: policy.checkoutMinute || '00',
        officeStartPeriod: policy.officeStartPeriod || 'AM',
        officeStartHour: policy.officeStartHour || '9',
        officeStartMinute: policy.officeStartMinute || '00',
        officeEndPeriod: policy.officeEndPeriod || 'PM',
        officeEndHour: policy.officeEndHour || '6',
        officeEndMinute: policy.officeEndMinute || '00',
        refundPolicy: policy.refundPolicy || '',
      });
    }
  }, []); // 마운트 시에만 실행

  const handleChange = (field) => (e) => {
    setPolicy({ [field]: e.target.value });
  };
  return (
    <Body>
      <Title>예약시 적용되는 사항입니다.</Title>
      <Table>
        <TBody>
          <TR>
            <TH>체크인 시간</TH>
            <TD $wide>
              <TimeInputWrap>
                <HourInput
                  type="number"
                  min="1"
                  max="12"
                  value={policy.checkinHour || ''}
                  onChange={handleChange('checkinHour')}
                />
                <TimeSeparator>:</TimeSeparator>
                <MinuteInput
                  type="number"
                  min="0"
                  max="59"
                  value={policy.checkinMinute || ''}
                  onChange={handleChange('checkinMinute')}
                />

                <Select value={policy.checkinPeriod || 'AM'} onChange={handleChange('checkinPeriod')}>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </Select>
              </TimeInputWrap>
            </TD>
            <TH>오피스 시작</TH>
            <TD $wide>
              <TimeInputWrap>
                <HourInput
                  type="number"
                  min="1"
                  max="12"
                  value={policy.officeStartHour || ''}
                  onChange={handleChange('officeStartHour')}
                />
                <TimeSeparator>:</TimeSeparator>
                <MinuteInput
                  type="number"
                  min="0"
                  max="59"
                  value={policy.officeStartMinute || ''}
                  onChange={handleChange('officeStartMinute')}
                />

                <Select value={policy.officeStartPeriod || 'AM'} onChange={handleChange('officeStartPeriod')}>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </Select>
              </TimeInputWrap>
            </TD>
            <TD $fromto>부터</TD>
          </TR>
          <TR>
            <TH>체크아웃 시간</TH>
            <TD $wide>
              <TimeInputWrap>
                <HourInput
                  type="number"
                  min="1"
                  max="12"
                  value={policy.checkoutHour || ''}
                  onChange={handleChange('checkoutHour')}
                />
                <TimeSeparator>:</TimeSeparator>
                <MinuteInput
                  type="number"
                  min="0"
                  max="59"
                  value={policy.checkoutMinute || ''}
                  onChange={handleChange('checkoutMinute')}
                />

                <Select value={policy.checkoutPeriod || 'AM'} onChange={handleChange('checkoutPeriod')}>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </Select>
              </TimeInputWrap>
            </TD>
            <TH>오피스 끝</TH>
            <TD $wide>
              <TimeInputWrap>
                <HourInput
                  type="number"
                  min="1"
                  max="12"
                  value={policy.officeEndHour || ''}
                  onChange={handleChange('officeEndHour')}
                />
                <TimeSeparator>:</TimeSeparator>
                <MinuteInput
                  type="number"
                  min="0"
                  max="59"
                  value={policy.officeEndMinute || ''}
                  onChange={handleChange('officeEndMinute')}
                />

                <Select value={policy.officeEndPeriod || 'PM'} onChange={handleChange('officeEndPeriod')}>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </Select>
              </TimeInputWrap>
            </TD>
            <TD $fromto>까지</TD>
          </TR>
          <TR>
            <TH>환불 정책</TH>
            <TD colSpan={3} style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <CustomTextArea
                rows={7}
                value={policy.refundPolicy || ''}
                onChange={handleChange('refundPolicy')}
                placeholder="표준 환불 정책 : 일반적인 5일 전 취소 (Moderate)
일반(Moderate)​: 체크인 5일 전까지 취소할 경우 전액 환불(수수료 포함)
게스트가 체크인 5일 전까지 예약을 취소한다면 수수료를 포함한 전액을 환불받을 수 있습니다.
체크인 5일 전 이후에서 체크인 하루 전까지 취소하는 경우 숙박비 50%가 호스트에게 지급됩니다. 호스트에게 지급되는 숙박료에 해당하는 서비스 수수료가 차감되고 환불됩니다.
그 후에 취소하는 경우, 이미 숙박한 일수와 하루치의 숙박비 전액 및 남은 숙박 일수에 대한 숙박비 50%가 호스트에게 지급됩니다."
              />
            </TD>
          </TR>
        </TBody>
      </Table>
    </Body>
  );
});

export default PolicyForm;

const Body = styled.div`
  gap: ${({ theme }) => theme.spacing.s8};
  padding: ${({ theme }) => theme.spacing.s10};
  height: 562px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

const Title = styled.div`
  text-align: start;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-family: ${({ theme }) => theme.fontFamily.primary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.s4};
`;

const Table = styled.table`
  border-spacing: 0 ${({ theme }) => theme.spacing.s8};
  border-collapse: separate;
  table-layout: fixed;
`;
const TBody = styled.tbody`
  display: table-row-group;
`;

const TR = styled.tr`
  display: table-row;
  vertical-align: middle;
`;

const TH = styled.th`
  display: table-cell;
  text-align: left;
  vertical-align: middle;
  white-space: nowrap;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: ${({ theme }) => theme.fontFamily.primary};
  padding-right: ${({ theme }) => theme.spacing.s2};
  padding-top: ${({ theme }) => theme.spacing.s2};
  padding-bottom: ${({ theme }) => theme.spacing.s2};
`;

const TD = styled.td`
  display: table-cell;
  vertical-align: middle;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: ${({ theme }) => theme.fontFamily.primary};
  color: ${({ theme }) => theme.colors.black};
  padding-right: ${({ theme }) => theme.spacing.s2};
  padding-top: ${({ theme }) => theme.spacing.s2};
  padding-bottom: ${({ theme }) => theme.spacing.s2};
`;

const TimeInputWrap = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.s2};
`;

const Select = styled.select`
  height: ${({ theme }) => theme.heightes.input};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  border: 1.5px solid ${({ theme }) => theme.colors.gray[300]};
  padding: 0 ${({ theme }) => theme.spacing.s2};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: ${({ theme }) => theme.fontFamily.primary};
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.white};
`;

const HourInput = styled.input`
  height: ${({ theme }) => theme.heightes.input};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  border: 1.5px solid ${({ theme }) => theme.colors.gray[300]};
  padding: 0 ${({ theme }) => theme.spacing.s2};
  text-align: right;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: ${({ theme }) => theme.fontFamily.primary};
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.white};
`;

const MinuteInput = styled(HourInput)``;

const TimeSeparator = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: ${({ theme }) => theme.fontFamily.primary};
  color: ${({ theme }) => theme.colors.black};
`;

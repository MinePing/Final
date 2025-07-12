// useValidation.js
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';

const businessValidationSchema = yup.object().shape({
  licensee: yup.string().required('사업자 명을 입력해주세요.'),
  worcation_name: yup.string().required('상호명을 입력해주세요.'),
  open_date: yup.date().typeError('유효한 날짜를 선택해주세요').required('개업일을 선택해주세요.'),
  business_id: yup
    .string()
    .transform((value) => value.replace(/-/g, ''))
    .matches(/^[0-9]{10}$/, '사업자등록번호는 10자리 숫자여야 합니다.')
    .required('사업자등록번호를 입력해주세요.'),
});

export const useValidation = (defaultValues = {}) => {
  const {
    register, // input 연결
    control, // Controller용
    getValues, // 값 가져오기
    setValue, // 값 설정
    reset, // 폼 리셋
    handleSubmit, // 제출 핸들러
    formState: { errors, isSubmitting, isValid }, // 상태값들
    watch, // 값 실시간 감시
  } = useForm({
    resolver: yupResolver(businessValidationSchema), // yup 유효성 연결
    mode: 'onChange', // 값이 바뀔 때마다 유효성 검사
    defaultValues, // 초기값
  });

  // 폼 전체 데이터 반환
  const getFormData = () => getValues();

  // 특정 필드 값 반환
  const getFieldValue = (field) => getValues(field);

  // 폼 리셋
  const resetForm = (values = defaultValues) => reset(values);

  return {
    register,
    control,
    getValues,
    setValue,
    reset: resetForm,
    handleSubmit,
    errors,
    isSubmitting,
    isValid,
    watch,
    getFormData,
    getFieldValue,
  };
};

export function handleBusinessValidationResult(data) {
  console.log(data);
  toast.success('임시 통과 !');
  return true;
  // const result = data.data && data.data[0];
  // if (result && result.valid === "01") {
  //   toast.success('사업자 진위확인 성공!');
  //   return true;
  // } else {
  //   toast.error('사업자 진위확인 실패: ' + (result?.valid_msg || '정보 불일치'));
  //   return false;
  // }
}

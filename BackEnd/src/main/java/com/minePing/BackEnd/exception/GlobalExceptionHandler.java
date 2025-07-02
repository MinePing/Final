package com.minePing.BackEnd.exception;

import jakarta.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;


@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
    private final Map<String, String> constraintHandlers = new HashMap<>(32,0.75f);
    {
        constraintHandlers.put("company.uk_business_id", "이미 등록된 사업자 등록번호입니다.");
        constraintHandlers.put("company.uk_business_email", "이미 등록된 회사 이메일입니다.");
        constraintHandlers.put("company.uk_company_tel", "이미 등록된 회사 전화번호입니다.");
        constraintHandlers.put("company_profile.uk_user_no", "이미 직원 정보가 등록되어있습니다.");
        constraintHandlers.put("company_profile.uk_company_phone", "이미 등록된 회사 전화번호입니다.");
        constraintHandlers.put("company_profile.uk_company_email", "이미 등록된 회사 이메일입니다.");
        constraintHandlers.put("health.uk_user_no", "이미 회원 건강 정보가 등록되어있습니다.");
        constraintHandlers.put("member_preference.member.uk_user_no", "이미 회원 성향 정보가 등록되어있습니다.");
        constraintHandlers.put("member.uk_user_id", "이미 등록된 유저 아이디입니다.");
        constraintHandlers.put("member.uk_email", "이미 등록된 유저 이메일입니다.");
        constraintHandlers.put("member.uk_phone", "이미 등록된 유저 전화번호입니다.");
        constraintHandlers.put("review.uk_application_no", "이미 해당 워케이션의 리뷰가 있습니다.");
        constraintHandlers.put("worcation_detail.uk_detail_worcation_no", "이미 등록된 워케이션 전화번호입니다.");
        constraintHandlers.put("worcation_detail.uk_detail_business_id", "이미 등록된 워케이션 사업자등록번호입니다.");
        constraintHandlers.put("worcation_detail.uk_detail_worcation_tel", "이미 등록된 워케이션 전화번호입니다.");
        constraintHandlers.put("worcation_features.uk_worcation_no", "이미 워케이션 특성이 등록되어있습니다.");
    }

    //BaseException및 그 하위예외처리
    @ExceptionHandler(BaseException.class)
    public ResponseEntity<ErrorResponse> handleBaseException(BaseException ex, HttpServletRequest request) {
        log.error("BaseException 발생 : {}", ex.getMessage(), ex);
        String message = ex.getMessage() != null ? ex.getMessage() : ex.getErrorCode().getMessage();
        ErrorResponse error = ErrorResponse.of(ex.getErrorCode(), message, request.getRequestURI());
        return ResponseEntity.status(ex.getErrorCode().getStatus()).body(error);
    }

    //404에러처리
    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ErrorResponse> handleNoHandlerFoundException(NoHandlerFoundException ex,
                                                                       HttpServletRequest request) {
        log.error("핸드러를 찾을 수 없음 : {}", ex.getMessage());

        ErrorResponse error = ErrorResponse.of(ErrorCode.RESOURCE_NOT_FOUND, request.getRequestURI());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgument(IllegalArgumentException ex,
                                                               HttpServletRequest request) {
        log.error("잘못된 인수 : {}", ex.getMessage());
        ErrorResponse error = ErrorResponse.of(ErrorCode.INVALID_USER_INPUT, ex.getMessage(), request.getRequestURI());
        return ResponseEntity.badRequest().body(error);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorResponse> handleConstraintViolationException(ConstraintViolationException ex,
                                                                      HttpServletRequest request) {
        log.error("데이터 무결성 위반: {}", ex.getMessage(), ex);

        String constraintName = ex.getConstraintName();
        if(constraintName != null && constraintHandlers.containsKey(constraintName)) {
            ErrorResponse error = ErrorResponse.of(
                    HttpStatus.CONFLICT.value(),
                    constraintHandlers.get(constraintName),
                    request.getRequestURI()
            );
            return ResponseEntity.status(HttpStatus.CONFLICT).body(error);

        }

        ErrorResponse error = ErrorResponse.of(ErrorCode.DUPLICATE_RESOURCE, request.getRequestURI());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }

}

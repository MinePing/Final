package com.minePing.BackEnd.exception;

public class CompanyNotFoundException extends BaseException {
    public CompanyNotFoundException() {
        super(ErrorCode.COMPANY_NOT_FOUND);
    }

    public CompanyNotFoundException(ErrorCode errorCode) {
        super(ErrorCode.COMPANY_NOT_FOUND);
    }

    public CompanyNotFoundException(ErrorCode errorCode, String message) {
        super(ErrorCode.COMPANY_NOT_FOUND, message);
    }

    public CompanyNotFoundException(ErrorCode errorCode, String message, Throwable cause) {
        super(ErrorCode.COMPANY_NOT_FOUND, message, cause);
    }
}

package com.minePing.BackEnd.exception;

public class UserNotFoundException extends BaseException {
    public UserNotFoundException() {
        super(ErrorCode.USER_NOT_FOUND);
    }

    public UserNotFoundException(String message) {
        super(ErrorCode.USER_NOT_FOUND, message);
    }

    public UserNotFoundException(ErrorCode errorCode, String message) {
        super(ErrorCode.USER_NOT_FOUND, message);
    }

    public UserNotFoundException(ErrorCode errorCode, String message, Throwable cause) {
        super(ErrorCode.USER_NOT_FOUND, message, cause);
    }
}

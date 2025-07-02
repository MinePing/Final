package com.minePing.BackEnd.exception;

public class DuplicateResourceException extends BaseException {
    public DuplicateResourceException() {
        super(ErrorCode.DUPLICATE_RESOURCE);
    }

    public DuplicateResourceException(ErrorCode errorCode) {
        super(ErrorCode.DUPLICATE_RESOURCE);
    }

    public DuplicateResourceException(ErrorCode errorCode, String message) {
        super(ErrorCode.DUPLICATE_RESOURCE, message);
    }

    public DuplicateResourceException(ErrorCode errorCode, String message, Throwable cause) {
        super(ErrorCode.DUPLICATE_RESOURCE, message, cause);
    }
}

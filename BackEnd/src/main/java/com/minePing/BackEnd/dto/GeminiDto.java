package com.minePing.BackEnd.dto;

import lombok.*;

public class GeminiDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Request {
        private WorcationDto.Response worcation;
        private HealthDto.Response health;
        private String prompt;

        public static Request from(WorcationDto.Response worcation, HealthDto.Response health, String prompt) {
            return Request.builder()
                    .worcation(worcation)
                    .health(health)
                    .prompt(prompt)
                    .build();
        }
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {
        private String result;

        public static Response from(String result) {
            return Response.builder()
                    .result(result)
                    .build();
        }
    }
} 
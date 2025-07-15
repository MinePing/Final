package com.minePing.BackEnd.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import com.minePing.BackEnd.service.GeminiService;
import com.minePing.BackEnd.dto.GeminiDto;
import com.minePing.BackEnd.dto.WorcationDto;
import com.minePing.BackEnd.dto.HealthDto;

@RestController
@RequestMapping("/api/gemini")
public class GeminiControllder {

    private final GeminiService geminiService;

    public GeminiControllder(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/ask")
    public ResponseEntity<String> askGemini(@RequestBody Map<String, String> request) {
        String prompt = request.get("prompt");
        String result = geminiService.callGeminiApi(prompt);
        return ResponseEntity.ok(result);
    }

    /**
     * 워케이션 정보와 질문(prompt)을 받아 Gemini AI의 답변을 반환합니다.
     * @param request 워케이션 정보 + 질문
     * @return Gemini AI의 답변
     */
    @PostMapping("/gemini-multi")
    public ResponseEntity<GeminiDto.Response> getGeminiMultiSummary(@RequestBody GeminiDto.Request request) {
        WorcationDto.Response worcation = request.getWorcation();
        HealthDto.Response health = request.getHealth();
        String userPrompt = request.getPrompt();

        // 프롬프트에 원하는 정보를 자유롭게 조합
        String prompt = "워케이션 이름: " + worcation.getWorcation_name()
            + ", 위치: " + worcation.getWorcation_address()
            + ", 설명: " + worcation.getContent()
            + ", 사용자 키: " + health.getHeight()
            + ", 사용자 몸무게: " + health.getWeight()
            + ". " + userPrompt;

        String geminiResult = geminiService.callGeminiApi(prompt);
        return ResponseEntity.ok(GeminiDto.Response.from(geminiResult));
    }
}

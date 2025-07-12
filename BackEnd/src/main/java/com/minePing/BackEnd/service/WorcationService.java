package com.minePing.BackEnd.service;

import com.minePing.BackEnd.dto.WorcationDto;
import com.minePing.BackEnd.dto.WorcationDto.WorcationReservation;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface WorcationService {
    /**
     * 새로운 워케이션을 생성하고, DTO 응답을 반환한다.
     */
    WorcationDto.Response create(WorcationDto.Request request);

    /**
     * 임시 저장, 로직
     */
    WorcationDto.Response tmpSave(WorcationDto.Request request);
    /**
     * 특정 ID의 워케이션 상세 정보를 조회한다.
     */
    WorcationDto.Response getById(Long worcationNo);

    /**
     * 워케이션 전체 목록(간단 요약) 조회
     */
    List<WorcationDto.Response> getAll();

    /**
     * 워케이션 내 목록(간단 요약) 조회
     */
    List<WorcationDto.Response> getMyListALl(Long id);

    /**
     * 특정 워케이션을 수정하고, 수정된 DTO 응답을 반환한다.
     */
    WorcationDto.Response update(Long worcationNo, WorcationDto.Request request);

    /**
     * 특정 워케이션을 삭제한다.
     */
    void delete(Long worcationNo);

    // 오늘까지
    Map<String, List<WorcationDto.SimpleResponse>> getMyWorcations(Long userNo);


    //사업자


    //워케이션 이름
    List<WorcationDto.WorcationListName> getWorcationListName(Long userNo);

    Page<WorcationReservation> getWorcationReservation(Long userNo, Pageable pageable);
    //s3
//    String generatePresignedUrl(String filename);

    String uploadWithoutWorcation(MultipartFile file);


}

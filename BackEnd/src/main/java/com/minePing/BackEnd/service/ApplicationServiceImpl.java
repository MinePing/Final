package com.minePing.BackEnd.service;

import com.minePing.BackEnd.dto.ApplicationDto;
import com.minePing.BackEnd.dto.WorcationDto;
import com.minePing.BackEnd.entity.Member;
import com.minePing.BackEnd.entity.Worcation;
import com.minePing.BackEnd.entity.WorcationApplication;
import com.minePing.BackEnd.entity.WorcationDetail;
import com.minePing.BackEnd.entity.WorcationFeatures;
import com.minePing.BackEnd.enums.CommonEnums;
import com.minePing.BackEnd.mapper.WorcationMapper;
import com.minePing.BackEnd.repository.ApplicationRepository;
import com.minePing.BackEnd.repository.MemberRepository;
import com.minePing.BackEnd.repository.WorcationDetailRepository;
import com.minePing.BackEnd.repository.WorcationFeaturesRepository;
import com.minePing.BackEnd.repository.WorcationRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {

    private final WorcationMapper mapper;
    private final ApplicationRepository applicationRepository;
    private final MemberRepository memberRepository;
    private final WorcationRepository worcationRepository;
    private final WorcationDetailRepository detailRepository;
    private final WorcationFeaturesRepository featuresRepository;



    @Override
    public List<ApplicationDto.ApplicationResponseDto> getAllApplications() {
        return applicationRepository.findAll().stream()
                .map(ApplicationDto.ApplicationResponseDto::fromEntity)
                .toList();
    }

    @Override
    public ApplicationDto.ApplicationResponseDto getApplication(Long id) {
        WorcationApplication entity = applicationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 신청이 존재하지 않습니다. id=" + id));
        return ApplicationDto.ApplicationResponseDto.fromEntity(entity);
    }

    @Override
    @Transactional
    public ApplicationDto.ApplicationResponseDto createApplication(ApplicationDto.ApplicationRequestDto requestDto) {
        // 유저와 워케이션 엔티티 조회
        Member member = memberRepository.findById(requestDto.getUserNo())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
        Worcation worcation = worcationRepository.findById(requestDto.getWorcationNo())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 워케이션입니다."));

        // 엔티티 생성
        WorcationApplication entity = WorcationApplication.builder()
                .member(member)
                .worcation(worcation)
                .startDate(requestDto.getStartDate())
                .endDate(requestDto.getEndDate())
                .approve(CommonEnums.Approve.N)
                .build();

        WorcationApplication saved = applicationRepository.save(entity);
        return ApplicationDto.ApplicationResponseDto.fromEntity(saved);
    }

    @Override
    @Transactional
    public void deleteApplication(Long id) {
        if (!applicationRepository.existsById(id)) {
            throw new IllegalArgumentException("존재하지 않는 신청입니다. id=" + id);
        }
        applicationRepository.deleteById(id);
    }

    @Override
    public List<ApplicationDto.ApplicationResponseDto> getReserved() {
        LocalDate today = LocalDate.now();
        return applicationRepository.findAll().stream()
                .filter(app -> app.getStartDate().isAfter(today))
                .map(ApplicationDto.ApplicationResponseDto::fromEntity) // 전체 예약 정보를 포함한 DTO
                .collect(Collectors.toList());
    }

    @Override
    public List<ApplicationDto.ApplicationResponseDto> getUsed() {
        LocalDate today = LocalDate.now();
        return applicationRepository.findAll().stream()
                .filter(app -> app.getEndDate().isBefore(today))
                .map(ApplicationDto.ApplicationResponseDto::fromEntity)
                .collect(Collectors.toList());
    }


}

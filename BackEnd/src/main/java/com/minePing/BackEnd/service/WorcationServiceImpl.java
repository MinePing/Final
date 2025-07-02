package com.minePing.BackEnd.service;

import com.minePing.BackEnd.entity.WorcationApplication;
import com.minePing.BackEnd.repository.ApplicationRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.minePing.BackEnd.dto.WorcationDto;
import com.minePing.BackEnd.entity.Worcation;
import com.minePing.BackEnd.entity.WorcationDetail;
import com.minePing.BackEnd.entity.WorcationFeatures;
import com.minePing.BackEnd.entity.Member;
import com.minePing.BackEnd.entity.WorcationPartner;
import com.minePing.BackEnd.mapper.WorcationMapper;
import com.minePing.BackEnd.repository.WorcationDetailRepository;
import com.minePing.BackEnd.repository.WorcationFeaturesRepository;
import com.minePing.BackEnd.repository.WorcationRepository;
import com.minePing.BackEnd.repository.MemberRepository;
import com.minePing.BackEnd.repository.WorcationPartnerRepository;


import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@RequiredArgsConstructor
public class WorcationServiceImpl implements WorcationService {
    //데이터 확인용 로그
    private static final Logger log = LoggerFactory.getLogger(WorcationServiceImpl.class);

    private final WorcationMapper mapper;
    private final WorcationRepository worcationRepository;
    private final WorcationDetailRepository detailRepository;
    private final WorcationFeaturesRepository featuresRepository;
    private final MemberRepository memberRepository;
    private final ApplicationRepository applicationRepository;
    private final WorcationPartnerRepository partnerRepository;
    @Override
    @Transactional
    public WorcationDto.Response create(WorcationDto.Request request) {
        // member_id로 Member 엔티티 조회
        Member member = memberRepository.findById(request.getMember_id())
            .orElseThrow(() -> new RuntimeException("해당 멤버가 없습니다: " + request.getMember_id()));

        Worcation w = Worcation.builder()
            .member(member)
            .worcationName(request.getWorcation_name())
            .worcationCategory(request.getWorcation_category())
            .mainChangePhoto(request.getMain_change_photo())
            .worcationThema(request.getWorcation_thema())
            .maxPeople(request.getMax_people())
            .partnerPrice(request.getPartner_price())
            .nonPartnerPrice(request.getNon_partner_price())
            .worcationAddress(request.getWorcation_address())
            .build();
        w = worcationRepository.save(w);

        WorcationDetail d = WorcationDetail.builder()
            .worcation(w)
            .licensee(request.getLicensee())
            .businessId(request.getBusiness_id())
            .worcationTel(request.getWorcation_tel())
            .chargeAmount(request.getCharge_amount())
            .content(request.getContent())
            .navigate(request.getNavigate())
            .availableTime(request.getAvailable_time())
            .refundPolicy(request.getRefund_policy())
            .openDate(request.getOpen_date())
            .build();
        d = detailRepository.save(d);

        WorcationFeatures f = WorcationFeatures.builder()
            .worcation(w)
            .locationType(request.getLocation_type())
            .dominantColor(request.getDominant_color())
            .spaceMood(request.getSpace_mood())
            .bestFor(request.getBest_for())
            .activities(request.getActivities())
            .accommodationType(request.getAccommodation_type())
            .build();
        f = featuresRepository.save(f);

        return mapper.toResponse(w, d, f,List.of(),List.of());
    }

    @Override
    @Transactional(readOnly = true)
    public WorcationDto.Response getById(Long worcationNo) {
        Worcation w = worcationRepository.findById(worcationNo)
                .orElseThrow(() -> new RuntimeException("Worcation not found: " + worcationNo));
        WorcationDetail d = detailRepository.findById(w.getWorcationNo()).orElse(null);
        WorcationFeatures f = featuresRepository.findById(w.getWorcationNo()).orElse(null);
        List<WorcationPartner> partners = partnerRepository.findByWorcation(w);
        List<com.minePing.BackEnd.entity.Review> reviews = w.getWorcationApplications().stream()
                .map(app -> app.getReview())
                .filter(java.util.Objects::nonNull)
                .collect(java.util.stream.Collectors.toList());
        return mapper.toResponse(w, d, f, partners, reviews);
    }

    @Override
    @Transactional(readOnly = true)
    public List<WorcationDto.Response> getAll() {
        return worcationRepository.findAll().stream()
                .map(w -> {
                    WorcationDetail d = detailRepository.findById(w.getWorcationNo()).orElse(null);
                    WorcationFeatures f = featuresRepository.findById(w.getWorcationNo()).orElse(null);
                    List<WorcationPartner> partners = partnerRepository.findByWorcation(w);
                    List<com.minePing.BackEnd.entity.Review> reviews = w.getWorcationApplications().stream()
                            .map(app -> app.getReview())
                            .filter(java.util.Objects::nonNull)
                            .collect(java.util.stream.Collectors.toList());
                    return mapper.toResponse(w, d, f, partners, reviews);
                })
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public WorcationDto.Response update(Long worcationNo, WorcationDto.Request request) {
        Worcation existing = worcationRepository.findById(worcationNo)
                .orElseThrow(() -> new RuntimeException("Worcation not found: " + worcationNo));
        // PATCH 요청 전/후 값 확인용 로그
        log.info("Before update: worcation_name={}, max_people={}", existing.getWorcationName(), existing.getMaxPeople());

        // MapStruct의 updateFromDto(@BeanMapping) 대신 직접 커스텀 매퍼 사용
        // 이유: 엔티티에 setter가 없어서 MapStruct update 계열 사용 불가
        patchWorcation(request, existing);

        log.info("After update: worcation_name={}, max_people={}", existing.getWorcationName(), existing.getMaxPeople());

        WorcationDetail existingDetail = detailRepository.findById(worcationNo)
                .orElseThrow(() -> new RuntimeException("WorcationDetail not found: " + worcationNo));
        patchWorcationDetail(request, existingDetail);

        WorcationFeatures existingFeatures = featuresRepository.findById(worcationNo)
                .orElseThrow(() -> new RuntimeException("WorcationFeatures not found: " + worcationNo));
        patchWorcationFeatures(request, existingFeatures);

        return mapper.toResponse(existing, existingDetail, existingFeatures,List.of(),List.of());
    }

    // 커스텀 매퍼: DTO의 null이 아닌 값만 엔티티에 반영
    // changeXxx 메서드는 엔티티에 직접 구현되어 있음 (setter 없이 안전하게 값 변경)
    private void patchWorcation(WorcationDto.Request dto, Worcation entity) {
        if (dto.getWorcation_name() != null) entity.changeWorcationName(dto.getWorcation_name());
        if (dto.getWorcation_category() != null) entity.changeWorcationCategory(dto.getWorcation_category());
        if (dto.getMain_change_photo() != null) entity.changeMainChangePhoto(dto.getMain_change_photo());
        if (dto.getWorcation_thema() != null) entity.changeWorcationThema(dto.getWorcation_thema());
        if (dto.getMax_people() != null) entity.changeMaxPeople(dto.getMax_people());
        if (dto.getPartner_price() != null) entity.changePartnerPrice(dto.getPartner_price());
        if (dto.getNon_partner_price() != null) entity.changeNonPartnerPrice(dto.getNon_partner_price());
        if (dto.getWorcation_address() != null) entity.changeWorcationAddress(dto.getWorcation_address());
    }

    private void patchWorcationDetail(WorcationDto.Request dto, WorcationDetail entity) {
        if (dto.getLicensee() != null) entity.changeLicensee(dto.getLicensee());
        if (dto.getBusiness_id() != null) entity.changeBusinessId(dto.getBusiness_id());
        if (dto.getWorcation_tel() != null) entity.changeWorcationTel(dto.getWorcation_tel());
        if (dto.getCharge_amount() != null) entity.changeChargeAmount(dto.getCharge_amount());
        if (dto.getContent() != null) entity.changeContent(dto.getContent());
        if (dto.getNavigate() != null) entity.changeNavigate(dto.getNavigate());
        if (dto.getAvailable_time() != null) entity.changeAvailableTime(dto.getAvailable_time());
        if (dto.getRefund_policy() != null) entity.changeRefundPolicy(dto.getRefund_policy());
        if (dto.getOpen_date() != null) entity.changeOpenDate(dto.getOpen_date());
    }

    private void patchWorcationFeatures(WorcationDto.Request dto, WorcationFeatures entity) {
        if (dto.getLocation_type() != null) entity.changeLocationType(dto.getLocation_type());
        if (dto.getDominant_color() != null) entity.changeDominantColor(dto.getDominant_color());
        if (dto.getSpace_mood() != null) entity.changeSpaceMood(dto.getSpace_mood());
        if (dto.getBest_for() != null) entity.changeBestFor(dto.getBest_for());
        if (dto.getActivities() != null) entity.changeActivities(dto.getActivities());
        if (dto.getAccommodation_type() != null) entity.changeAccommodationType(dto.getAccommodation_type());
    }

    @Override
    @Transactional
    public void delete(Long worcationNo) {
        worcationRepository.deleteById(worcationNo);
    }


}
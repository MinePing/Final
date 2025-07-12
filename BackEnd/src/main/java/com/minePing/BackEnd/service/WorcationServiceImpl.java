package com.minePing.BackEnd.service;

import com.minePing.BackEnd.dto.WorcationDto.Response;
import com.minePing.BackEnd.dto.WorcationDto.WorcationListName;
import com.minePing.BackEnd.dto.WorcationDto.WorcationReservation;
import com.minePing.BackEnd.entity.Company;
import com.minePing.BackEnd.entity.CompanyProfile;
import com.minePing.BackEnd.entity.WorcationApplication;
import com.minePing.BackEnd.enums.CommonEnums;
import com.minePing.BackEnd.repository.PhotoRepository;
import java.io.File;
import java.io.IOException;
import java.time.ZoneId;
import java.util.Collections;
import java.util.Date;
import java.time.LocalDate;
import java.time.Period;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.minePing.BackEnd.enums.CommonEnums;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import com.amazonaws.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.minePing.BackEnd.dto.WorcationDto;
import com.minePing.BackEnd.entity.Worcation;
import com.minePing.BackEnd.entity.WorcationAmenity;
import com.minePing.BackEnd.entity.WorcationDetail;
import com.minePing.BackEnd.entity.WorcationFeatures;
import com.minePing.BackEnd.entity.Amenity;
import com.minePing.BackEnd.entity.Member;
import com.minePing.BackEnd.entity.Photo;
import com.minePing.BackEnd.entity.WorcationPartner;
import com.minePing.BackEnd.entity.Review;
import com.minePing.BackEnd.repository.WorcationRepository;
import com.minePing.BackEnd.repository.MemberRepository;
import com.minePing.BackEnd.exception.UserNotFoundException;
import com.minePing.BackEnd.exception.WorcationNotFoundException;

import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class WorcationServiceImpl implements WorcationService {
//    private final AmazonS3 amazonS3;
    private final WorcationRepository worcationRepository;
    private final MemberRepository memberRepository;
//    private final PhotoRepository photoRepository;
    public static final String UPLOAD_DIR = "src/main/resources/static/upload/";

    //최종 등록
    @Override
    @Transactional
    public WorcationDto.Response create(WorcationDto.Request request) {
        // 최종등록: business_id+status=Y 중복이면 예외
        if (worcationRepository.existsByBusinessIdAndStatus(request.getBusiness_id(), CommonEnums.Status.Y)) {
            throw new com.minePing.BackEnd.exception.DuplicateResourceException("이미 등록된 사업자번호입니다.");
        }
        return saveWorcation(request, CommonEnums.Status.Y);
    }
  
    //임시저장
    @Override
    @Transactional
    public WorcationDto.Response tmpSave(WorcationDto.Request request) {
        // 1. 같은 사업자번호+임시상태 데이터가 있으면 update, 없으면 create
        Optional<Worcation> existing = worcationRepository.findByBusinessIdAndStatus(request.getBusiness_id(), CommonEnums.Status.N);
        if (existing.isPresent()) {
            Worcation worcation = existing.get();
            // 기본 정보 update
            worcation.changeName(request.getWorcation_name());
            worcation.changeCategory(request.getWorcation_category());
            worcation.changeMainPhoto(request.getMain_change_photo());
            worcation.changeThema(request.getWorcation_thema());
            worcation.changeMaxPeople(request.getMax_people());
            worcation.changePartnerPrice(request.getPartner_price());
            worcation.changeNonPartnerPrice(request.getNon_partner_price());
            worcation.changeAddress(request.getWorcation_address());
            worcation.changeStatus(CommonEnums.Status.N);
            // Detail update
            WorcationDetail detail = worcation.getWorcationDetail();
            if (detail != null) {
                detail.changeLicensee(request.getLicensee());
                detail.changeBusinessId(request.getBusiness_id());
                detail.changeWorcationTel(request.getWorcation_tel());
                detail.changeChargeAmount(request.getCharge_amount());
                detail.changeContent(request.getContent());
                detail.changeNavigate(request.getNavigate());
                detail.changeAvailableTime(request.getAvailable_time());
                detail.changeRefundPolicy(request.getRefund_policy());
                detail.changeOpenDate(request.getOpen_date());
            }
            // Features update
            WorcationFeatures features = worcation.getWorcationFeatures();
            if (features != null) {
                features.changeLocationType(request.getLocation_type());
                features.changeDominantColor(request.getDominant_color());
                features.changeSpaceMood(request.getSpace_mood());
                features.changeBestFor(request.getBest_for());
                features.changeActivities(request.getActivities());
                features.changeAccommodationType(request.getAccommodation_type());
            }
            // save 불필요(더티체킹)
            return WorcationDto.Response.fromEntity(worcation, detail, features, List.of(), List.of(), List.of(), List.of());
        } else {
            // 없으면 새로 생성
            return saveWorcation(request, CommonEnums.Status.N);
        }
    }

    private WorcationDto.Response saveWorcation(WorcationDto.Request request, CommonEnums.Status status) {
        // business_id 중복 체크 (모든 상태에서)
        if (worcationRepository.existsByBusinessIdAndStatus(request.getBusiness_id(), CommonEnums.Status.Y) ||
            worcationRepository.existsByBusinessIdAndStatus(request.getBusiness_id(), CommonEnums.Status.N)) {
            throw new com.minePing.BackEnd.exception.DuplicateResourceException("이미 사용 중인 사업자번호입니다: " + request.getBusiness_id());
        }
        
        Member member = memberRepository.findById(request.getMember_id())
            .orElseThrow(() -> new UserNotFoundException("해당 멤버가 없습니다: " + request.getMember_id()));

        Worcation worcation = Worcation.builder()
            .member(member)
            .worcationName(request.getWorcation_name())
            .worcationCategory(request.getWorcation_category())
            .mainChangePhoto(request.getMain_change_photo())
            .worcationThema(request.getWorcation_thema())
            .maxPeople(request.getMax_people())
            .partnerPrice(request.getPartner_price())
            .nonPartnerPrice(request.getNon_partner_price())
            .worcationAddress(request.getWorcation_address())
            .status(status)
            .build();

        WorcationDetail detail = WorcationDetail.builder()
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
        detail.assignWorcation(worcation);
        worcation.assignDetail(detail);

        WorcationFeatures features = WorcationFeatures.builder()
            .worcation(worcation)
            .locationType(request.getLocation_type())
            .dominantColor(request.getDominant_color())
            .spaceMood(request.getSpace_mood())
            .bestFor(request.getBest_for())
            .activities(request.getActivities())
            .accommodationType(request.getAccommodation_type())
            .build();
        features.assignWorcation(worcation);
        worcation.assignFeatures(features);

        worcationRepository.save(worcation);

        return WorcationDto.Response.fromEntity(worcation, detail, features, List.of(), List.of(), List.of(), List.of());
    }

    @Override
    @Transactional(readOnly = true)
    public WorcationDto.Response getById(Long worcationNo) {
        // 최적화: 한 번의 쿼리로 모든 데이터 조회
        Worcation w = worcationRepository.findByIdWithAllDetails(worcationNo)
                .orElseThrow(() -> new WorcationNotFoundException("워케이션을 찾을 수 없습니다: " + worcationNo));

        // 모든 데이터가 이미 로드되어 있으므로 별도 조회 불필요
        WorcationDetail d = w.getWorcationDetail();
        WorcationFeatures f = w.getWorcationFeatures();
        List<WorcationPartner> partners = new ArrayList<>(w.getWorcationPartners());
        List<Review> reviews = w.getWorcationApplications().stream()
                .map(app -> app.getReview())
                .filter(java.util.Objects::nonNull)
                .collect(java.util.stream.Collectors.toList());
        List<Amenity> amenities = w.getWorcationAmenities().stream()
                .map(WorcationAmenity::getAmenity)
                .collect(Collectors.toList());
        List<Photo> photos = new ArrayList<>(w.getPhotos());

        return WorcationDto.Response.fromEntity(w, d, f, partners, reviews, amenities, photos);
    }

    @Override
    @Transactional(readOnly = true)
    public List<WorcationDto.Response> getAll() {
        return worcationRepository.findAllWithAllDetails().stream()
                .map(w -> {
                    // 모든 데이터가 이미 로드되어 있으므로 별도 조회 불필요
                    WorcationDetail d = w.getWorcationDetail();
                    WorcationFeatures f = w.getWorcationFeatures();

                    List<Amenity> amenities = w.getWorcationAmenities().stream()
                            .map(WorcationAmenity::getAmenity)
                            .collect(Collectors.toList());

                    List<Photo> photos = new ArrayList<>(w.getPhotos());

                    List<WorcationPartner> partners = new ArrayList<>(w.getWorcationPartners());

                    List<Review> reviews = w.getWorcationApplications().stream()
                            .map(app -> app.getReview())
                            .filter(java.util.Objects::nonNull)
                            .collect(Collectors.toList());

                    return WorcationDto.Response.fromEntity(w, d, f, partners, reviews, amenities, photos);
                })
                .collect(Collectors.toList());
    }


    @Override
    @Transactional(readOnly = true)
    public List<WorcationDto.Response> getMyListALl(Long id) {
        // 최적화: 특정 사용자의 워케이션만 조회
        return worcationRepository.findAllByUserNoWithAllDetails(id).stream()
                .map(w -> {
                    WorcationDetail d = w.getWorcationDetail();
                    WorcationFeatures f = w.getWorcationFeatures();
                    
                    List<Amenity> amenities = w.getWorcationAmenities().stream()
                            .map(WorcationAmenity::getAmenity)
                            .collect(Collectors.toList());
                    
                    List<Photo> photos = new ArrayList<>(w.getPhotos());
                    
                    List<WorcationPartner> partners = new ArrayList<>(w.getWorcationPartners());
                    
                    List<Review> reviews = w.getWorcationApplications().stream()
                            .map(app -> app.getReview())
                            .filter(java.util.Objects::nonNull)
                            .collect(Collectors.toList());

                    return WorcationDto.Response.fromEntity(w, d, f, partners, reviews, amenities, photos);
                })
            .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public WorcationDto.Response update(Long worcationNo, WorcationDto.Request request) {
        Worcation worcation = worcationRepository.findById(worcationNo)
                .orElseThrow(() -> new WorcationNotFoundException("워케이션을 찾을 수 없습니다: " + worcationNo));
        // 필드만 수정 (더티체킹)
        worcation.changeName(request.getWorcation_name());
        worcation.changeCategory(request.getWorcation_category());
        worcation.changeMainPhoto(request.getMain_change_photo());
        worcation.changeThema(request.getWorcation_thema());
        worcation.changeMaxPeople(request.getMax_people());
        worcation.changePartnerPrice(request.getPartner_price());
        worcation.changeNonPartnerPrice(request.getNon_partner_price());
        worcation.changeAddress(request.getWorcation_address());

        worcation.changeStatus(request.getStatus());
        // 연관 엔티티도 필요시 수정
        WorcationDetail detail = worcation.getWorcationDetail();
        if (detail != null) {
            detail.changeLicensee(request.getLicensee());
            detail.changeBusinessId(request.getBusiness_id());
            detail.changeWorcationTel(request.getWorcation_tel());
            detail.changeChargeAmount(request.getCharge_amount());
            detail.changeContent(request.getContent());
            detail.changeNavigate(request.getNavigate());
            detail.changeAvailableTime(request.getAvailable_time());
            detail.changeRefundPolicy(request.getRefund_policy());
            detail.changeOpenDate(request.getOpen_date());
        }
        WorcationFeatures features = worcation.getWorcationFeatures();
        if (features != null) {
            features.changeLocationType(request.getLocation_type());
            features.changeDominantColor(request.getDominant_color());
            features.changeSpaceMood(request.getSpace_mood());
            features.changeBestFor(request.getBest_for());
            features.changeActivities(request.getActivities());
            features.changeAccommodationType(request.getAccommodation_type());
        }
        // save 불필요 (더티체킹)
        return WorcationDto.Response.fromEntity(worcation, detail, features, List.of(), List.of(), List.of(),
                List.of());
    }

    @Override
    @Transactional
    public void delete(Long worcationNo) {
        worcationRepository.deleteById(worcationNo);
    }


    @Override
    @Transactional(readOnly = true)
    public List<WorcationListName> getWorcationListName(Long userNo) {
        // 최적화: 필요한 데이터만 조회
        List<Worcation> worcations = worcationRepository.findByMemberUserNoAndStatus(
                userNo, CommonEnums.Status.Y
        );

        return worcations.stream()
                .map(WorcationListName::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Page<WorcationReservation> getWorcationReservation(Long userNo, Pageable pageable) {
        LocalDate today = LocalDate.now(ZoneId.of("Asia/Seoul"));

        List<Long> worcationNos = worcationRepository.findIdsByWriter(userNo);
        if (worcationNos.isEmpty()) {
            return Page.empty(pageable);
        }

        Page<WorcationApplication> pageResult =
                worcationRepository.findByWorcationNosAndDate(worcationNos, today, pageable);

        List<WorcationReservation> dtoList = pageResult.getContent().stream()
                .map(wa -> {
                    Member member = wa.getMember();
                    Worcation worcation = wa.getWorcation();
                    CompanyProfile profile = member.getCompanyProfile();
                    Company company = profile.getCompany();

                    int age = Period.between(member.getBirthday(), today).getYears();
                    String dateRange = wa.getStartDate() + " ~ " + wa.getEndDate();

                    return WorcationReservation.toDto(worcation, member, age, company, profile, dateRange);
                })
                .toList();

        return new PageImpl<>(dtoList, pageable, pageResult.getTotalElements());
    }
    //s3
//    @Override
//    public String generatePresignedUrl(String fileName) {
//        Date expiration = new Date(System.currentTimeMillis() + 1000 * 60 * 10); // 10분 유효
//
//        GeneratePresignedUrlRequest request =
//                new GeneratePresignedUrlRequest("your-bucket-name", fileName)
//                        .withMethod(HttpMethod.PUT)
//                        .withExpiration(expiration);
//
//        return amazonS3.generatePresignedUrl(request).toString();
//    }


    public Map<String, List<WorcationDto.SimpleResponse>> getMyWorcations(Long userNo) {
        // 최적화: 한 번의 쿼리로 모든 데이터 조회
        List<Worcation> all = worcationRepository.findAllByUserNoWithAllDetails(userNo);

        List<WorcationDto.SimpleResponse> registered = all.stream()
                .filter(w -> w.getStatus() == CommonEnums.Status.Y)
                .map(WorcationDto.SimpleResponse::fromEntity)
                .toList();

        List<WorcationDto.SimpleResponse> unregistered = all.stream()
                .filter(w -> w.getStatus() == CommonEnums.Status.N)
                .map(WorcationDto.SimpleResponse::fromEntity)
                .toList();

        return Map.of(
                "registered", registered,
                "unregistered", unregistered
        );
    }

    @Override
    public String uploadWithoutWorcation(MultipartFile file) {
        String originalName = file.getOriginalFilename();
        String ext = originalName.substring(originalName.lastIndexOf("."));
        String uuid = UUID.randomUUID().toString();
        String changeName = uuid + ext;

        try {
            file.transferTo(new File(UPLOAD_DIR + changeName));
            return changeName; // 그냥 파일명만 반환
        } catch (IOException e) {
            throw new RuntimeException("파일 업로드 실패", e);
        }
    }


}
package com.minePing.BackEnd.repository;

import com.minePing.BackEnd.entity.Worcation;
import com.minePing.BackEnd.enums.CommonEnums;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WorcationRepository extends JpaRepository<Worcation, Long>, WorcationRepositoryV1  {
    
    // 워케이션과 관련된 모든 정보를 한 번에 조회
    @Query("SELECT w FROM Worcation w " +
           "LEFT JOIN FETCH w.worcationDetail " +
           "LEFT JOIN FETCH w.worcationFeatures " +
           "WHERE w.worcationNo = :worcationNo")
    Optional<Worcation> findByIdWithBasicDetails(@Param("worcationNo") Long worcationNo);
    
    // 모든 워케이션을 관련 정보와 함께 조회
    @Query("SELECT DISTINCT w FROM Worcation w " +
           "LEFT JOIN FETCH w.worcationDetail " +
           "LEFT JOIN FETCH w.worcationFeatures")
    List<Worcation> findAllWithBasicDetails();
    
    // 모든 워케이션을 모든 관련 정보와 함께 한 번에 조회 (N+1 문제 해결)
    @Query("SELECT DISTINCT w FROM Worcation w " +
           "LEFT JOIN FETCH w.worcationDetail " +
           "LEFT JOIN FETCH w.worcationFeatures " +
           "LEFT JOIN FETCH w.worcationAmenities wa " +
           "LEFT JOIN FETCH wa.amenity " +
           "LEFT JOIN FETCH w.photos " +
           "LEFT JOIN FETCH w.worcationPartners " +
           "LEFT JOIN FETCH w.worcationApplications wa2 " +
           "LEFT JOIN FETCH wa2.review")
    List<Worcation> findAllWithAllDetails();
    
    // 워케이션의 Amenities만 별도 조회
    @Query("SELECT w FROM Worcation w " +
           "LEFT JOIN FETCH w.worcationAmenities wa " +
           "LEFT JOIN FETCH wa.amenity " +
           "WHERE w.worcationNo = :worcationNo")
    Optional<Worcation> findByIdWithAmenities(@Param("worcationNo") Long worcationNo);
    
    // 워케이션의 Photos만 별도 조회
    @Query("SELECT w FROM Worcation w " +
           "LEFT JOIN FETCH w.photos " +
           "WHERE w.worcationNo = :worcationNo")
    Optional<Worcation> findByIdWithPhotos(@Param("worcationNo") Long worcationNo);
    
    // 워케이션의 Partners만 별도 조회
    @Query("SELECT w FROM Worcation w " +
           "LEFT JOIN FETCH w.worcationPartners " +
           "WHERE w.worcationNo = :worcationNo")
    Optional<Worcation> findByIdWithPartners(@Param("worcationNo") Long worcationNo);
    
    // 워케이션의 Applications만 별도 조회
    @Query("SELECT w FROM Worcation w " +
           "LEFT JOIN FETCH w.worcationApplications wa " +
           "LEFT JOIN FETCH wa.review " +
           "WHERE w.worcationNo = :worcationNo")
    Optional<Worcation> findByIdWithApplications(@Param("worcationNo") Long worcationNo);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT w FROM Worcation w WHERE w.worcationNo = :worcationNo")
    Optional<Worcation> findByIdForUpdate(@Param("worcationNo") Long worcationNo);




    List<Worcation> findByMember_UserNoAndStatus(Long userNo, CommonEnums.Status status);

    @Query("SELECT w FROM Worcation w WHERE w.member.userNo = :member")
    List<Worcation> findAllByRefWriter(@Param("member") Long member);

    @Query("SELECT w.worcationNo FROM Worcation w WHERE w.member.userNo = :userNo")
    List<Long> findIdsByWriter(@Param("userNo") Long userNo);

    // 임시저장: 사업자번호+status로 기존 워케이션 찾기
    @Query("SELECT w FROM Worcation w JOIN w.worcationDetail d WHERE d.businessId = :businessId AND w.status = :status")
    Optional<Worcation> findByBusinessIdAndStatus(@Param("businessId") String businessId, @Param("status") CommonEnums.Status status);

    // 최종등록: 사업자번호+status로 중복 존재 여부 체크
    @Query("SELECT COUNT(w) > 0 FROM Worcation w JOIN w.worcationDetail d WHERE d.businessId = :businessId AND w.status = :status")
    boolean existsByBusinessIdAndStatus(@Param("businessId") String businessId, @Param("status") CommonEnums.Status status);

    // 특정 사용자의 워케이션만 모든 관련 정보와 함께 조회 (최적화)
    @Query("SELECT DISTINCT w FROM Worcation w " +
           "LEFT JOIN FETCH w.worcationDetail " +
           "LEFT JOIN FETCH w.worcationFeatures " +
           "LEFT JOIN FETCH w.worcationAmenities wa " +
           "LEFT JOIN FETCH wa.amenity " +
           "LEFT JOIN FETCH w.photos " +
           "LEFT JOIN FETCH w.worcationPartners " +
           "LEFT JOIN FETCH w.worcationApplications wa2 " +
           "LEFT JOIN FETCH wa2.review " +
           "WHERE w.member.userNo = :userNo")
    List<Worcation> findAllByUserNoWithAllDetails(@Param("userNo") Long userNo);

    // 단일 워케이션을 모든 관련 정보와 함께 조회 (최적화)
    @Query("SELECT DISTINCT w FROM Worcation w " +
           "LEFT JOIN FETCH w.worcationDetail " +
           "LEFT JOIN FETCH w.worcationFeatures " +
           "LEFT JOIN FETCH w.worcationAmenities wa " +
           "LEFT JOIN FETCH wa.amenity " +
           "LEFT JOIN FETCH w.photos " +
           "LEFT JOIN FETCH w.worcationPartners " +
           "LEFT JOIN FETCH w.worcationApplications wa2 " +
           "LEFT JOIN FETCH wa2.review " +
           "WHERE w.worcationNo = :worcationNo")
    Optional<Worcation> findByIdWithAllDetails(@Param("worcationNo") Long worcationNo);

    // 워케이션 이름 목록 조회 (최적화)
    @Query("SELECT w FROM Worcation w " +
           "WHERE w.member.userNo = :userNo AND w.status = :status")
    List<Worcation> findByMemberUserNoAndStatus(@Param("userNo") Long userNo, @Param("status") CommonEnums.Status status);

}

package com.minePing.BackEnd.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Entity

@Table(
        name = "worcation_detail",
        uniqueConstraints = {
            @UniqueConstraint(name = "uk_worcation_no", columnNames = "worcation_no"),
            @UniqueConstraint(name = "uk_business_id", columnNames = "business_id"),
            @UniqueConstraint(name = "uk_worcation_tel", columnNames = "worcation_tel")
        }
)

public class WorcationDetail {

    @Id
    @Column(name = "worcation_no")
    private Long worcationNo;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY,optional = false)
    @JoinColumn(name = "worcation_no", nullable = false)
    private Worcation worcation;

    @Column(name="licensee", length=100, nullable = false)
    private String licensee;

    @Column(name="business_id", length=10, nullable = false, unique = true)
    private String businessId;

    @Column(name="worcation_tel", length=13, unique = true)
    private String worcationTel;

    @Column(name="charge_amount")
    private Integer chargeAmount;

    @Lob
    @Column(name="content")
    private String content;

    @Lob
    @Column(name="navigate")
    private String navigate;

    @Column(name="available_time", length=100)
    private String availableTime;

    @Lob
    @Column(name="refund_policy")
    private String refundPolicy;

    @Column(name="open_date", nullable = false)
    private LocalDate openDate;

    // changeXxx: setter 없이 값 변경을 위한 안전한 메서드 (MapStruct update 계열 미사용)
    public void changeLicensee(String licensee) { this.licensee = licensee; }
    public void changeBusinessId(String businessId) { this.businessId = businessId; }
    public void changeWorcationTel(String tel) { this.worcationTel = tel; }
    public void changeChargeAmount(Integer amount) { this.chargeAmount = amount; }
    public void changeContent(String content) { this.content = content; }
    public void changeNavigate(String navigate) { this.navigate = navigate; }
    public void changeAvailableTime(String time) { this.availableTime = time; }
    public void changeRefundPolicy(String policy) { this.refundPolicy = policy; }
    public void changeOpenDate(java.time.LocalDate date) { this.openDate = date; }
}

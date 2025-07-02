package com.minePing.BackEnd.entity;

import com.minePing.BackEnd.enums.CommonEnums;
import com.minePing.BackEnd.enums.CommonEnums.Approve;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Entity
@Table(name = "worcation_partner",
        indexes = {@Index(name = "idx_worcation_partner", columnList = "worcation_no")
                ,@Index(name = "idx_company_partner", columnList = "company_no")})
public class WorcationPartner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "partner_no")
    private Long partnerNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "worcation_no", nullable = false)
    private Worcation worcation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ref_writer_no", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_no", nullable = false)
    private Company company;

    @Column(name = "company_people", nullable = false)
    private Integer companyPeople;

    @Column(name = "start_date", nullable = false)
    private LocalDate startTime;

    @Column(name = "end_date", nullable = false)
    private LocalDate endTime;

    @Column(name = "approve", nullable = false)
    @Enumerated(EnumType.STRING)
    private CommonEnums.Approve approve;

    @Column(name = "create_at", nullable = false)
    private LocalDateTime createAt;

    @UpdateTimestamp
    @Column(name = "update_at", nullable = false)
    private LocalDateTime updateAt;

    @PrePersist
    protected void onCreate() {
        this.createAt = LocalDateTime.now();
        if(this.approve == null) {
            this.approve = Approve.W;
        }
    }
}

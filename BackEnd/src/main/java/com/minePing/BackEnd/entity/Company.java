package com.minePing.BackEnd.entity;

import com.minePing.BackEnd.dto.MemberDto;
import com.minePing.BackEnd.enums.CommonEnums;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Entity

@Table(
        name ="company",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_business_id", columnNames = "business_id"),
                @UniqueConstraint(name = "uk_business_email", columnNames = "business_email"),
                @UniqueConstraint(name = "uk_company_tel", columnNames = "company_tel"),
                @UniqueConstraint(name = "uk_chief_user_no", columnNames = "chief_user_no")
        }
)

public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "company_no")
    private Long companyNo;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chief_user_no", nullable = false, unique = true)
    private Member member;

    @Column(name = "company_name", nullable = false, length = 150)
    private String companyName;

    @Column(name = "business_id", nullable = false, length = 10, unique = true)
    private String businessId;

    @Column(name = "licensee", nullable = false, length = 20)
    private String licensee;

    @Column(name = "open_date", nullable = false)
    private LocalDate openDate;

    @Column(name="company_address",nullable = false)
    private String companyAddress;

    @Column(name="business_email",nullable = false, length = 100, unique = true)
    private String businessEmail;

    @Column(name="company_tel",nullable = false, length = 13, unique = true)
    private String companyTel;

    @Column(name="status",nullable = false)
    @Enumerated(EnumType.STRING)
    private CommonEnums.Status status;

    @Column(name = "create_at", nullable = false)
    private LocalDateTime createAt;

    @Column(name = "update_at", nullable = false)
    private LocalDateTime updateAt;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<WorcationPartner> worcationPartners = new ArrayList<>();

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<CompanyProfile> companyProfiles = new ArrayList<>();

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Department> departments = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        createAt = LocalDateTime.now();
        updateAt = LocalDateTime.now();
        if(this.status == null) {
            this.status = CommonEnums.Status.Y;
        }
    }

    public void changeMember(Member member) {
        this.member = member;
        member.assignCompany(this);
    }

    @PreUpdate
    protected void onUpdate() {
        updateAt = LocalDateTime.now();
    }

    public void updateThis(MemberDto.Update updateDto){
        this.companyName = updateDto.getCompany_update().getCompany_name();
        this.companyAddress = updateDto.getCompany_update().getCompany_address();
        this.businessEmail = updateDto.getCompany_update().getBusiness_email();
        this.companyTel = updateDto.getCompany_update().getCompany_tel();
    }
}

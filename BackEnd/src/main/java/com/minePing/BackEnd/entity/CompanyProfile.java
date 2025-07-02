package com.minePing.BackEnd.entity;

import com.minePing.BackEnd.enums.CommonEnums;
import com.minePing.BackEnd.enums.CommonEnums.Approve;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.hibernate.annotations.ColumnDefault;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Entity
@Table(
        name = "company_profile",
        indexes = { @Index(name = "idx_company", columnList = "company_no") },
        uniqueConstraints = {
            @UniqueConstraint(name = "uk_user_no", columnNames = "user_no"),
            @UniqueConstraint(name = "uk_company_phone", columnNames = "company_phone"),
            @UniqueConstraint(name = "uk_company_email", columnNames = "company_email")
        }
)

public class CompanyProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "profile_no")
    private Long profileNo;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_no", nullable = false, unique = true)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_no", nullable = false)
    private Company company;

    @Column(name = "department_name", nullable = false, length = 50)
    private String departmentName;

    @Column(name = "position", nullable = false, length = 30)
    private String position;

    @Column(name = "company_phone", nullable = false, length = 13, unique = true)
    private String companyPhone;

    @Column(name = "company_email", nullable = false, length = 100, unique = true)
    private String companyEmail;

    @Column(name = "approve", nullable = false)
    @Enumerated(EnumType.STRING)
    private CommonEnums.Approve approve;

    @PrePersist
    protected void onCreate() {
        if (approve == null) {
            approve = CommonEnums.Approve.W;
        }
    }

    public void changeMember(Member member) {
        this.member = member;
        member.assignCompanyProfile(this);
    }

    public void changeCompany(Company company){
        this.company = company;
        if(!company.getCompanyProfiles().contains(this)){
            company.getCompanyProfiles().add(this);
        }
    }

}

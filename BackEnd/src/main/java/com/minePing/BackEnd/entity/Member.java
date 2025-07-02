package com.minePing.BackEnd.entity;

import com.minePing.BackEnd.enums.CommonEnums;
import com.minePing.BackEnd.enums.CommonEnums.Role;
import com.minePing.BackEnd.enums.SocialType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
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
        name = "member",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_user_id", columnNames = "user_id"),
                @UniqueConstraint(name = "uk_email", columnNames = "email"),
                @UniqueConstraint(name = "uk_phone", columnNames = "phone")
        }
)

public class Member {
    @Id // PK
    @GeneratedValue(strategy = GenerationType.IDENTITY) // pk값 자동생성(AUTO_INCREMENT방식)
    @Column(name = "user_no") // DB컬럼명 지정
    private Long userNo;

    @Column(name = "user_id", nullable = false, length = 50, unique = true)
    private String userId;

    @Column(name = "user_pwd", nullable = false)
    private String userPwd;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "email", nullable = false, length = 100, unique = true)
    private String email;

    @Column(name = "gender", nullable = false)
    @Enumerated(EnumType.STRING)
    private CommonEnums.Gender gender;

    @Column(name = "birthday", nullable = false)
    private LocalDate birthday;

    @Column(name = "address", nullable = false, length = 100)
    private String address;

    @Column(name = "phone", nullable = false, length = 13, unique = true)
    private String phone;

    @Enumerated(EnumType.STRING)
    private SocialType socialType;

    private String socialId;

    @Column(name = "role", nullable = false)
    @Enumerated(EnumType.STRING)
    private CommonEnums.Role role;

    @Column(name = "create_at", nullable = false)
    private LocalDateTime createAt;

    @UpdateTimestamp
    @Column(name = "update_at", nullable = false)
    private Timestamp updateAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private CommonEnums.Status status;

    @OneToMany(mappedBy = "member", orphanRemoval = false)
    @Builder.Default
    private List<WorcationPartner> worcationPartners = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<WorcationApplication> worcationApplications = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = { CascadeType.PERSIST, CascadeType.MERGE }, orphanRemoval = false)
    @Builder.Default
    private List<Worcation> worcations = new ArrayList<>();

    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private Health health;

    public void assignHealth(Health health) {
        this.health = health;
    }

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Mental> mentals = new ArrayList<>();

    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private MemberPreference memberPreferences;

    public void assignMemberPreference(MemberPreference memberPreferences) {
        this.memberPreferences = memberPreferences;
    }

    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private CompanyProfile companyProfile;

    public void assignCompanyProfile(CompanyProfile companyProfile) {
        this.companyProfile = companyProfile;
    }

    @PrePersist
    protected void onCreate() {
        this.createAt = LocalDateTime.now();

        if (this.status == null) {
            this.status = CommonEnums.Status.Y;
        }

        if (this.role == null) {
            this.role = Role.EMPLOYEE;
        }
    }

}

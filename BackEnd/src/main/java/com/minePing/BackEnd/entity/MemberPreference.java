package com.minePing.BackEnd.entity;

import com.minePing.BackEnd.enums.CommonEnums;
import com.minePing.BackEnd.enums.PreferenceEnums;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Entity

@Table(
        name = "member_preference",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_user_no", columnNames = "user_no")
        }
)

public class MemberPreference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "preference_no")
    private Long preferenceNo;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_no", nullable = false, unique = true)
    private Member member;

    @Enumerated(EnumType.STRING)
    @Column(name = "mbti")
    private PreferenceEnums.Mbti mbti;

    @Enumerated(EnumType.STRING)
    @Column(name="preferenced_color", nullable = false)
    private PreferenceEnums.PreferredColor preferencedColor;

    @Enumerated(EnumType.STRING)
    @Column(name="preferenced_location", nullable = false)
    private PreferenceEnums.PreferredLocation preferencedLocation;

    @Enumerated(EnumType.STRING)
    @Column(name = "space_mood", nullable = false)
    private PreferenceEnums.SpaceMood spaceMood;

    @Enumerated(EnumType.STRING)
    @Column(name="important_factor", nullable = false)
    private PreferenceEnums.ImportantFactor importantFactor;

    @Enumerated(EnumType.STRING)
    @Column(name="leisure_activity", nullable = false)
    private PreferenceEnums.LeisureActivity leisureActivity;

    @Enumerated(EnumType.STRING)
    @Column(name="accommodation_type", nullable = false)
    private PreferenceEnums.AccommodationType accommodationType;

    @Column(name = "update_date", nullable = false)
    private LocalDate updateDate;

    @Column(name ="result_content", nullable = false, length = 512)
    private String resultContent;

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        this.updateDate = LocalDate.now();
    }
}

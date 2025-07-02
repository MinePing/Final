package com.minePing.BackEnd.entity;

import com.minePing.BackEnd.enums.WorcationEnums;
import jakarta.persistence.*;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Entity

@Table(
        name = "worcation_features",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_worcation_no", columnNames = "worcation_no"),
        }
)

public class WorcationFeatures {

    @Id
    @Column(name = "worcation_no")
    private Long worcationNo;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY,optional = false)
    @JoinColumn(name = "worcation_no", nullable = false, unique = true)
    private Worcation worcation;

    @Column(name = "location_type")
    @Enumerated(EnumType.STRING)
    private WorcationEnums.LocationType locationType;

    @Column(name = "dominant_color")
    @Enumerated(EnumType.STRING)
    private WorcationEnums.DominantColor dominantColor;

    @Column(name = "space_mood")
    @Enumerated(EnumType.STRING)
    private WorcationEnums.SpaceMood spaceMood;

    @Column(name = "best_for")
    @Enumerated(EnumType.STRING)
    private WorcationEnums.BestFor bestFor;

    @Lob
    @Column(name = "activities")
    private String activities;

    @Column(name = "accommodation_type")
    @Enumerated(EnumType.STRING)
    private WorcationEnums.AccommodationType accommodationType;

    // changeXxx: setter 없이 값 변경을 위한 안전한 메서드 (MapStruct update 계열 미사용)
    public void changeLocationType(WorcationEnums.LocationType type) { this.locationType = type; }
    public void changeDominantColor(WorcationEnums.DominantColor color) { this.dominantColor = color; }
    public void changeSpaceMood(WorcationEnums.SpaceMood mood) { this.spaceMood = mood; }
    public void changeBestFor(WorcationEnums.BestFor bestFor) { this.bestFor = bestFor; }
    public void changeActivities(String activities) { this.activities = activities; }
    public void changeAccommodationType(WorcationEnums.AccommodationType type) { this.accommodationType = type; }
}

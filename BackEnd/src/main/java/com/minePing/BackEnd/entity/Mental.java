package com.minePing.BackEnd.entity;

import com.minePing.BackEnd.enums.CommonEnums;
import com.minePing.BackEnd.enums.MentalEnums;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Entity
@Table(name = "mental", indexes = {@Index(name = "idx_member_application", columnList = "user_no")})
public class Mental {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mental_no")
    private Long mentalNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_no", nullable = false)
    private Member member;

    @Column(name = "score", nullable = false)
    private Integer score;

    @Enumerated(EnumType.STRING)
    @Column(name="psychological_state", nullable = false)
    private MentalEnums.PsychologicalState psychologicalState;

    @Column(name = "result_content", nullable = false, length = 512)
    private String resultContent;

    @Column(name = "separation")
    @Enumerated(EnumType.STRING)
    private MentalEnums.Separation separation;

    @Column(name="update_date")
    private LocalDate updateDate;

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        this.updateDate = LocalDate.now();
    }
}

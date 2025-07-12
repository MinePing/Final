package com.minePing.BackEnd.entity;

import com.minePing.BackEnd.enums.CommonEnums;
import com.minePing.BackEnd.enums.WorcationEnums;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Entity
public class Worcation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "worcation_no")
        private Long worcationNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="ref_writer", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ref_area_id")
    private SiggAreas siggAreas;

    @Column(name = "worcation_name",nullable = false,length = 50)
    private String worcationName;

    @Column(name = "worcation_category",nullable = false)
    @Enumerated(EnumType.STRING)
    private WorcationEnums.Category worcationCategory;

    @Column(name = "main_change_photo",length = 100)
    private String mainChangePhoto;

    @Column(name = "worcation_thema",length = 20)
    private String worcationThema;

    @Column(name = "max_people")
    private Integer maxPeople;

    @Column(name = "partner_price")
    private String partnerPrice;

    @Lob
    @Column(name = "non_partner_price")
    private Integer nonPartnerPrice;

    @Column(name = "worcation_address",length = 100)
    private String worcationAddress;

    @Column(name = "update_at",nullable = false)
    private LocalDateTime updateAt;

    @Column(name = "create_at",nullable = false)
    private LocalDateTime createAt;

    @Column(name = "status",nullable = false)
    @Enumerated(EnumType.STRING)
    private CommonEnums.Status status;

    @OneToMany(mappedBy = "worcation", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<WorcationAmenity> worcationAmenities = new HashSet<>();

    @OneToMany(mappedBy = "worcation", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<Photo> photos = new HashSet<>();

    @OneToMany(mappedBy = "worcation", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<WorcationApplication> worcationApplications = new HashSet<>();

    @OneToMany(mappedBy = "worcation", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<WorcationPartner> worcationPartners = new HashSet<>();

    @OneToOne(mappedBy = "worcation", cascade = CascadeType.ALL, orphanRemoval = true)
    private WorcationDetail worcationDetail;

    @OneToOne(mappedBy = "worcation", cascade = CascadeType.ALL, orphanRemoval = true)
    private WorcationFeatures worcationFeatures;

    @PrePersist
    protected void onCreate() {
        this.createAt = LocalDateTime.now();
        this.updateAt = LocalDateTime.now();
        if(status == null){
            status = CommonEnums.Status.N;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updateAt = LocalDateTime.now();
    }

    public void changeName(String name) {
        if (name == null || name.isBlank()) throw new IllegalArgumentException("이름은 필수입니다.");
        this.worcationName = name;
    }
    public void changeCategory(WorcationEnums.Category category) {
        if (category == null) throw new IllegalArgumentException("카테고리는 필수입니다.");
        this.worcationCategory = category;
    }
    public void changeMainPhoto(String photo) { this.mainChangePhoto = photo; }
    public void changeThema(String thema) { this.worcationThema = thema; }
    public void changeMaxPeople(Integer maxPeople) { this.maxPeople = maxPeople; }
    public void changePartnerPrice(String price) { this.partnerPrice = price; }
    public void changeNonPartnerPrice(Integer price) { this.nonPartnerPrice = price; }
    public void changeAddress(String address) { this.worcationAddress = address; }
    public void changeStatus(CommonEnums.Status status) {this.status = status;}
    public void assignDetail(WorcationDetail detail) {
        this.worcationDetail = detail;
    }
    public void assignFeatures(WorcationFeatures features) {
        this.worcationFeatures = features;
    }
    public Worcation changeMember(Member member) {
        this.member = member;
        return this;
    }
    public class Response {
    }
}

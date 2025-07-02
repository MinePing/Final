package com.minePing.BackEnd.dto;

import com.minePing.BackEnd.enums.CommonEnums;
import com.minePing.BackEnd.enums.WorcationEnums;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class WorcationDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Request {
        //Worcation
        private String worcation_name;
        private WorcationEnums.Category worcation_category;
        private String main_change_photo;
        private String worcation_thema;
        private Integer max_people;
        private String partner_price;
        private Integer non_partner_price;
        private String worcation_address;
        private Long member_id;
        private Long area_id;

        // Detail
        private String licensee;
        private String business_id;
        private String worcation_tel;
        private Integer charge_amount;
        private String content;
        private String navigate;
        private String available_time;
        private String refund_policy;
        private LocalDate open_date;

        // Features
        private WorcationEnums.LocationType location_type;
        private WorcationEnums.DominantColor dominant_color;
        private WorcationEnums.SpaceMood space_mood;
        private WorcationEnums.BestFor best_for;
        private String activities;
        private WorcationEnums.AccommodationType accommodation_type;

        private List<String> amenities;
        private List<String> photo_urls;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class PartnerResponse {
        private Long partner_no;
        private Long worcation_no;
        private Long member_no;
        private Long company_no;
        private Integer company_people;
        private LocalDate start_time;
        private LocalDate end_time;
        private com.minePing.BackEnd.enums.CommonEnums.Approve approve;
        private LocalDateTime create_at;
        private LocalDateTime update_at;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ReviewResponse {
        private Long review_no;
        private Long application_no;
        private String writer_id;
        private String review_content;
        private java.time.LocalDateTime create_at;
        private java.time.LocalDateTime update_at;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {
        //Worcation
        private Long worcation_no;
        private String worcation_name;
        private WorcationEnums.Category worcation_category;
        private String main_change_photo;
        private String worcation_thema;
        private Integer max_people;
        private String partner_price;
        private Integer non_partner_price;
        private String worcation_address;
        private LocalDateTime update_at;
        private LocalDateTime create_at;
        private CommonEnums.Status status;

        private Long member_id;
        private Long area_id;

        // Detail
        private String licensee;
        private String business_id;
        private String worcation_tel;
        private Integer charge_amount;
        private String content;
        private String navigate;
        private String available_time;
        private String refund_policy;
        private LocalDate open_date;

        // Features
        private WorcationEnums.LocationType location_type;
        private WorcationEnums.DominantColor dominant_color;
        private WorcationEnums.SpaceMood space_mood;
        private WorcationEnums.BestFor best_for;
        private String activities;
        private WorcationEnums.AccommodationType accommodation_type;

        private List<String> amenities;
        private List<String> photo_urls;

        private List<PartnerResponse> partners;
        private List<ReviewResponse> reviews;
    }
}

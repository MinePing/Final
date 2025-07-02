package com.minePing.BackEnd.dto;

import com.minePing.BackEnd.entity.*;
import com.minePing.BackEnd.enums.CommonEnums;
import jakarta.persistence.*;
import java.time.Period;

import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class MemberDto {
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @ToString
    public static class MemberJoinDto {
        @NotBlank(message = "아이디는 필수입니다.")
        private String user_id;

        @NotBlank(message = "비밀번호는 필수입니다.")
        @Pattern(
                regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
                message = "비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다."
        )
        private String user_pwd;

        @NotBlank(message = "이름은 필수입니다.")
        private String name;

        @NotNull(message = "성별 설정은 필수입니다.")
        private CommonEnums.Gender gender;

        @NotNull(message = "권한 설정은 필수입니다.")
        private CommonEnums.Role role;

        @NotBlank(message = "주소는 필수입니다.")
        private String address;

        @NotNull(message = "생년월일은 필수입니다.")
        @Past(message = "생년월일은 과거 날짜여야 합니다.")
        private LocalDate birthday;

        @NotBlank(message = "이메일은 필수입니다.")
        @Email(message = "올바른 이메일 형식이 아닙니다.")
        private String email;

        @NotBlank(message = "전화번호는 필수입니다.")
        @Pattern(regexp = "^010-[0-9]{4}-[0-9]{4}$", message = "올바른 전화번호 형식이 아닙니다.(010-xxxx-xxxx)")
        private String phone;
    }


    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @ToString
    public static class EmployeeJoin {

        private MemberJoinDto memberJoinDto;
        private CompanyProfileDto.CompanyProfileJoinDto companyProfileJoinDto;

        public CompanyProfile toCompanyProfileEntity() {
            return CompanyProfile.builder()
                    .departmentName(this.companyProfileJoinDto.getDepartment_name())
                    .position(this.companyProfileJoinDto.getPosition())
                    .companyPhone(this.companyProfileJoinDto.getCompany_phone())
                    .companyEmail(this.companyProfileJoinDto.getCompany_email())
                    .build();
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class MasterJoin {

        private MemberJoinDto memberJoinDto;
        private CompanyDto.CompanyJoinDto companyJoinDto;

        public Company toCompanyEntity() {
            return Company.builder()
                    .companyName(this.companyJoinDto.getCompany_name())
                    .companyAddress(this.companyJoinDto.getCompany_address())
                    .businessId(this.companyJoinDto.getBusiness_id())
                    .businessEmail(this.companyJoinDto.getBusiness_email())
                    .licensee(this.companyJoinDto.getLicensee())
                    .companyTel(this.companyJoinDto.getCompany_tel())
                    .openDate(this.companyJoinDto.getOpen_date())
                    .build();
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @ToString
    public static class WorcationJoin {

        private MemberJoinDto memberJoinDto;

    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @ToString
    public static class Login {
        private String user_id;
        private String user_pwd;
    }


    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @ToString
    public static class LoginResponse {
        private String user_id;
        private CommonEnums.Role role;

        public static LoginResponse toDto(Member member) {
            return LoginResponse.builder()
                    .user_id(member.getUserId())
                    .role(member.getRole())
                    .build();
        }
    }


    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @ToString
    public static class InfoResponse {
        private Long user_no;
        private String user_id;
        private String user_name;
        private Long company_no;
        private CommonEnums.Role role;

        public static InfoResponse toMemberDto(Member member) {
            return InfoResponse.builder()
                    .user_no(member.getUserNo())
                    .user_id(member.getUserId())
                    .user_name(member.getName())
                    .role(member.getRole())
                    .build();
        }

        public static InfoResponse toCompanyDto(Company company) {
            return InfoResponse.builder()
                    .company_no(company.getCompanyNo())
                    .build();
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class KakaoLogin{
        private String code;
    }
}

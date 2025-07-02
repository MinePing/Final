package com.minePing.BackEnd.dto;

import com.minePing.BackEnd.entity.CompanyProfile;
import com.minePing.BackEnd.entity.Member;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;

public class CompanyProfileDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @ToString
    public static class CompanyProfileJoinDto {

        @NotBlank(message = "회사 선택은 필수입니다.")
        private Long company_no;

        @NotBlank(message = "부서 설정은 필수입니다.")
        private String department_name;

        @NotBlank(message = "직급 설정은 필수입니다.")
        private String position;

        @NotBlank(message = "회사 전용 이메일은 필수입니다.")
        @Email(message = "올바른 이메일 형식이 아닙니다.")
        private String company_email;

        @NotBlank(message = "회사 전용 번호는 필수입니다.")
        @Pattern(regexp = "^010-[0-9]{4}-[0-9]{4}$", message = "올바른 전화번호 형식이 아닙니다.(010-xxxx-xxxx)")
        private String company_phone;
    }


    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response {

        private String department_name; // 부서명
        private String position; // 직급
        private String name; // 이름
        private String gender; // 성별 (Enum -> String)
        private int age; // 생년월일 -> 나이 계산
        private String role; // 역할 (Enum -> String)
        private String company_email; // 회사 이메일 아님
        private String work_status; // 근무 상태 (외부 전달 값)

        public static Response toDto(Member member, String workStatus, int age) {
            CompanyProfile profile = member.getCompanyProfile();

            return Response.builder()
                    .department_name(profile.getDepartmentName())
                    .position(profile.getPosition())
                    .name(member.getName())
                    .gender(member.getGender().name())
                    .age(age)
                    .role(member.getRole().name())
                    .company_email(profile.getCompanyEmail())
                    .work_status(workStatus)
                    .build();
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Approval {
        private String department_name;
        private String position;
        private String name;
        private String gender;
        private int age;
        private String role;
        private String company_email;
        private String approve;

        public static Approval toDto(Member member, int age) {
            CompanyProfile profile = member.getCompanyProfile();

            return Approval.builder()
                    .department_name(profile.getDepartmentName())
                    .position(profile.getPosition())
                    .name(member.getName())
                    .gender(member.getGender().name())
                    .age(age)
                    .role(member.getRole().name())
                    .company_email(profile.getCompanyEmail())
                    .approve(profile.getApprove().name())
                    .build();
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Consult {
        private String department_name;
        private String position;
        private String name;
        private String gender;
        private int age;
        private String company_email;
        private String work_status;
        private String PSYCHOLOGICAL_STATE;

        public static Consult toDto(Member member,String workStatus,int age, String psychologicalState) {
            CompanyProfile profile = member.getCompanyProfile();

            return Consult.builder()
                    .department_name(profile.getDepartmentName())
                    .position(profile.getPosition())
                    .name(member.getName())
                    .gender(member.getGender().name())
                    .age(age)
                    .company_email(profile.getCompanyEmail())
                    .work_status(workStatus)
                    .PSYCHOLOGICAL_STATE(psychologicalState)
                    .build();

        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Applies {
        private String department_name;
        private String position;
        private String name;
        private String gender;
        private int age;
        private String company_email;
        private String worcation_date;
        private String worcation_place;

        public static Applies toDto(Member member, String worcationDate, int age, String worcationPlace) {
            CompanyProfile profile = member.getCompanyProfile();

            return Applies.builder()
                    .department_name(profile.getDepartmentName())
                    .position(profile.getPosition())
                    .name(member.getName())
                    .gender(member.getGender().name())
                    .age(age)
                    .company_email(profile.getCompanyEmail())
                    .worcation_date(worcationDate)
                    .worcation_place(worcationPlace)
                    .build();
        }

    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Employees {
        private int totalEmployees;
        private int worcationEmployees;
        private int currentEmployees;

        public static Employees toDto(int totalEmployees, int worcationEmployees, int currentEmployees) {
            return Employees.builder()
                    .totalEmployees(totalEmployees)
                    .worcationEmployees(worcationEmployees)
                    .currentEmployees(currentEmployees)
                    .build();
        }
    }

}
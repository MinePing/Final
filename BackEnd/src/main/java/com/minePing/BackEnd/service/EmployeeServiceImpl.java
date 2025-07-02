package com.minePing.BackEnd.service;

import com.minePing.BackEnd.dto.CompanyProfileDto;
import com.minePing.BackEnd.dto.CompanyProfileDto.Applies;
import com.minePing.BackEnd.dto.CompanyProfileDto.Employees;
import com.minePing.BackEnd.entity.Member;
import com.minePing.BackEnd.enums.MentalEnums;
import com.minePing.BackEnd.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Override
    public List<CompanyProfileDto.Response> findAllMember(Long companyNo) {
        LocalDate today = LocalDate.now();

        return employeeRepository.findAllByCompanyNo(companyNo).stream()
                .map(profile -> {
                    Member member = profile.getMember();

                    String workStatus = member.getWorcationApplications().stream()
                            .anyMatch(app -> !today.isBefore(app.getStartDate()) && !today.isAfter(app.getEndDate()))
                            ? "워케이션 중" : "근무 중";
                    int age = Period.between(member.getBirthday(), today).getYears();
                    return CompanyProfileDto.Response.toDto(member, workStatus, age);
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<CompanyProfileDto.Approval> findgetApprovalList(Long companyNo) {
        LocalDate today = LocalDate.now();

        return employeeRepository.findAllApprovalByCompanyNoAndApproveN(companyNo).stream()
                .map(profile -> {
                    Member member = profile.getMember();
                    int age = Period.between(member.getBirthday(), today).getYears();
                    return CompanyProfileDto.Approval.toDto(member, age);
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<CompanyProfileDto.Consult> findConsultList(Long companyNo) {
        LocalDate today = LocalDate.now();

        return employeeRepository.findAllConsultByCompanyNo(companyNo).stream()
                .map(profile -> {
                    Member member = profile.getMember();

                    String workStatus = member.getWorcationApplications().stream()
                            .anyMatch(app -> !today.isBefore(app.getStartDate()) && !today.isAfter(app.getEndDate()))
                            ? "워케이션 중" : "근무 중";

                    int age = Period.between(member.getBirthday(), today).getYears();

                    String psychologicalState = member.getMentals().stream()
                            .filter(m -> m.getPsychologicalState() == MentalEnums.PsychologicalState.Severe
                                    || m.getPsychologicalState() == MentalEnums.PsychologicalState.Critical)
                            .map(m -> m.getPsychologicalState().name())
                            .findFirst()
                            .orElse("Unknown");

                    return CompanyProfileDto.Consult.toDto(member, workStatus, age, psychologicalState);
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<Applies> findWorcationAppliesList(Long companyNo) {
        LocalDate today = LocalDate.now();

        return employeeRepository.findallWorcationAppliesByCompanyNo(companyNo).stream()
                .flatMap(profile -> {
                    Member member = profile.getMember();
                    int age = Period.between(member.getBirthday(), today).getYears();

                    return member.getWorcationApplications().stream()
                            .map(application -> {
                                String worcationDate = application.getStartDate() + " ~ " + application.getEndDate();
                                String worcationPlace = application.getWorcation().getWorcationName();

                                return Applies.toDto(member, worcationDate, age, worcationPlace);
                            });
                })
                .collect(Collectors.toList());
    }

    @Override
    public Employees findEmployeesNumber(Long companyNo) {
        LocalDate today = LocalDate.now();

        // 1. 전체 인원 수
        int total = employeeRepository.findAllByCompanyNo(companyNo).size();

        // 2. 오늘 기준 워케이션 중인 인원 수 (레포지토리에서 카운트 메서드 사용)
        int worcation = employeeRepository.countWorcationInProgressByCompanyNo(companyNo, today);

        // 3. 현재 근무 중 인원
        int current = total - worcation;

        return Employees.toDto(total, worcation, current);
    }
}

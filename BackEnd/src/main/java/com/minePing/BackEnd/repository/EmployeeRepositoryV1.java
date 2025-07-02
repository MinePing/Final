package com.minePing.BackEnd.repository;


import com.minePing.BackEnd.entity.CompanyProfile;
import java.util.List;


public interface EmployeeRepositoryV1 {
    List<CompanyProfile> findAllByCompanyNo(Long companyNo);
    List<CompanyProfile> findAllApprovalByCompanyNoAndApproveN(Long companyNo);
    List<CompanyProfile> findAllConsultByCompanyNo(Long companyNo);
    List<CompanyProfile> findallWorcationAppliesByCompanyNo(Long companyNo);
    int countWorcationInProgressByCompanyNo(Long companyNo, java.time.LocalDate today);
}

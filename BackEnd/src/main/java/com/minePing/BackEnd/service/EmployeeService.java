package com.minePing.BackEnd.service;

import com.minePing.BackEnd.dto.CompanyProfileDto;
import java.util.List;


public interface EmployeeService {

    List<CompanyProfileDto.Response> findAllMember(Long companyNo);

    List<CompanyProfileDto.Approval> findgetApprovalList(Long companyNo);

    List<CompanyProfileDto.Consult> findConsultList(Long companyNo);

    List<CompanyProfileDto.Applies> findWorcationAppliesList(Long companyNo);

    CompanyProfileDto.Employees findEmployeesNumber(Long companyNo);
}

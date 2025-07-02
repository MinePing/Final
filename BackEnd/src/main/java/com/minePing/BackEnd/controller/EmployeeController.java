package com.minePing.BackEnd.controller;

import com.minePing.BackEnd.dto.CompanyProfileDto;
import com.minePing.BackEnd.service.EmployeeService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/employee")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping("/list/{companyNo}")
    public ResponseEntity<List<CompanyProfileDto.Response>> getAllMembers(@PathVariable Long companyNo) {

        return ResponseEntity.ok(employeeService.findAllMember(companyNo));
    }

    @GetMapping("/applies/{companyNo}")
    public ResponseEntity<List<CompanyProfileDto.Approval>> getApprovalList(@PathVariable Long companyNo){

        return ResponseEntity.ok(employeeService.findgetApprovalList(companyNo));
    }

    @GetMapping("/needs-consult/{companyNo}")
    public ResponseEntity<List<CompanyProfileDto.Consult>> getNeedsConsult(@PathVariable Long companyNo){
        return ResponseEntity.ok(employeeService.findConsultList(companyNo));
    }

    @GetMapping("/worcation-applies/{companyNo}")
    public ResponseEntity<List<CompanyProfileDto.Applies>> getWorcationApplies(@PathVariable Long companyNo){
        return ResponseEntity.ok(employeeService.findWorcationAppliesList(companyNo));
    }

    @GetMapping("/employees-summary/{companyNo}")
    public ResponseEntity<CompanyProfileDto.Employees> getEmployeesNumber(@PathVariable Long companyNo){
        return ResponseEntity.ok(employeeService.findEmployeesNumber(companyNo));
    }
}

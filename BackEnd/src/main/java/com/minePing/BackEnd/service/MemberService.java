package com.minePing.BackEnd.service;


import com.minePing.BackEnd.dto.MemberDto;
import com.minePing.BackEnd.entity.Member;
import com.minePing.BackEnd.enums.SocialType;

public interface MemberService {
    void createEmployeeMember(MemberDto.EmployeeJoin employeeJoinDto);
    void createMasterMember(MemberDto.MasterJoin masterJoinDto);
    void createWorcationMember(MemberDto.WorcationJoin worcationJoinDto);
    MemberDto.LoginResponse login(MemberDto.Login loginDto);
    MemberDto.InfoResponse getUserInfoByUserId(String userId);
    MemberDto.LoginResponse getMemberBySocialId(String socialId);
    Member createOauth(String socialId, String email, String name, SocialType socialType);
}

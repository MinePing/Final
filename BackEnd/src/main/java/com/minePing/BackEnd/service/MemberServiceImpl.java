package com.minePing.BackEnd.service;

import com.minePing.BackEnd.dto.MemberDto;
import com.minePing.BackEnd.dto.MemberDto.EmployeeJoin;
import com.minePing.BackEnd.dto.MemberDto.InfoResponse;
import com.minePing.BackEnd.dto.MemberDto.Login;
import com.minePing.BackEnd.dto.MemberDto.LoginResponse;
import com.minePing.BackEnd.dto.MemberDto.MasterJoin;
import com.minePing.BackEnd.dto.MemberDto.WorcationJoin;
import com.minePing.BackEnd.entity.Company;
import com.minePing.BackEnd.entity.CompanyProfile;
import com.minePing.BackEnd.entity.Member;
import com.minePing.BackEnd.enums.CommonEnums;
import com.minePing.BackEnd.enums.CommonEnums.Role;
import com.minePing.BackEnd.enums.SocialType;
import com.minePing.BackEnd.exception.CompanyNotFoundException;
import com.minePing.BackEnd.exception.UserNotFoundException;
import com.minePing.BackEnd.repository.CompanyProfileRepository;
import com.minePing.BackEnd.repository.CompanyRepository;
import com.minePing.BackEnd.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.UnknownServiceException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final CompanyProfileRepository companyProfileRepository;
    private final CompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    @Transactional
    public void createEmployeeMember(EmployeeJoin employeeJoinDto) {
        Member member = Member.builder()
                .userId(employeeJoinDto.getMemberJoinDto().getUser_id())
                .userPwd(passwordEncoder.encode(employeeJoinDto.getMemberJoinDto().getUser_pwd()))
                .name(employeeJoinDto.getMemberJoinDto().getName())
                .gender(employeeJoinDto.getMemberJoinDto().getGender())
                .address(employeeJoinDto.getMemberJoinDto().getAddress())
                .birthday(employeeJoinDto.getMemberJoinDto().getBirthday())
                .email(employeeJoinDto.getMemberJoinDto().getEmail())
                .phone(employeeJoinDto.getMemberJoinDto().getPhone())
                .role(employeeJoinDto.getMemberJoinDto().getRole())
                .build();

        memberRepository.save(member);

        CompanyProfile companyProfile = employeeJoinDto.toCompanyProfileEntity();

        companyProfile.changeMember(member);

        Company company = companyRepository.findById(employeeJoinDto.getCompanyProfileJoinDto().getCompany_no())
                .orElseThrow(() -> new CompanyNotFoundException());

        companyProfile.changeCompany(company);

        companyProfileRepository.save(companyProfile);
    }

    @Override
    @Transactional
    public void createMasterMember(MasterJoin masterJoinDto) {
        Member member = Member.builder()
                .userId(masterJoinDto.getMemberJoinDto().getUser_id())
                .userPwd(passwordEncoder.encode(masterJoinDto.getMemberJoinDto().getUser_pwd()))
                .name(masterJoinDto.getMemberJoinDto().getName())
                .gender(masterJoinDto.getMemberJoinDto().getGender())
                .role(masterJoinDto.getMemberJoinDto().getRole())
                .address(masterJoinDto.getMemberJoinDto().getAddress())
                .birthday(masterJoinDto.getMemberJoinDto().getBirthday())
                .email(masterJoinDto.getMemberJoinDto().getEmail())
                .phone(masterJoinDto.getMemberJoinDto().getPhone())
                .build();;

        memberRepository.save(member);

        Company company = masterJoinDto.toCompanyEntity();
        companyRepository.save(company);
    }

    @Override
    @Transactional
    public void createWorcationMember(WorcationJoin worcationJoinDto) {
        Member member = Member.builder()
                .userId(worcationJoinDto.getMemberJoinDto().getUser_id())
                .userPwd(passwordEncoder.encode(worcationJoinDto.getMemberJoinDto().getUser_pwd()))
                .name(worcationJoinDto.getMemberJoinDto().getName())
                .gender(worcationJoinDto.getMemberJoinDto().getGender())
                .address(worcationJoinDto.getMemberJoinDto().getAddress())
                .birthday(worcationJoinDto.getMemberJoinDto().getBirthday())
                .email(worcationJoinDto.getMemberJoinDto().getEmail())
                .phone(worcationJoinDto.getMemberJoinDto().getPhone())
                .role(worcationJoinDto.getMemberJoinDto().getRole())
                .build();

        memberRepository.save(member);
    }

    @Override
    public MemberDto.LoginResponse login(Login loginDto) {
        Member member = memberRepository.findByUserId(loginDto.getUser_id())
                .orElseThrow(() -> new UserNotFoundException("존재하지 않는 사용자입니다."));
        if(!passwordEncoder.matches(loginDto.getUser_pwd(), member.getUserPwd())) {
            throw new UserNotFoundException("비밀번호가 일치하지 않습니다.");
        }

        return MemberDto.LoginResponse.toDto(member);
    }

    @Override
    @Transactional
    public InfoResponse getUserInfoByUserId(String userId) {
        Member member = memberRepository.findByUserId(userId)
                .orElseThrow(()->new UserNotFoundException("유저 정보를 찾을 수 없습니다."));
        MemberDto.InfoResponse infoDto = MemberDto.InfoResponse.toMemberDto(member);
        if(
                member.getRole().equals(Role.MASTER) ||
                member.getRole().equals(Role.MANAGER) ||
                member.getRole().equals(Role.EMPLOYEE)
        ) {
            Long company_no= companyProfileRepository.getCompanyNoByUserNo(member.getUserNo())
                            .orElseThrow(() -> new UserNotFoundException("회사 정보를 찾을 수 없습니다."));
            infoDto.setCompany_no(company_no);
        }
        return infoDto;
    }

    @Override
    public LoginResponse getMemberBySocialId(String socialId) {
        Member member = memberRepository.findByUserId(socialId)
                .orElseThrow(() -> new UserNotFoundException("카카오 로그인 회원 정보가 없습니다."));
        return LoginResponse.toDto(member);
    }

    @Override
    public Member createOauth(String socialId, String email, String name, SocialType socialType) {
        Member member = Member.builder()
                .email(email)
                .name(name)
                .userPwd("")
                .phone(null)
                .build();
        memberRepository.save(member);
        return member;
    }
}

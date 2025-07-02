package com.minePing.BackEnd.repository;

import com.minePing.BackEnd.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository  extends JpaRepository<Member, Long>, MemberRepositoryV1 {
    Optional<Member> findByUserId(String userId);
}

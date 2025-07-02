package com.minePing.BackEnd.repository;

import com.minePing.BackEnd.entity.CompanyProfile;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public class CompanyProfileRepositoryImpl implements CompanyProfileRepositoryV1 {

    @PersistenceContext
    private EntityManager em;

    public Optional<Long> getCompanyNoByUserNo(Long userNo){
        String query = "select c.company.companyNo from CompanyProfile c where c.member.userNo = :userNo";
        Long companyNo = em.createQuery(query, Long.class)
                .setParameter("userNo", userNo)
                .getSingleResult();
        return Optional.ofNullable(companyNo);
    }
}

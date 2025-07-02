package com.minePing.BackEnd.repository;

import com.minePing.BackEnd.entity.CompanyProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyProfileRepository extends JpaRepository<CompanyProfile, Long>, CompanyProfileRepositoryV1 {

}

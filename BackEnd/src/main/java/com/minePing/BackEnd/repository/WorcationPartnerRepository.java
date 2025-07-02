package com.minePing.BackEnd.repository;

import com.minePing.BackEnd.entity.Worcation;
import com.minePing.BackEnd.entity.WorcationPartner;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WorcationPartnerRepository extends JpaRepository<WorcationPartner, Long> {
    List<WorcationPartner> findByWorcation(Worcation worcation);
} 
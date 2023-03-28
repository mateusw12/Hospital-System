package com.api.hospitalsystem.repository.hospitalizationPrice;

import com.api.hospitalsystem.model.hospitalizationPrice.HospitalizationPriceModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HospitalizationPriceRepository extends JpaRepository<HospitalizationPriceModel, Long> {
}

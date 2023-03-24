package com.api.hospitalsystem.repository.disiase;

import com.api.hospitalsystem.model.disiase.DisiaseModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DisiaseRepository extends JpaRepository<DisiaseModel, Long> {
}

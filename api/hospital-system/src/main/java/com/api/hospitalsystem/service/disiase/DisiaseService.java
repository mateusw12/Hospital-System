package com.api.hospitalsystem.service.disiase;

import com.api.hospitalsystem.dto.disiase.DisiaseDTO;
import com.api.hospitalsystem.mapper.disiase.DisiaseMapper;
import com.api.hospitalsystem.repository.disiase.DisiaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DisiaseService {

    @Autowired
    private DisiaseRepository disiaseRepository;

    @Autowired
    private DisiaseMapper disiaseMapper;

    @Transactional
    public List<DisiaseDTO> findAll() {
        return disiaseRepository.findAll()
                .stream()
                .map(disiaseMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public DisiaseDTO findById(Long id) {
        return disiaseRepository.findById(id).map(disiaseMapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found" + id));
    }

    @Transactional
    public DisiaseDTO create(DisiaseDTO disiaseDTO) {
        return disiaseMapper.toDTO(disiaseRepository.save(disiaseMapper.toEntity(disiaseDTO)));
    }

    @Transactional
    public DisiaseDTO update(Long id, DisiaseDTO disiaseDTO) {
        return disiaseRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setName(disiaseDTO.name());
                    recordFound.setCid(disiaseDTO.cid());
                    return disiaseMapper.toDTO(disiaseRepository.save(recordFound));
                }).orElseThrow(() -> new EntityNotFoundException("Disiase not found" + id));
    }

    @Transactional
    public void delete(Long id) {
        disiaseRepository.delete(disiaseRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Disiase not found" + id)));
    }

}

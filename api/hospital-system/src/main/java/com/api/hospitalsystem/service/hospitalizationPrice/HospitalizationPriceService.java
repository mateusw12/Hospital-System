package com.api.hospitalsystem.service.hospitalizationPrice;

import com.api.hospitalsystem.dto.hospitalizationPrice.HospitalizationPriceDTO;
import com.api.hospitalsystem.mapper.hospitalizationPrice.HospitalizationPriceMapper;
import com.api.hospitalsystem.repository.hospitalizationPrice.HospitalizationPriceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HospitalizationPriceService {

    @Autowired
    private HospitalizationPriceRepository hospitalizationPriceRepository;

    @Autowired
    private HospitalizationPriceMapper hospitalizationPriceMapper;

    @Transactional
    public List<HospitalizationPriceDTO> findAll() {
        return hospitalizationPriceRepository.findAll()
                .stream()
                .map(hospitalizationPriceMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public HospitalizationPriceDTO findById(Long id) {
        return hospitalizationPriceRepository.findById(id).map(hospitalizationPriceMapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Hospitalization price not found" + id));
    }

    @Transactional
    public HospitalizationPriceDTO create(HospitalizationPriceDTO hospitalizationPriceDTO) {
        return hospitalizationPriceMapper.toDTO(hospitalizationPriceRepository.save(hospitalizationPriceMapper.toEntity(hospitalizationPriceDTO)));
    }

    @Transactional
    public HospitalizationPriceDTO update(Long id, HospitalizationPriceDTO hospitalizationPriceDTO) {
        return hospitalizationPriceRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setId(hospitalizationPriceDTO.id());
                    recordFound.setTotalValue(hospitalizationPriceDTO.totalValue());
                    recordFound.setHospitalId(hospitalizationPriceDTO.hospitalId());
                    recordFound.setTotalDays(hospitalizationPriceDTO.totalDays());
                    recordFound.setDoctorAppointmentId(hospitalizationPriceDTO.doctorAppointmentId());
                    recordFound.setPaymentDate(hospitalizationPriceDTO.paymentDate());
                    recordFound.setIsPayment(hospitalizationPriceDTO.isPayment());
                    return hospitalizationPriceMapper.toDTO(hospitalizationPriceRepository.save(recordFound));
                }).orElseThrow(() -> new EntityNotFoundException("Hospitalization price not found" + id));
    }

    @Transactional
    public void delete(Long id) {
        hospitalizationPriceRepository.delete(hospitalizationPriceRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Hospitalization price not found" + id)));
    }

}

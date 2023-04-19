package com.api.hospitalsystem.mapper.hospitalizationPrice;

import com.api.hospitalsystem.dto.hospitalizationPrice.HospitalizationPriceDTO;
import com.api.hospitalsystem.model.hospitalizationPrice.HospitalizationPriceModel;
import org.springframework.stereotype.Component;

@Component
public class HospitalizationPriceMapper {

    public HospitalizationPriceDTO toDTO(HospitalizationPriceModel hospitalizationPriceModel) {
        if (hospitalizationPriceModel == null) {
            return null;
        }
        return new HospitalizationPriceDTO(
                hospitalizationPriceModel.getId(),
                hospitalizationPriceModel.getHospitalId(),
                hospitalizationPriceModel.getDoctorAppointmentId(),
                hospitalizationPriceModel.getTotalDays(),
                hospitalizationPriceModel.getTotalValue(),
                hospitalizationPriceModel.getIsPayment(),
                hospitalizationPriceModel.getPaymentDate(),
                hospitalizationPriceModel.getDescription()
        );
    }

    public HospitalizationPriceModel toEntity(HospitalizationPriceDTO hospitalizationPriceDTO) {

        if (hospitalizationPriceDTO == null) {
            return null;
        }

        HospitalizationPriceModel hospitalizationPriceModel = new HospitalizationPriceModel();
        if (hospitalizationPriceDTO.id() != null) {
            hospitalizationPriceModel.setId(hospitalizationPriceDTO.id());
        }
        hospitalizationPriceModel.setHospitalId(hospitalizationPriceDTO.hospitalId());
        hospitalizationPriceModel.setDoctorAppointmentId(hospitalizationPriceDTO.doctorAppointmentId());
        hospitalizationPriceModel.setIsPayment(hospitalizationPriceDTO.isPayment());
        hospitalizationPriceModel.setPaymentDate(hospitalizationPriceDTO.paymentDate());
        hospitalizationPriceModel.setTotalDays(hospitalizationPriceDTO.totalDays());
        hospitalizationPriceModel.setTotalValue(hospitalizationPriceDTO.totalValue());
        hospitalizationPriceModel.setDescription(hospitalizationPriceDTO.description());
        return hospitalizationPriceModel;
    }

}

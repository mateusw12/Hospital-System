import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ButtonAppModule,
  DatePickerModule,
  DropDownListModule,
  FormGridModule,
  ModalModule,
  TextBoxModule,
} from '@module/shared';
import { ReactiveFormsModule } from '@module/utils/forms';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { DoctorAppointmentRegistrationRoutingModule } from './doctor-appointment-registration-routing.module';
import { DoctorAppointmentRegistrationComponent } from './doctor-appointment-registration.component';

@NgModule({
  declarations: [DoctorAppointmentRegistrationComponent],
  imports: [
    CommonModule,
    TextBoxModule,
    FormGridModule,
    ReactiveFormsModule,
    ModalModule,
    ButtonModule,
    ButtonAppModule,
    DropDownListModule,
    CheckBoxModule,
    DatePickerModule,
    DoctorAppointmentRegistrationRoutingModule,
  ],
})
export class DoctorAppointmentRegistrationModule {}

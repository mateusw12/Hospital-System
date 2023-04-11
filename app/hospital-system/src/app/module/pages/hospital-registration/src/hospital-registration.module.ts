import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    ButtonAppModule,
    DropDownListModule,
    FormGridModule,
    MaskedTextBoxModule,
    ModalModule,
    TextBoxModule
} from '@module/shared';
import { ReactiveFormsModule } from '@module/utils/forms';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { HospitalRegistrationRoutingModule } from './hospital-registration-routing.module';
import { HospitalRegistrationComponent } from './hospital-registration.component';

@NgModule({
  declarations: [HospitalRegistrationComponent],
  imports: [
    CommonModule,
    TextBoxModule,
    FormGridModule,
    ReactiveFormsModule,
    MaskedTextBoxModule,
    ModalModule,
    ButtonModule,
    ButtonAppModule,
    DropDownListModule,
    CheckBoxModule,
    HospitalRegistrationRoutingModule,
  ],
})
export class HospitalRegistrationModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ButtonAppModule,
  DropDownListModule,
  FormGridModule,
  ModalModule,
  NumericTextBoxModule,
  TextBoxModule,
} from '@module/shared';
import { ReactiveFormsModule } from '@module/utils/forms';
import {
  ButtonModule,
  CheckBoxAllModule,
} from '@syncfusion/ej2-angular-buttons';
import { PatientRegistrationRoutingModule } from './patient-registration-routing.module';
import { PatientRegistrationComponent } from './patient-registration.component';

@NgModule({
  declarations: [PatientRegistrationComponent],
  imports: [
    CommonModule,
    TextBoxModule,
    FormGridModule,
    ReactiveFormsModule,
    ModalModule,
    ButtonModule,
    ButtonAppModule,
    NumericTextBoxModule,
    DropDownListModule,
    CheckBoxAllModule,
    PatientRegistrationRoutingModule,
  ],
})
export class PatientRegistrationModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ButtonAppModule,
  DatePickerModule,
  DropDownListModule,
  FormGridModule,
  ModalModule,
  NumericTextBoxModule,
  TextBoxModule,
} from '@module/shared';
import { ReactiveFormsModule } from '@module/utils/forms';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { HospitalizationRegistrationRoutingModule } from './hospitalization-registration-routing.module';
import { HospitalizationRegistrationComponent } from './hospitalization-registration.component';

@NgModule({
  declarations: [HospitalizationRegistrationComponent],
  imports: [
    CommonModule,
    TextBoxModule,
    FormGridModule,
    ReactiveFormsModule,
    ModalModule,
    ButtonModule,
    ButtonAppModule,
    NumericTextBoxModule,
    CheckBoxModule,
    DropDownListModule,
    DatePickerModule,
    HospitalizationRegistrationRoutingModule,
  ],
})
export class HospitalizationRegistrationModule {}

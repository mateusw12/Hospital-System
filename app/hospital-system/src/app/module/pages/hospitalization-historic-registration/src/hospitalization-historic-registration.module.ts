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
import { HospitalizationHistoricRegistrationRoutingModule } from './hospitalization-historic-registration-routing.module';
import { HospitalizationHistoricRegistrationComponent } from './hospitalization-historic-registration.component';

@NgModule({
  declarations: [HospitalizationHistoricRegistrationComponent],
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
    HospitalizationHistoricRegistrationRoutingModule,
  ],
})
export class HospitalizationHistoricRegistrationModule {}

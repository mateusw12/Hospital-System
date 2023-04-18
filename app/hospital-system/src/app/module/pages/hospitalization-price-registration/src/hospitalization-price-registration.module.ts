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
import { HospitalizationPriceRegistrationRoutingModule } from './hospitalization-price-registration-routing.module';
import { HospitalizationPriceRegistrationComponent } from './hospitalization-price-registration.component';

@NgModule({
  declarations: [HospitalizationPriceRegistrationComponent],
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
    HospitalizationPriceRegistrationRoutingModule,
  ],
})
export class HospitalizationPriceRegistrationModule {}

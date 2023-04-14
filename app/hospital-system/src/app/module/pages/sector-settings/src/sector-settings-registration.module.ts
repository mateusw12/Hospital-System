import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ButtonAppModule,
  DropDownListModule,
  FormGridModule,
  MaskedTextBoxModule,
  ModalModule,
  NumericTextBoxModule,
  TextBoxModule,
} from '@module/shared';
import { ReactiveFormsModule } from '@module/utils/forms';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { SectorSettingsRegistrationRoutingModule } from './sector-settings-registration-routing.module';
import { SectorSettingsRegistrationComponent } from './sector-settings-registration.component';

@NgModule({
  declarations: [SectorSettingsRegistrationComponent],
  imports: [
    CommonModule,
    TextBoxModule,
    FormGridModule,
    ReactiveFormsModule,
    NumericTextBoxModule,
    ModalModule,
    ButtonModule,
    ButtonAppModule,
    DropDownListModule,
    CheckBoxModule,
    SectorSettingsRegistrationRoutingModule,
  ],
})
export class SectorSettingsRegistrationModule {}

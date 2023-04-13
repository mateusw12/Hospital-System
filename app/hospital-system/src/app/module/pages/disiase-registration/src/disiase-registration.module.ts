import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ButtonAppModule,
  DropDownListModule,
  FormGridModule,
  MaskedTextBoxModule,
  ModalModule,
  TextBoxModule,
} from '@module/shared';
import { ReactiveFormsModule } from '@module/utils/forms';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { DisiaseRegistrationRoutingModule } from './disiase-registration-routing.module';
import { DisiaseRegistrationComponent } from './disiase-registration.component';

@NgModule({
  declarations: [DisiaseRegistrationComponent],
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
    DisiaseRegistrationRoutingModule,
  ],
})
export class DisiaseRegistrationModule {}

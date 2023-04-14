import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ButtonAppModule,
  FormGridModule,
  ModalModule,
  MultiSelectModule,
  NumericTextBoxModule,
  TextBoxModule,
} from '@module/shared';
import { ReactiveFormsModule } from '@module/utils/forms';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { MedicalProcedureRegistrationRoutingModule } from './medical-procedure-registration-routing.module';
import { MedicalProcedureRegistrationComponent } from './medical-procedure-registration.component';

@NgModule({
  declarations: [MedicalProcedureRegistrationComponent],
  imports: [
    CommonModule,
    TextBoxModule,
    FormGridModule,
    ReactiveFormsModule,
    ModalModule,
    ButtonModule,
    ButtonAppModule,
    NumericTextBoxModule,
    MultiSelectModule,
    MedicalProcedureRegistrationRoutingModule,
  ],
})
export class MedicalProcedureRegistrationModule {}

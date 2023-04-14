import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ButtonAppModule,
  DropDownListModule,
  FormGridModule,
  MaskedTextBoxModule,
  ModalModule,
  MultiSelectModule,
  PasswordStrengthBarModule,
  TextBoxModule,
} from '@module/shared';
import { ReactiveFormsModule } from '@module/utils/forms';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { UserRegistrationRoutingModule } from './user-registration-routing.module';
import { UserRegistrationComponent } from './user-registration.component';

@NgModule({
  declarations: [UserRegistrationComponent],
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
    MultiSelectModule,
    UserRegistrationRoutingModule,
    PasswordStrengthBarModule,
  ],
})
export class UserRegistrationModule {}

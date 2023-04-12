import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    ButtonAppModule,
    DropDownListModule,
    FormGridModule,
    MaskedTextBoxModule,
    ModalModule,
    PasswordStrengthBarModule,
    TextBoxModule
} from '@module/shared';
import { ReactiveFormsModule } from '@module/utils/forms';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { PermissionRegistrationRoutingModule } from './permission-registration-routing.module';
import { PermissionRegistrationComponent } from './permission-registration.component';

@NgModule({
  declarations: [PermissionRegistrationComponent],
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
    PermissionRegistrationRoutingModule,
    PasswordStrengthBarModule,
  ],
})
export class PermissionRegistrationModule {}

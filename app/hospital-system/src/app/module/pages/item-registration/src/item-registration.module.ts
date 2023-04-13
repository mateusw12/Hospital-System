import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ButtonAppModule,
  FormGridModule,
  ModalModule,
  TextBoxModule
} from '@module/shared';
import { ReactiveFormsModule } from '@module/utils/forms';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { ItemRegistrationRoutingModule } from './item-registration-routing.module';
import { ItemRegistrationComponent } from './item-registration.component';

@NgModule({
  declarations: [ItemRegistrationComponent],
  imports: [
    CommonModule,
    TextBoxModule,
    FormGridModule,
    ReactiveFormsModule,
    ModalModule,
    ButtonModule,
    ButtonAppModule,
    CheckBoxModule,
    ItemRegistrationRoutingModule,
  ],
})
export class ItemRegistrationModule {}

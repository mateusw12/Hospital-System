import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ButtonAppModule,
  DropDownListModule,
  TextBoxModule,
} from '@module/shared';
import { ReactiveFormsModule } from '@module/utils/forms';
import {
  ButtonModule,
  CheckBoxAllModule,
} from '@syncfusion/ej2-angular-buttons';
import { ColorPickerAllModule } from '@syncfusion/ej2-angular-inputs';
import { TabAllModule } from '@syncfusion/ej2-angular-navigations';
import { StyleSideBarComponent } from './side-bar/style-side-bar.component';
import { StyleSettingsRoutingModule } from './style-settings-routing.module';
import { StyleSettingComponent } from './style-settings.component';

@NgModule({
  declarations: [StyleSettingComponent, StyleSideBarComponent],
  imports: [
    CommonModule,
    TextBoxModule,
    ReactiveFormsModule,
    ButtonModule,
    ButtonAppModule,
    TabAllModule,
    CheckBoxAllModule,
    DropDownListModule,
    ColorPickerAllModule,
    StyleSettingsRoutingModule,
  ],
})
export class SettingsModule {}

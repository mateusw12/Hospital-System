import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonAllModule } from '@syncfusion/ej2-angular-buttons';
import { ButtonAppModule } from '../button/button-app.module';
import { DropDownListModule } from '../drop-down-list/dropdownlist.module';
import { SideBarComponent } from './sidebar.component';

@NgModule({
  declarations: [SideBarComponent],
  imports: [
    CommonModule,
    DropDownListModule,
    FormsModule,
    ButtonAllModule,
    ButtonAppModule,
  ],
  exports: [SideBarComponent],
})
export class SideBarModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonAllModule } from '@syncfusion/ej2-angular-buttons';
import { AppBarModule } from '@syncfusion/ej2-angular-navigations';
import { BreadCrumbComponent } from '../bread-crumb';
import { NavBarComponent } from './nav-bar.component';

@NgModule({
  declarations: [NavBarComponent, BreadCrumbComponent],
  imports: [CommonModule, ButtonAllModule, AppBarModule],
  exports: [NavBarComponent],
})
export class NavBarModule {}

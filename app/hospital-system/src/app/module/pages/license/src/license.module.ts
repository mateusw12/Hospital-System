import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LicenseRoutingModule } from './license-routing.module';
import { License } from './license.component';

@NgModule({
  declarations: [License],
  imports: [CommonModule, LicenseRoutingModule],
})
export class LicenseModule {}

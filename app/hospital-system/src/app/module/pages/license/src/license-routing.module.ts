import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { License } from './license.component';

const routes: Routes = [{ path: '', component: License }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LicenseRoutingModule {}

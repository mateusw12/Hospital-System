import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HospitalizationRegistrationComponent } from './hospitalization-registration.component';

const routes: Routes = [
  { path: '', component: HospitalizationRegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HospitalizationRegistrationRoutingModule {}

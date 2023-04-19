import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HospitalizationHistoricRegistrationComponent } from './hospitalization-historic-registration.component';

const routes: Routes = [
  { path: '', component: HospitalizationHistoricRegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HospitalizationHistoricRegistrationRoutingModule {}

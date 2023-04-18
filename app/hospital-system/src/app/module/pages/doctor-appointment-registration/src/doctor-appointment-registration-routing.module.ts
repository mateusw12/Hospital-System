import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorAppointmentRegistrationComponent } from './doctor-appointment-registration.component';

const routes: Routes = [
  { path: '', component: DoctorAppointmentRegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorAppointmentRegistrationRoutingModule {}

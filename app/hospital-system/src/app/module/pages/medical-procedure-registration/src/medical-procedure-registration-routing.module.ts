import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicalProcedureRegistrationComponent } from './medical-procedure-registration.component';

const routes: Routes = [
  { path: '', component: MedicalProcedureRegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicalProcedureRegistrationRoutingModule {}

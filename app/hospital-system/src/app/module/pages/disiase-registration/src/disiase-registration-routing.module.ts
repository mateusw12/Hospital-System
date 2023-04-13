import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisiaseRegistrationComponent } from './disiase-registration.component';

const routes: Routes = [{ path: '', component: DisiaseRegistrationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisiaseRegistrationRoutingModule {}

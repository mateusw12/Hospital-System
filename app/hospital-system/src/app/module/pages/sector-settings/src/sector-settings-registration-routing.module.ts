import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectorSettingsRegistrationComponent } from './sector-settings-registration.component';

const routes: Routes = [
  { path: '', component: SectorSettingsRegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SectorSettingsRegistrationRoutingModule {}

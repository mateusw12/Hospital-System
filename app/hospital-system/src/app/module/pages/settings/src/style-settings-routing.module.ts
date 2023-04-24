import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StyleSettingComponent } from './style-settings.component';

const routes: Routes = [{ path: '', component: StyleSettingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StyleSettingsRoutingModule {}

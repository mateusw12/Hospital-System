import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404 } from './error-404.component';

const routes: Routes = [{ path: '', component: Error404 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Error404RoutingModule {}

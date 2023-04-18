import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Error404RoutingModule } from './error-404-routing.module';
import { Error404 } from './error-404.component';

@NgModule({
  imports: [CommonModule, Error404RoutingModule],
  declarations: [Error404],
})
export class Error404Module {}

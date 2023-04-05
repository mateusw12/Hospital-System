import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadCrumbComponent } from './bread-crumb.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [BreadCrumbComponent],
  exports: [BreadCrumbComponent],
})
export class BreadCrumbModule {}

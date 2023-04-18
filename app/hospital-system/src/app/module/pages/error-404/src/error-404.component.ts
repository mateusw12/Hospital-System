import { Component } from '@angular/core';
import { NavigationService } from '@module/service';

@Component({
  templateUrl: './error-404.component.html',
})
export class Error404 {
  constructor(private navigationService: NavigationService) {}

  onNavigateClick(): void {
    this.navigationService.navigateToHomePage();
  }
}

import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  constructor(private router: Router) {}

  navigateToHomePage(): Promise<boolean> {
    return this.navigateTo([`/menu/home`]);
  }

  navigateToInformationPage(): Promise<boolean> {
    return this.navigateTo([`/menu/information`]);
  }

  navigateToLicensePage(): Promise<boolean> {
    return this.navigateTo([`/menu/license`]);
  }

  navigateToLoginPage(): Promise<boolean> {
    return this.navigateTo([`/login`]);
  }

  private navigateTo(
    commands: any[],
    extras?: NavigationExtras
  ): Promise<boolean> {
    return this.router.navigate(commands, extras);
  }
}

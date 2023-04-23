import { Component, OnDestroy, OnInit } from '@angular/core';
import { Login } from '@module/models';
import { LoginRepository } from '@module/repository';
import { NavigationService } from '@module/service';
import { untilDestroyed } from '@module/utils/common';
import { AuthenticationService, ErrorHandler } from '@module/utils/services';

@Component({
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  selector: 'app-nav-bar',
})
export class NavBarComponent implements OnInit, OnDestroy {
  constructor(
    private navigationService: NavigationService,
    private errorHandler: ErrorHandler,
    private loginRepository: LoginRepository,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  onToggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    sidebar.classList.toggle('active');
  }

  onHomeClick(): void {
    this.navigationService.navigateToHomePage();
  }

  onLogoutClick(): void {
    const login = this.getModel();
    this.loginRepository
      .logout(login)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.authenticationService.clearUserToken();
          this.navigationService.navigateToLoginPage();
        },
        (error) => this.handleError(error)
      );
  }

  ngOnDestroy(): void {}

  private getModel(): Login {
    const user = this.authenticationService.getUser();
    const model = new Login();
    model.userName = user as string;
    return model;
  }

  private handleError(error: unknown): void {
    this.errorHandler.present(error);
  }
}

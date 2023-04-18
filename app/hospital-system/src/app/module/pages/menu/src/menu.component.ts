import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hospital, Item, Login } from '@module/models';
import {
  HospitalRepository,
  ItemRepository,
  LoginRepository,
  PermissionRepository,
} from '@module/repository';
import { NavigationService } from '@module/service';
import { untilDestroyed, untilDestroyedAsync } from '@module/utils/common';
import {
  AuthenticationService,
  ErrorHandler,
  MenuService,
} from '@module/utils/services';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  menuItems: Item[] = [];
  menuItemsFather: string[] = [];
  selectedDropdownIndex: number | null = null;
  hospital: Hospital = new Hospital();
  hospitals: Hospital[] = [];

  constructor(
    private permisionRepository: PermissionRepository,
    private itemRepository: ItemRepository,
    private hospitalRepository: HospitalRepository,
    private menuService: MenuService,
    private loginRepository: LoginRepository,
    private authenticationService: AuthenticationService,
    private navigationService: NavigationService,
    private errorHandler: ErrorHandler,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  menuItemsFiltered(itemFather: string): Item[] {
    return this.menuItems.filter(
      (item) => item.descriptionFather === itemFather
    );
  }

  onToggleDropdown(index: number): void {
    if (this.selectedDropdownIndex === index) {
      this.selectedDropdownIndex = null;
    } else {
      this.selectedDropdownIndex = index;
    }
  }

  onHospitalChange(hospitalId: number) {
    setTimeout(() => {
      this.menuService.onHospitalChange$(hospitalId);
    }, 300);
  }

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

  onInformationClick(): void {
    this.navigationService.navigateToInformationPage();
  }

  onLicenseClick(): void {
    this.navigationService.navigateToLicensePage();
  }

  onNavigateClick(item: Item): void {
    this.route.navigate([item.path]);
  }

  ngOnDestroy(): void {}

  private async loadData(): Promise<void> {
    forkJoin([
      this.permisionRepository.findByUserName('mateus'),
      this.itemRepository.findAll(),
      this.hospitalRepository.findAll(),
    ])
      .pipe(untilDestroyed(this))
      .subscribe(
        async ([permissions, items, hospitals]) => {
          this.menuItemsFather = this.getUniqueItemFather(items);
          for (const permission of permissions) {
            const item = items.find((el) => el.id === permission.itemId);
            if (item) this.menuItems.push(item);
          }
          this.hospitals = hospitals;
          await this.getActiveHospital();
        },
        (error) => this.handleError(error)
      );
  }

  private async getActiveHospital(): Promise<void> {
    this.hospital = await untilDestroyedAsync(
      this.menuService.getActiveHospital(),
      this
    );
  }

  private getUniqueItemFather(items: Item[]): string[] {
    return Object.keys(
      items.reduce((unique: { [key: string]: boolean }, item: Item) => {
        unique[item.descriptionFather] = true;
        return unique;
      }, {})
    );
  }

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

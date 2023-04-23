import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hospital, Item } from '@module/models';
import { NavigationService } from '@module/service';
import { MenuService } from '@module/utils/services';

@Component({
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  selector: 'app-side-bar',
})
export class SideBarComponent implements OnInit, OnDestroy {
  @Input()
  hospitals: Hospital[] = [];

  @Input()
  menuItems: Item[] = [];

  @Input()
  menuItemsFather: string[] = [];

  @Input()
  hospital: Hospital = new Hospital();

  selectedDropdownIndex: number | null = null;

  constructor(
    private menuService: MenuService,
    private route: Router,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {}

  onNavigateClick(item: Item): void {
    this.route.navigate([item.path]);
  }

  onHospitalChange(hospitalId: number) {
    setTimeout(() => {
      this.menuService.onHospitalChange$(hospitalId);
    }, 300);
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

  onInformationClick(): void {
    this.navigationService.navigateToInformationPage();
  }

  onLicenseClick(): void {
    this.navigationService.navigateToLicensePage();
  }

  onNewsClick(): void {
    this.navigationService.navigateToNewsPage();
  }
  ngOnDestroy(): void {}
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hospital, Item } from '@module/models';
import {
  HospitalRepository,
  ItemRepository,
  PermissionRepository,
  UserRepository,
} from '@module/repository';
import { untilDestroyed, untilDestroyedAsync } from '@module/utils/common';
import { ErrorHandler, MenuService } from '@module/utils/services';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  menuItems: Item[] = [];
  menuItemsFather: string[] = [];
  hospital: Hospital = new Hospital();
  hospitals: Hospital[] = [];

  private userName: string = '';

  constructor(
    private permisionRepository: PermissionRepository,
    private itemRepository: ItemRepository,
    private hospitalRepository: HospitalRepository,
    private menuService: MenuService,
    private errorHandler: ErrorHandler,
    private userRepository: UserRepository
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {}

  private async loadData(): Promise<void> {
    await this.getLoggedUser();
    forkJoin([
      this.permisionRepository.findByUserName(this.userName),
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

  private async getLoggedUser(): Promise<void> {
    try {
      const user = await untilDestroyedAsync(
        this.userRepository.findMe(),
        this
      );
      this.userName = user.userName;
    } catch (error) {
      this.handleError(error);
    }
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

  private handleError(error: unknown): void {
    this.errorHandler.present(error);
  }
}

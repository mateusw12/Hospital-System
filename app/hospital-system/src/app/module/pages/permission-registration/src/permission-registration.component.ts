import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Item, Permission, User } from '@module/models';
import {
  HospitalRepository,
  ItemRepository,
  PermissionRepository,
  UserRepository,
} from '@module/repository';
import { FormGridCommandEventArgs, ModalComponent } from '@module/shared';
import { SfGridColumnModel, SfGridColumns } from '@module/shared/src/grid';
import { untilDestroyed, untilDestroyedAsync } from '@module/utils/common';
import { markAllAsTouched } from '@module/utils/forms';
import {
  ErrorHandler,
  MenuService,
  MessageService,
  ToastService,
} from '@module/utils/services';
import { forkJoin } from 'rxjs';

const NEW_ID = 'NOVO';

interface GridRow {
  id: number;
  userName: string;
  itemName: string;
}

interface FormModel {
  id: FormControl<string | null>;
  itemId: FormControl<number | null>;
  userName: FormControl<string | null>;
}

@Component({
  selector: 'app-permission-registration',
  templateUrl: './permission-registration.component.html',
  styleUrls: ['./permission-registration.component.scss'],
})
export class PermissionRegistrationComponent implements OnInit, OnDestroy {
  columns: SfGridColumnModel[] = this.createColumns();
  dataSource: GridRow[] = [];
  form = this.createForm();
  items: Item[] = [];
  users: User[] = [];

  @ViewChild(ModalComponent, { static: true })
  modal!: ModalComponent;

  constructor(
    private toastService: ToastService,
    private errorHandler: ErrorHandler,
    private permissionRepository: PermissionRepository,
    private itemRepository: ItemRepository,
    private userRepository: UserRepository,
    private messageService: MessageService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  onCommand(event: FormGridCommandEventArgs): void {
    switch (event.command) {
      case 'Add':
        this.onCommandAdd();
        break;
      case 'Edit':
        this.onCommandEdit(event.rowData as GridRow);
        break;
      case 'Remove':
        this.onCommandRemove(event.rowData as GridRow);
        break;
      default:
        break;
    }
  }

  async onModalClose(): Promise<void> {
    this.modal.onCloseClick();
  }

  async onSaveClick(): Promise<void> {
    if (!this.form.valid) {
      markAllAsTouched(this.form);
      return;
    }
    const model = this.getModel();
    const exists = model.id > 0;

    if (exists) {
      const confirmed = await this.messageService.showConfirmSave();
      if (!confirmed) return;
    }
    (exists
      ? this.permissionRepository.updateById(model)
      : this.permissionRepository.add(model)
    )
      .pipe(untilDestroyed(this))
      .subscribe(
        async () => {
          this.toastService.showSuccess();
          this.reset();
          if (exists) this.modal.onCloseClick();
          this.loadData();
        },
        async (error) => this.handleError(error)
      );
  }

  ngOnDestroy(): void {}

  private async onOpen(id?: number): Promise<void> {
    this.reset();
    try {
      if (id) {
        await this.findUser(id);
      }
      this.modal.open();
    } catch (error) {
      this.handleError(error);
    }
  }

  private onCommandAdd(): void {
    this.onOpen();
  }

  private onCommandEdit(model: GridRow): void {
    this.onOpen(model.id);
  }

  private async onCommandRemove(model: GridRow): Promise<void> {
    const confirmed = await this.messageService.showConfirmDelete();
    if (!confirmed) return;
    this.userRepository
      .deleteById(model.id)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.toastService.showRemove();
          this.loadData();
        },
        (error) => this.handleError(error)
      );
  }

  private async loadData(): Promise<void> {
    const hospitalId = await this.getHospitalId();
    forkJoin([
      this.permissionRepository.findAll(),
      this.itemRepository.findAll(),
      this.userRepository.findByHospitalId(hospitalId),
    ])
      .pipe(untilDestroyed(this))
      .subscribe(
        async ([permissions, items, users]) => {
          const dataSource: GridRow[] = [];
          this.items = items;
          this.users = users;

          for (const permission of permissions) {
            const item = items.find((el) => el.id === permission.itemId);

            dataSource.push({
              id: permission.id,
              userName: permission.userName,
              itemName: item ? item.description : '',
            });
          }
          this.dataSource = dataSource;
        },
        (error) => this.handleError(error)
      );
  }

  private async getHospitalId(): Promise<number> {
    try {
      const hospital = await untilDestroyedAsync(
        this.menuService.getActiveHospital(),
        this
      );
      return hospital.id;
    } catch (error) {
      this.handleError(error);
      return 0;
    }
  }

  private async findUser(id: number): Promise<void> {
    this.permissionRepository
      .findById(id)
      .pipe(untilDestroyed(this))
      .subscribe((permission) => {
        this.populateForm(permission);
      });
  }

  private populateForm(permission: Permission): void {
    this.form.patchValue({
      id: permission.id.toString(),
      itemId: permission.itemId,
      userName: permission.userName,
    });
  }

  private getModel(): Permission {
    const model = new Permission();
    const formValue = this.form.getRawValue();
    model.id = formValue.id === NEW_ID ? 0 : Number(formValue.id);
    model.userName = formValue.userName as string;
    model.itemId = formValue.itemId as number;
    return model;
  }

  private reset(): void {
    this.form.reset({
      id: NEW_ID,
    });
  }

  private handleError(error: unknown): void {
    this.errorHandler.present(error);
  }

  private createForm(): FormGroup<FormModel> {
    return new FormGroup<FormModel>({
      id: new FormControl<string | null>({ value: NEW_ID, disabled: true }),
      userName: new FormControl<string | null>(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),
      itemId: new FormControl<number | null>(null, [Validators.required]),
    });
  }

  private createColumns() {
    return SfGridColumns.build<GridRow>({
      id: SfGridColumns.text('id', 'Código').minWidth(100).isPrimaryKey(true),
      userName: SfGridColumns.text('userName', 'Usuário').minWidth(200),
      itemName: SfGridColumns.text('itemName', 'Item de Menu').minWidth(100),
    });
  }
}

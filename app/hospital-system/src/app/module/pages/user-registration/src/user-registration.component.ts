import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Role, Specialization, User } from '@module/models';
import { UserRepository } from '@module/repository';
import { FormGridCommandEventArgs, ModalComponent } from '@module/shared';
import { SfGridColumnModel, SfGridColumns } from '@module/shared/src/grid';
import { untilDestroyed, untilDestroyedAsync } from '@module/utils/common';
import { markAllAsTouched } from '@module/utils/forms';
import { getDescription, toArray } from '@module/utils/functions/enum';
import {
  ErrorHandler,
  MenuService,
  MessageService,
  ToastService,
} from '@module/utils/services';

const NEW_ID = 'NOVO';

interface GridRow {
  id: number;
  userName: string;
  role: string;
  specialization: string;
  isActive: boolean;
}

interface FormModel {
  id: FormControl<string | null>;
  name: FormControl<string | null>;
  userName: FormControl<string | null>;
  password: FormControl<string | null>;
  role: FormControl<Role | null>;
  isActive: FormControl<boolean | null>;
  email: FormControl<string | null>;
  crm: FormControl<string | null>;
  hospitalId: FormControl<number | null>;
  specialization: FormControl<Specialization | null>;
}
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent implements OnInit, OnDestroy {
  @ViewChild(ModalComponent, { static: true })
  modal!: ModalComponent;

  columns: SfGridColumnModel[] = this.createColumns();
  dataSource: GridRow[] = [];
  form = this.createForm();

  roles = toArray(Role);
  specializations = toArray(Specialization);

  constructor(
    private toastService: ToastService,
    private messageService: MessageService,
    private errorHandler: ErrorHandler,
    private userRepository: UserRepository,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.formEvents();
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
    const model = this.getModel();
    console.log('model', model);

    if (!this.form.valid) {
      markAllAsTouched(this.form);
      return;
    }
    const exists = model.id > 0;

    if (exists) {
      const confirmed = await this.messageService.showConfirmSave();
      if (!confirmed) return;
    }
    (exists
      ? this.userRepository.updateById(model)
      : this.userRepository.add(model)
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

  private formEvents(): void {
    const controls = this.form.controls;

    controls.role.valueChanges.pipe(untilDestroyed(this)).subscribe(
      (value) => {
        if (value !== Role.Adm) {
          controls.specialization.addValidators([Validators.required]);
          controls.crm.addValidators([Validators.required]);
        } else {
          controls.specialization.clearValidators();
          controls.crm.clearValidators();
        }
        this.form.updateValueAndValidity();
      },
      (error) => this.handleError(error)
    );
  }

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
    const hospitalId = await this.getHospital();

    this.userRepository
      .findByHospitalId(hospitalId)
      .pipe(untilDestroyed(this))
      .subscribe(
        async (users) => {
          const dataSource: GridRow[] = [];

          for (const item of users) {
            dataSource.push({
              id: item.id,
              role: getDescription(Role, item.role as unknown as string),
              userName: item.userName,
              isActive: item.isActive,
              specialization: getDescription(
                Specialization,
                item.specialization as unknown as string
              ),
            });
          }
          this.dataSource = dataSource;
        },
        (error) => this.handleError(error)
      );
  }

  private async getHospital(): Promise<number> {
    const hospital = await untilDestroyedAsync(
      this.menuService.getActiveHospital(),
      this
    );
    return hospital.id;
  }

  private async findUser(id: number): Promise<void> {
    this.userRepository
      .findById(id)
      .pipe(untilDestroyed(this))
      .subscribe((user) => {
        this.populateForm(user);
      });
  }

  private populateForm(user: User): void {
    this.form.patchValue({
      id: user.id.toString(),
      name: user.name,
      role: user.role,
      userName: user.userName,
      email: user.email,
      isActive: user.isActive,
      hospitalId: user.hospitalId,
      specialization: user.specialization,
      crm: user.crm,
    });
    this.changeFormField(user.role);
  }

  private changeFormField(role: Role): void {
    const isAdministrator = role === Role.Adm;
    const controls = this.form.controls;

    if (isAdministrator) {
      controls.role.disable();
      return;
    }
    controls.role.enable();
  }

  private getModel(): User {
    const model = new User();
    const formValue = this.form.getRawValue();
    model.id = formValue.id === NEW_ID ? 0 : Number(formValue.id);
    model.name = formValue.name as string;
    model.userName = formValue.name as string;
    model.role = formValue.role as Role;
    model.password = formValue.password as string;
    model.email = formValue.email as string;
    model.isActive = formValue.isActive as boolean;
    model.specialization = formValue.specialization as Specialization;
    model.crm = formValue.crm as string;
    return model;
  }

  private reset(): void {
    this.form.reset({
      id: NEW_ID,
      isActive: true,
    });
  }

  private handleError(error: unknown): void {
    this.errorHandler.present(error);
  }

  private createForm(): FormGroup<FormModel> {
    return new FormGroup<FormModel>({
      id: new FormControl<string | null>({ value: NEW_ID, disabled: true }),
      name: new FormControl<string | null>(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),
      crm: new FormControl<string | null>(null, [Validators.maxLength(200)]),
      hospitalId: new FormControl<number | null>(null, [Validators.required]),
      specialization: new FormControl<Specialization | null>(null),
      userName: new FormControl<string | null>(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),
      role: new FormControl<Role | null>(null, [
        Validators.required,
        Validators.min(0),
      ]),
      password: new FormControl<string | null>(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),
      email: new FormControl<string | null>(null, [
        Validators.email,
        Validators.maxLength(300),
      ]),
      isActive: new FormControl<boolean | null>(false),
    });
  }

  private createColumns() {
    return SfGridColumns.build<GridRow>({
      id: SfGridColumns.text('id', 'Código').minWidth(100).isPrimaryKey(true),
      userName: SfGridColumns.text('userName', 'Usuário').minWidth(200),
      role: SfGridColumns.text('role', 'Perfil').minWidth(100),
      specialization: SfGridColumns.text(
        'specialization',
        'Especialização'
      ).minWidth(100),
      isActive: SfGridColumns.boolean('isActive', 'Ativo').minWidth(100),
    });
  }
}

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MedicalProcedure, User } from '@module/models';
import { MedicalProcedureRepository, UserRepository } from '@module/repository';
import { FormGridCommandEventArgs, ModalComponent } from '@module/shared';
import { SfGridColumnModel, SfGridColumns } from '@module/shared/src/grid';
import { untilDestroyed } from '@module/utils/common';
import { markAllAsTouched } from '@module/utils/forms';
import {
  ErrorHandler,
  MessageService,
  ToastService,
} from '@module/utils/services';
import { forkJoin } from 'rxjs';

const NEW_ID = 'NOVO';

interface GridRow {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface FormModel {
  id: FormControl<string | null>;
  name: FormControl<string | null>;
  description: FormControl<string | null>;
  price: FormControl<number | null>;
  doctors: FormControl<number[] | null>;
}

@Component({
  selector: 'app-medical-procedure-registration',
  templateUrl: './medical-procedure-registration.component.html',
  styleUrls: ['./medical-procedure-registration.component.scss'],
})
export class MedicalProcedureRegistrationComponent
  implements OnInit, OnDestroy
{
  @ViewChild(ModalComponent, { static: true })
  modal!: ModalComponent;

  columns: SfGridColumnModel[] = this.createColumns();
  dataSource: GridRow[] = [];
  form = this.createForm();

  users: User[] = [];

  constructor(
    private toastService: ToastService,
    private messageService: MessageService,
    private errorHandler: ErrorHandler,
    private userRepository: UserRepository,
    private medicalProcedureRepository: MedicalProcedureRepository
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
      ? this.medicalProcedureRepository.updateById(model)
      : this.medicalProcedureRepository.add(model)
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
        await this.findSectorSettings(id);
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
    this.medicalProcedureRepository
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

  private loadData(): void {
    forkJoin([
      this.medicalProcedureRepository.findAll(),
      this.userRepository.findAll(),
    ])
      .pipe(untilDestroyed(this))
      .subscribe(
        async ([medicalProcedures, users]) => {
          const dataSource: GridRow[] = [];
          // this.users = users.filter((el) => el.role === Role.Doctor);
          this.users = users;
          for (const item of medicalProcedures) {
            dataSource.push({
              id: item.id,
              description: item.description,
              name: item.name,
              price: item.price,
            });
          }
          this.dataSource = dataSource;
        },
        (error) => this.handleError(error)
      );
  }

  private async findSectorSettings(id: number): Promise<void> {
    this.medicalProcedureRepository
      .findById(id)
      .pipe(untilDestroyed(this))
      .subscribe((medicalProcedure) => {
        this.populateForm(medicalProcedure);
      });
  }

  private populateForm(medicalProcedure: MedicalProcedure): void {
    this.form.patchValue({
      id: medicalProcedure.id.toString(),
      description: medicalProcedure.description,
      name: medicalProcedure.name,
      price: medicalProcedure.price,
      doctors: this.transformDoctorsToDoctorId(medicalProcedure.doctors),
    });
  }

  private getModel(): MedicalProcedure {
    const model = new MedicalProcedure();
    const formValue = this.form.getRawValue();
    model.id = formValue.id === NEW_ID ? 0 : Number(formValue.id);
    model.name = formValue.name as string;
    model.description = formValue.description as string;
    model.price = formValue.price as number;
    model.doctors = this.transformDoctorIdToDoctor(
      formValue.doctors as number[]
    );
    return model;
  }

  private transformDoctorIdToDoctor(doctors: number[]): User[] {
    return this.users.filter((user) => doctors.includes(user.id));
  }

  private transformDoctorsToDoctorId(doctors: User[]): number[] {
    return doctors.map((el) => el.id);
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
      description: new FormControl<string | null>(null, [
        Validators.required,
        Validators.maxLength(2000),
      ]),
      doctors: new FormControl<number[] | null>(null, [Validators.required]),
      name: new FormControl<string | null>(null, [
        Validators.required,
        Validators.maxLength(255),
      ]),
      price: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(0),
      ]),
    });
  }

  private createColumns() {
    return SfGridColumns.build<GridRow>({
      id: SfGridColumns.text('id', 'Código').minWidth(100).isPrimaryKey(true),
      name: SfGridColumns.text('name', 'Nome').minWidth(100),
      description: SfGridColumns.text('description', 'Descrição').minWidth(100),
      price: SfGridColumns.numeric('price', 'Valor Procedimento').minWidth(200),
    });
  }
}

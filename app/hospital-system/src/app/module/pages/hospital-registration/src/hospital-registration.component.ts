import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Hospital } from '@module/models';
import {
  HospitalRepository,
  ZipCodeAddressesRepository,
} from '@module/repository';
import { FormGridCommandEventArgs, ModalComponent } from '@module/shared';
import { SfGridColumnModel, SfGridColumns } from '@module/shared/src/grid';
import { untilDestroyed } from '@module/utils/common';
import { ZIP_CODE_ADDRESSES_REGEX } from '@module/utils/constant';
import { markAllAsTouched } from '@module/utils/forms';
import {
  ErrorHandler,
  MessageService,
  ToastService,
} from '@module/utils/services';
import { debounceTime } from 'rxjs/operators';

const NEW_ID = 'NOVO';

interface GridRow {
  id: number;
  name: string;
  comercialName: string;
  zipCode: string;
}

interface FormModel {
  id: FormControl<string | null>;
  name: FormControl<string | null>;
  comercialName: FormControl<string | null>;
  zipCode: FormControl<string | null>;
  phone: FormControl<string | null>;
  number: FormControl<string | null>;
  isActive: FormControl<boolean | null>;
  street: FormControl<string | null>;
  city: FormControl<string | null>;
}

@Component({
  selector: 'app-hospital-registration',
  templateUrl: './hospital-registration.component.html',
  styleUrls: ['./hospital-registration.component.scss'],
})
export class HospitalRegistrationComponent implements OnInit, OnDestroy {
  @ViewChild(ModalComponent, { static: true })
  modal!: ModalComponent;

  columns: SfGridColumnModel[] = this.createColumns();
  dataSource: GridRow[] = [];
  form = this.createForm();

  constructor(
    private toastService: ToastService,
    private messageService: MessageService,
    private errorHandler: ErrorHandler,
    private hospitalRepository: HospitalRepository,
    private zipCodeAddressRepository: ZipCodeAddressesRepository
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.registerEvents();
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
      ? this.hospitalRepository.updateById(model)
      : this.hospitalRepository.add(model)
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

  private registerEvents(): void {
    const controls = this.form.controls;

    controls.zipCode.valueChanges.pipe(debounceTime(200)).subscribe((value) => {
      if (value) this.getZipCodeAddresses(value);
    });
  }

  private getZipCodeAddresses(zipCode: string): void {
    this.resetZipCodeAddressesField();
    if (!ZIP_CODE_ADDRESSES_REGEX.test(zipCode)) return;
    this.zipCodeAddressRepository
      .getZipCodeAddresses(zipCode)
      .pipe(untilDestroyed(this))
      .subscribe(
        async (zipCodeAddresses) => {
          this.form.patchValue({
            city: zipCodeAddresses.localidade,
            street: zipCodeAddresses.logradouro,
          });
        },
        (error) => this.handleError(error)
      );
  }

  private resetZipCodeAddressesField(): void {
    this.form.patchValue({
      city: null,
      street: null,
    });
  }

  private async onOpen(id?: number): Promise<void> {
    this.reset();
    try {
      if (id) {
        await this.findCompany(id);
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
    this.hospitalRepository
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
    this.hospitalRepository
      .findAll()
      .pipe(untilDestroyed(this))
      .subscribe(
        async (hospitals) => {
          const dataSource: GridRow[] = [];

          for (const item of hospitals) {
            dataSource.push({
              id: item.id,
              name: item.name,
              comercialName: item.comercialName,
              zipCode: item.zipCode,
            });
          }
          this.dataSource = dataSource;
        },
        (error) => this.handleError(error)
      );
  }

  private async findCompany(id: number): Promise<void> {
    this.hospitalRepository
      .findById(id)
      .pipe(untilDestroyed(this))
      .subscribe((user) => {
        this.populateForm(user);
      });
  }

  private populateForm(user: Hospital): void {
    this.form.patchValue({
      id: user.id.toString(),
      name: user.name,
      comercialName: user.comercialName,
      number: user.number,
      isActive: user.isActive,
      phone: user.phone,
      zipCode: user.zipCode,
    });
  }

  private getModel(): Hospital {
    const model = new Hospital();
    const formValue = this.form.getRawValue();
    model.id = formValue.id === NEW_ID ? 0 : Number(formValue.id);
    model.name = formValue.name as string;
    model.comercialName = formValue.comercialName as string;
    model.zipCode = formValue.zipCode as string;
    model.phone = formValue.phone as string;
    model.comercialName = formValue.comercialName as string;
    model.isActive = formValue.isActive as boolean;
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
      name: new FormControl<string | null>(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),
      phone: new FormControl<string | null>(null, [Validators.maxLength(20)]),
      number: new FormControl<string | null>(null, [Validators.maxLength(20)]),
      zipCode: new FormControl<string | null>(null, [
        Validators.required,
        Validators.maxLength(20),
      ]),
      comercialName: new FormControl<string | null>(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),
      isActive: new FormControl<boolean | null>(false),
      city: new FormControl<string | null>({ disabled: true, value: null }),
      street: new FormControl<string | null>({ disabled: true, value: null }),
    });
  }

  private createColumns() {
    return SfGridColumns.build<GridRow>({
      id: SfGridColumns.text('id', 'Código').minWidth(100).isPrimaryKey(true),
      name: SfGridColumns.text('name', 'Empresa').minWidth(200),
      comercialName: SfGridColumns.text(
        'comercialName',
        'Nome Fantasia'
      ).minWidth(100),
      zipCode: SfGridColumns.text('zipCode', 'CEP').minWidth(100),
    });
  }
}

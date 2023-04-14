import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Gender, HeathPlan, MaritalStatus, Patient } from '@module/models';
import {
  PatientRepository,
  ZipCodeAddressesRepository,
} from '@module/repository';
import { FormGridCommandEventArgs, ModalComponent } from '@module/shared';
import { SfGridColumnModel, SfGridColumns } from '@module/shared/src/grid';
import { untilDestroyed, untilDestroyedAsync } from '@module/utils/common';
import { ZIP_CODE_ADDRESSES_REGEX } from '@module/utils/constant';
import { markAllAsTouched } from '@module/utils/forms';
import {
  EnumItem,
  getDescription,
  toArray,
} from '@module/utils/functions/enum';
import {
  ErrorHandler,
  MenuService,
  MessageService,
  ToastService,
} from '@module/utils/services';
import { cpfValidator } from '@module/utils/validations';
import { debounceTime } from 'rxjs/operators';

const NEW_ID = 'NOVO';

interface GridRow {
  id: number;
  name: string;
  cpf: string;
  heathPlan: string;
  city: string;
  state: string;
  age: number;
  gender: string;
}

interface FormModel {
  id: FormControl<string | null>;
  name: FormControl<string | null>;
  cpf: FormControl<string | null>;
  heathPlan: FormControl<HeathPlan | null>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
  zipCode: FormControl<string | null>;
  street: FormControl<string | null>;
  district: FormControl<string | null>;
  state: FormControl<string | null>;
  city: FormControl<string | null>;
  houseNumber: FormControl<number | null>;
  age: FormControl<number | null>;
  gender: FormControl<Gender | null>;
  maritalStatus: FormControl<MaritalStatus | null>;
  hasHeathPlan: FormControl<boolean | null>;
  hospitalId: FormControl<number | null>;
}

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.scss'],
})
export class PatientRegistrationComponent implements OnInit, OnDestroy {
  @ViewChild(ModalComponent, { static: true })
  modal!: ModalComponent;

  columns: SfGridColumnModel[] = this.createColumns();
  dataSource: GridRow[] = [];
  form = this.createForm();

  genders: EnumItem[] = toArray(Gender);
  maritalStatus: EnumItem[] = toArray(MaritalStatus);
  heathPlans: EnumItem[] = toArray(HeathPlan);

  private hospitalId = 0;

  constructor(
    private toastService: ToastService,
    private messageService: MessageService,
    private errorHandler: ErrorHandler,
    private patientRepository: PatientRepository,
    private menuService: MenuService,
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
      ? this.patientRepository.updateById(model)
      : this.patientRepository.add(model)
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

    controls.zipCode.valueChanges.pipe(debounceTime(200)).subscribe(
      (value) => {
        controls.houseNumber.reset();
        if (!value) {
          controls.houseNumber.disable();
          return;
        }
        controls.houseNumber.enable();
        this.getZipCodeAddresses(value);
      },
      (error) => this.handleError(error)
    );

    controls.hasHeathPlan.valueChanges.pipe(untilDestroyed(this)).subscribe(
      (value) => {
        if (value) {
          controls.heathPlan.enable();
          controls.heathPlan.setValidators([Validators.required]);
        } else {
          controls.heathPlan.disable();
          controls.heathPlan.clearValidators();
        }
        this.form.updateValueAndValidity();
      },
      (error) => this.handleError(error)
    );
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
            state: zipCodeAddresses.uf,
            district: zipCodeAddresses.bairro,
          });
        },
        (error) => this.handleError(error)
      );
  }

  private resetZipCodeAddressesField(): void {
    this.form.patchValue({
      city: null,
      street: null,
      district: null,
      state: null,
      houseNumber: null,
    });
  }

  private async onOpen(id?: number): Promise<void> {
    this.reset();
    try {
      if (id) {
        await this.findPatient(id);
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
    this.patientRepository
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
    await this.getHospitalId();
    this.patientRepository
      .findAll(this.hospitalId)
      .pipe(untilDestroyed(this))
      .subscribe(
        async (sectorSettings) => {
          const dataSource: GridRow[] = [];
          for (const item of sectorSettings) {
            dataSource.push({
              id: item.id,
              age: item.age,
              city: item.city,
              cpf: item.cpf,
              gender: getDescription(Gender, item.gender as unknown as string),
              name: item.name,
              heathPlan: getDescription(
                HeathPlan,
                item.heathPlan as unknown as string
              ),
              state: item.state,
            });
          }
          this.dataSource = dataSource;
        },
        (error) => this.handleError(error)
      );
  }

  private async getHospitalId(): Promise<void> {
    try {
      const hospital = await untilDestroyedAsync(
        this.menuService.getActiveHospital(),
        this
      );
      this.hospitalId = hospital.id;
    } catch (error) {
      this.handleError(error);
    }
  }

  private async findPatient(id: number): Promise<void> {
    this.patientRepository
      .findById(id)
      .pipe(untilDestroyed(this))
      .subscribe((patient) => {
        this.populateForm(patient);
      });
  }

  private populateForm(patient: Patient): void {
    this.form.patchValue({
      id: patient.id.toString(),
      hospitalId: patient.hospitalId,
      age: patient.age,
      zipCode: patient.zipCode,
      city: patient.city,
      cpf: patient.cpf,
      district: patient.district,
      email: patient.email,
      gender: patient.gender,
      hasHeathPlan: patient.hasHeathPlan,
      heathPlan: patient.heathPlan,
      houseNumber: patient.houseNumber,
      maritalStatus: patient.maritalStatus,
      name: patient.name,
      phone: patient.phone,
      state: patient.state,
      street: patient.street,
    });
  }

  private getModel(): Patient {
    const model = new Patient();
    const formValue = this.form.getRawValue();
    model.id = formValue.id === NEW_ID ? 0 : Number(formValue.id);
    model.age = formValue.age as number;
    model.zipCode = formValue.zipCode as string;
    model.city = formValue.city as string;
    model.cpf = formValue.cpf as string;
    model.district = formValue.district as string;
    model.email = formValue.email as string;
    model.gender = formValue.gender as Gender;
    model.hasHeathPlan = formValue.hasHeathPlan as boolean;
    model.heathPlan = formValue.heathPlan
      ? formValue.heathPlan
      : HeathPlan.None;
    model.hospitalId = this.hospitalId;
    model.houseNumber = formValue.houseNumber as number;
    model.maritalStatus = formValue.maritalStatus as MaritalStatus;
    model.name = formValue.name as string;
    model.phone = formValue.phone as string;
    model.state = formValue.state as string;
    model.street = formValue.street as string;
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
      age: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(0),
      ]),
      gender: new FormControl<Gender | null>(null, [Validators.required]),
      maritalStatus: new FormControl<MaritalStatus | null>(null, [
        Validators.required,
        Validators.min(0),
      ]),
      zipCode: new FormControl<string | null>(null, [
        Validators.required,
        Validators.maxLength(20),
      ]),
      state: new FormControl<string | null>({ value: null, disabled: true }),
      city: new FormControl<string | null>({ value: null, disabled: true }),
      cpf: new FormControl<string | null>(null, [
        Validators.required,
        Validators.maxLength(11),
        cpfValidator(),
      ]),
      district: new FormControl<string | null>({ value: null, disabled: true }),
      street: new FormControl<string | null>({ value: null, disabled: true }),
      email: new FormControl<string | null>(null, [Validators.maxLength(300)]),
      hasHeathPlan: new FormControl<boolean | null>(false),
      heathPlan: new FormControl<HeathPlan | null>(null),
      hospitalId: new FormControl<number | null>(null),
      houseNumber: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(0),
      ]),
      name: new FormControl<string | null>(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),
      phone: new FormControl<string | null>(null, [
        Validators.maxLength(20),
        Validators.required,
      ]),
    });
  }

  private createColumns() {
    return SfGridColumns.build<GridRow>({
      id: SfGridColumns.text('id', 'Código').minWidth(100).isPrimaryKey(true),
      name: SfGridColumns.text('name', 'Nome').minWidth(200),
      cpf: SfGridColumns.text('cpf', 'CPF').minWidth(100),
      age: SfGridColumns.numeric('age', 'Idade').minWidth(80),
      gender: SfGridColumns.text('gender', 'Gênero').minWidth(100),
      heathPlan: SfGridColumns.text('heathPlan', 'Plano de Saúde').minWidth(
        100
      ),
      city: SfGridColumns.text('city', 'Cidade').minWidth(100),
      state: SfGridColumns.text('state', 'Estado').minWidth(200),
    });
  }
}
